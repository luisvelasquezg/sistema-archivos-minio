const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
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

// Verificar si la carpeta 'uploads' existe, y crearla si no
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log(`Carpeta 'uploads' creada en: ${uploadDir}`);
} else {
  console.log(`Carpeta 'uploads' ya existe en: ${uploadDir}`);
}

// Configuración del almacenamiento
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // cb(null, 'uploads/')  // Carpeta donde se guardarán los archivos
//     // Carpeta donde se guardarán los archivos
//     cb(null, path.join(__dirname, ''));
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))  // Nombre del archivo
//   }
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Destination callback'); // Depuración
    cb(null, 'uploads/');  // Carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    console.log('Filename callback'); // Depuración
    const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    console.log(`Filename: ${filename}`); // Depuración
    cb(null, filename);  // Nombre del archivo
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('myfile'), (req, res) => {
  try {
    console.log('Archivo recibido'); // Depuración
    res.send('Archivo subido exitosamente.');
  } catch (error) {
    console.error('Error al subir el archivo:', error); // Depuración
    res.status(400).send('Error al subir el archivo.');
  }
});

// app.post('/upload', upload.single('myfile'), (req, res) => {
//   try {
//     res.send('Archivo subido exitosamente.');
//   } catch (error) {
//     res.status(400).send('Error al subir el archivo.');
//   }
// });

// ==============================

connectDB();
apiRoutes(app);

app.use(express.static('../front/angularjs'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;