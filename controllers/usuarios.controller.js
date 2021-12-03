const { response, request } = require("express");
const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {  
  // parametros que se envian por medio de la url
  //ejem = http://localhost:8080/api/usuarios/?q=hola&limit=5&apiKey=123456&page=3
  const { q, nombre = "no name", limit, apiKey, page = 2 } = req.query;

  res.json({
    msg: "hola que tal soy get desde controllers",
    q,
    nombre,
    limit,
    apiKey,
    page,
  });
};

const usuariosPost = async (req, res = response) => {
  const body = req.body;
  const usuario = new Usuario(body);

  await usuario.save();
  res.json({
    msg: "hola que tal soy post desde controllers",
    usuario,
  });
};

const usuariosPut = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "hola que tal soy put desde controllers",
    id,
  });
};
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "hola que tal soy delete desde controllers",
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "hola que tal soy patch desde controllers",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
};
