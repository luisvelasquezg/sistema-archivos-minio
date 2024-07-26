const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Archivo = require("../models/archivo.model");

// Método para el manejo de errores
const getErrorMessage = (err) => {
  // Definir variable de error message
  let message = "";
  // Si ocurre un error interno de MongoDB
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = "El registro ya existe";
        break;
      // si un error general ocurre
      default:
        message = "Se ha producido un error";
    }
  } else {
    // Grabar el error en una lista de posibles errores
    for (let errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  // Devolver el mensaje de error
  return message;
};

// Método para crear los archivos
exports.create = async (req, res) => {
  try {
    // Obtener los campos del esquema de Mongoose excluyendo campos internos y métodos virtuales
    const allowedFields = Object.keys(Archivo.schema.paths)
      .filter(field => !['_id', '__v', 'fechaCreacion'].includes(field));
    const actualFields = Object.keys(req.body);
    const isValidFields = actualFields.every((field) => allowedFields.includes(field));

    if (!isValidFields) {
      return res.status(400).json({ message: "Intento de ingresar campos no permitidos" });
    }

    const archivo = new Archivo(req.body);
    // // Configurar la propiedad 'creador'
    // archivo.creador = req.user;

    // Intentar salvar
    await archivo.save();
    // Enviar una representación JSON del ejemplar
    res.json(archivo);
  } catch (err) {
    // Si ocurre algún error enviar el mensaje
    return res.status(400).send({
      message: getErrorMessage(err),
    });
  }
};

// Método que recupera una lista de archivos
exports.list = async (req, res) => {
  try {
    // Usa el método model 'find' para obtener una lista de archivos
    const archivos = await Archivo.find()
      .sort({ fechaCreacion: -1 });
    // .sort({ fechaCreacion: -1 })
    // .exec();
    res.json(archivos);
  } catch (err) {
    return res.status(400).send({
      message: getErrorMessage(err),
    });
  }
};

// Método que devuelve un archivo existente
exports.read = async (req, res) => {
  try {
    // Verificar si el ID proporcionado es un ObjectId válido
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "ID no válido" });
    }
    const archivo = await Archivo.findById(req.params.id);
    if (!archivo) {
      return res.status(404).json({ msg: "No existe el archivo" });
    }
    res.json(archivo);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: getErrorMessage(err)
    });
  }
};

// Método para actualizar un archivo existente
exports.update = async (req, res) => {
  try {
    const archivoId = req.params.id;

    // Verificar si el ID proporcionado es un ObjectId válido
    if (!ObjectId.isValid(archivoId)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    // Definir los campos permitidos para actualización
    // const allowedUpdates = ['campo1', 'nombre', 'campo3'];
    // Obtener los campos del esquema de Mongoose excluyendo campos internos y métodos virtuales
    const allowedUpdates = Object.keys(Archivo.schema.paths).filter(field => !['_id', '__v'].includes(field));
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).json({ message: "Intento de actualizar campos no permitidos" });
    }

    // Actualizar el archivo directamente en la base de datos
    const archivoActualizado = await Archivo.findByIdAndUpdate(
      archivoId,
      { $set: req.body }, // Asegúrate de que `req.body` contenga solo los campos que quieres actualizar
      { new: true, runValidators: true } // new: true devuelve el documento modificado
    );

    if (!archivoActualizado) {
      return res.status(404).json({ message: "No existe el archivo" });
    }

    res.json(archivoActualizado);
  } catch (err) {
    return res.status(400).send({
      message: getErrorMessage(err),
    });
  }
};

// Método para eliminar un archivo existente
exports.delete = async (req, res) => {
  try {
    const archivoId = req.params.id;

    // Verificar si el ID proporcionado es un ObjectId válido
    if (!ObjectId.isValid(archivoId)) {
      return res.status(400).json({ message: "ID no válido" });
    }

    // Eliminar el archivo directamente en la base de datos
    const archivoEliminado = await Archivo.findByIdAndDelete({ _id: req.params.id });

    if (!archivoEliminado) {
      return res.status(404).json({ message: "No existe el archivo" });
    }

    res.json({ message: "Archivo eliminado" });
  } catch (err) {
    return res.status(400).send({
      message: getErrorMessage(err),
    });
  }
};
