const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const minio = require('minio');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/mongoose');
const apiRoutes = require('./config/main.routes');

// Previsualization
const mime = require('mime-types');
const rangeParser = require('range-parser'); // Para streaming de video y audio 
// (fin previsualization)

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ==============================

// Configurar cliente MinIO
const minioClient = new minio.Client({
  endPoint: 'play.min.io',
  port: 9000,
  useSSL: true,
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
});

const myBucketName = 'sistema-archivos-example';

// Configurar multer para manejar la carga de archivos
const upload = multer({ storage: multer.memoryStorage() });

// Ruta para subir archivos
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha subido algún archivo');
  }

  const bucketName = myBucketName;
  const objectName = req.file.originalname;
  const fileBuffer = req.file.buffer;

  try {
    await minioClient.putObject(bucketName, objectName, fileBuffer);
    // res.status(200).send('Archivo subido con éxito'); // Respuesta de texto plano
    res.status(200).json({ message: 'Archivo subido con éxito' }); // Respuesta de formato JSON
  } catch (err) {
    console.error(err);
    // res.status(500).send('Error al subir el archivo'); // Respuesta de texto plano
    res.status(500).json({ message: 'Error al subir el archivo' }); // Respuesta de formato JSON
  }
});

// Ruta para listar archivos
app.get('/files', async (req, res) => {
  const bucketName = myBucketName;
  const stream = minioClient.listObjects(bucketName, '', true);
  const files = [];

  stream.on('data', (obj) => {
    files.push({
      name: obj.name,
      size: obj.size,
      lastModified: obj.lastModified
    });
  });

  stream.on('error', (err) => {
    console.error(err);
    // res.status(500).send('Error al listar los archivos');
    res.status(500).json({ message: 'Error al listar los archivos' });
  });

  stream.on('end', () => {
    res.json(files);
  });
});

// Ruta para descargar archivos
app.get('/download/:filename', async (req, res) => {
  const bucketName = myBucketName;
  const objectName = req.params.filename;

  try {
    const fileStream = await minioClient.getObject(bucketName, objectName);
    res.setHeader('Content-Disposition', `attachment; filename="${objectName}"`);
    fileStream.pipe(res);
  } catch (err) {
    console.error(err);
    // res.status(500).send('Error al descargar el archivo');
    res.status(500).json({ message: 'Error al descargar el archivo' });
  }
});

app.delete('/delete/:filename', async (req, res) => {
  const bucketName = myBucketName;
  const objectName = req.params.filename;
  const maxRetries = 3;
  let attempt = 0;

  async function deleteObject() {
    attempt++;
    try {
      await minioClient.removeObject(bucketName, objectName);
      return res.status(200).json({ message: 'Archivo eliminado con éxito' });
    } catch (err) {
      if (attempt <= maxRetries) {
        console.error(`Attempt ${attempt} failed: ${err.message}. Retrying...`);
        setTimeout(deleteObject, Math.pow(2, attempt) * 1000); // Backoff exponencial
      } else {
        console.error('Max retries reached:', err);
        return res.status(500).json({ message: 'Error al eliminar el archivo' });
      }
    }
  }

  deleteObject();

  // try {
  //   await minioClient.removeObject(bucketName, objectName);
  //   res.status(200).json({ message: 'Archivo eliminado con éxito' });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: 'Error al eliminar el archivo' });
  // }

});

app.post('/delete-multiple', async (req, res) => {
  const bucketName = myBucketName;
  const filenames = req.body.filenames;

  if (!Array.isArray(filenames) || filenames.length === 0) {
    return res.status(400).json({ message: 'Se requiere un array de nombres de archivo' });
  }

  try {
    await Promise.all(filenames.map(filename => minioClient.removeObject(bucketName, filename)));
    res.status(200).json({ message: 'Archivos eliminados con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar los archivos' });
  }
});

// ==============================


// ### Previsualization ###

app.get('/view/:filename', async (req, res) => {
  const bucketName = myBucketName;
  const objectName = req.params.filename;

  try {
    const stat = await minioClient.statObject(bucketName, objectName);
    const contentType = mime.lookup(objectName) || 'application/octet-stream';
    const fileSize = stat.size;

    // Configurar headers para streaming
    res.setHeader('Content-Type', contentType);
    res.setHeader('Accept-Ranges', 'bytes');

    // Manejar solicitudes de rango
    const range = req.headers.range;
    if (range) {
      const parts = rangeParser(fileSize, range);

      if (parts && parts.type === 'bytes' && parts.length === 1) {
        const [{ start, end }] = parts;
        const chunksize = (end - start) + 1;
        res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
        res.setHeader('Content-Length', chunksize);
        res.status(206); // Partial Content

        const stream = await minioClient.getPartialObject(bucketName, objectName, start, end - start + 1);
        stream.pipe(res);
      } else {
        res.status(416).send('Range Not Satisfiable');
      }
    } else {
      res.setHeader('Content-Length', fileSize);
      const stream = await minioClient.getObject(bucketName, objectName);
      stream.pipe(res);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener el archivo' });
  }
});

// app.get('/view/:filename', async (req, res) => {
//   const bucketName = myBucketName;
//   const objectName = req.params.filename;

//   try {
//     const dataStream = await minioClient.getObject(bucketName, objectName);
//     const stat = await minioClient.statObject(bucketName, objectName);
//     const contentType = mime.lookup(objectName) || 'application/octet-stream';

//     res.setHeader('Content-Type', contentType);
//     res.setHeader('Content-Length', stat.size);

//     // Para archivos de video y audio, configuramos el streaming
//     if (contentType.startsWith('video/') || contentType.startsWith('audio/')) {
//       res.setHeader('Accept-Ranges', 'bytes');
//     }

//     dataStream.pipe(res);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error al obtener el archivo' });
//   }
// });


// ###(Fin de Previsualization)###

connectDB();
apiRoutes(app);

app.use(express.static('../front/angularjs'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;