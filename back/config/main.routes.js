archivosRoutes = require('../api/routes/archivos.routes');

module.exports = (app) => {
  app.use('/api/archivos', archivosRoutes);
}