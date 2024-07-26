const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const minio = require('minio');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/mongoose');
const apiRoutes = require('./config/main.routes');

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
    res.status(200).send('Archivo subido con éxito');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al subir el archivo');
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
    res.status(500).send('Error al listar los archivos');
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
    res.status(500).send('Error al descargar el archivo');
  }
});

// ==============================

connectDB();
apiRoutes(app);

app.use(express.static('../front/angularjs'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;