const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
  ]);

  const pagina = usuarios.length;

  res.json({
    msg: "ok",
    total,
    pagina,
    usuarios,
  });
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    // encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "ok",
    usuario,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // encriptar password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // grabo en la BD
  await usuario.save();
  res.json({
    msg: "ok",
    usuario,
  });
};

const usuariosDelete = (req = request, res = response) => {
  const { id } = req.params;
  // Ojo el el Delete no funciona como antes
  // esto no deberia usarse
  // const usuario = Usuario.findByIdAndDelete(id);
  const usuario = Usuario.findByIdAndUpdate(id, { estado: false });
  // Esto es lo mejor marcar con un estado en false para hacer un borrado logico no fisico
  res.json({
    msg: "ok",
    // usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
