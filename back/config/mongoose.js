const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/sistema-archivos', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    console.log("DB Conectada");
  } catch (error) {
    console.log(error);
    process.exit(1); // Detener la app
  }
};

module.exports = connectDB;
