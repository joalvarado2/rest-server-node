const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    // Conectando a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de la Aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConection();
  }

  middlewares() {
    //Cors
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`corriendo servidor en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
