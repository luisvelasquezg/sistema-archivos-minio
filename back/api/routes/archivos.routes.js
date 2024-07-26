// Rutas para producto
const express = require('express');
const router = express.Router();
const archivosController = require('../controllers/archivos.controller');

// api/archivos
router.post('/', archivosController.create); // Crear
router.get('/', archivosController.list); // Obtener todos
router.get('/:id', archivosController.read); // Obtener uno
router.put('/:id', archivosController.update); // Actualizar
router.delete('/:id', archivosController.delete); // Eliminar

module.exports = router;
