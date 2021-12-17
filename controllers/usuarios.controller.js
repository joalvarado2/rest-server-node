const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { status: true };

  const [total, usuarios] = await Promise.all([
    Usuario.count(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const usuario = new Usuario({ name, email, password, role });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en la DB
  await usuario.save();
  res.json({
    msg: "hola que tal soy post desde controllers",
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  // Todo validar contra base de datos
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    msg: "hola que tal soy put desde controllers",
    id,
    usuario,
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  //Fisicamente  lo borramos
  //const usuario = await Usuario.findByIdAndDelete(id);

  // eliminamos de la vista pero no de la base de datos , ya que por medio del get estamos mirando los status: true
  const usuario = await Usuario.findByIdAndUpdate(id ,{ status: false });

  res.json(usuario);
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
