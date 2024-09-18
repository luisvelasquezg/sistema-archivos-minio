const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const path = require('path');
const morgan = require('morgan');

const app = express();
// const compiler = webpack(config);

app.use(morgan('dev'));

// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }));

// app.use(webpackHotMiddleware(compiler));


// Servir archivos estáticos desde la carpeta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));
// app.use(express.static(path.join(__dirname, 'dist/my_hybrid-app/browser/index.htm')));

// app.get('/', (req, res) => {
//   // res.sendFile(__dirname + '/dist/index.html');
//   res.sendFile(__dirname + '/dist/my_hybrid-app/browser/index.html');
// });

app.listen(3002, () => {
  console.log('Server started on port 3002');
});