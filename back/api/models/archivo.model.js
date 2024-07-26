const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const archivoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  ubicacion: {
    type: String,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

const Archivo = mongoose.model('Archivo', archivoSchema);

module.exports = Archivo;