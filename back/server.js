const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/mongoose');
const apiRoutes = require('./config/main.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();
apiRoutes(app);

app.use(express.static('../front/angularjs'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;