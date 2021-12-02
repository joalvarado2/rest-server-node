const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();


    // Rutas de la Aplicacion
    this.routes();
  }

  middlewares() {

    //Cors
    this.app.use(cors());

    // Directorio Publico
    this.app.use(express.static("public"));
  }

  routes() {  
    this.app.get("/api", (req, res) => {
      res.json({
          msg:"hola que tal soy get"
      });
    });

    this.app.put("/api", (req, res) => {
      res.json({
          msg:"hola que tal soy put"
      });
    });

    this.app.post("/api", (req, res) => {
      res.json({
          msg:"hola que tal soy post"
      });
    });

    this.app.delete("/api", (req, res) => {
      res.json({
          msg:"hola que tal soy delete"
      });
    });

    this.app.patch("/api", (req, res) => {
      res.json({
          msg:"hola que tal soy pacth"
      });
    });
}

  listen() {
    this.app.listen(this.port, () => {
      console.log(`corriendo servidor en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
