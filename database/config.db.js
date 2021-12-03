const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // propiedades usadas para utilizar funciones de mongodb que puedan estar obsoletas
    });

    console.log("base de datos conectada");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConection,
};
