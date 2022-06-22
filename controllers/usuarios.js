const { request, response } = require("express");
const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const { name, edad, page = "1" } = req.query;
  res.json({
    msg: "get API",
    name,
    edad,
    page,
  });
};

const usuariosPut = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "put API",
    id,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const body = req.body;
  const usuario = new Usuario(body);
  await usuario.save();
  res.json({
    msg: "post API",
    usuario,
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: "delete API",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
