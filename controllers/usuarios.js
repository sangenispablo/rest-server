const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

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
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json(errores);
  }
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  // validar email
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    return res.status(400).json({
      msg: "El correo ya está registrado",
    });
  }
  // encriptar password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

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
