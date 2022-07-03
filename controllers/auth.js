const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const { generarJWT } = require("../helpers/generar-jwt");

const Usuario = require("../models/usuario");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    // verificar si el usuario existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password incorrecto - correo" });
    }
    // si esta activo el usuario
    if (!usuario.estado) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password incorrecto - estado: false" });
    }
    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password incorrecto - password: incorrecto" });
    }
    // generar token con jsonwebtoken
    const token = await generarJWT(usuario.id);
    console.log(token);
    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Algo salio mal, hable con el administrador" });
  }
};

module.exports = { login };
