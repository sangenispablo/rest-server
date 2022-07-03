const { request, response } = require("express");

const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ msg: "No hay token en la petición" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
    // busco el usuario y le mando al req la info del usuario
    const usuarioAutenticado = await Usuario.findById(uid);
    // lo busco en la DB
    if (!usuarioAutenticado) {
      return res.status(401).json("El token es inválido: usuario no existe");
    }
    // Verifico que el estado sea true
    if (!usuarioAutenticado.estado) {
      return res.status(401).json("El token es inválido: usuario con estado: false");
    }
    // pongo el uid del payload para que le sirva al siguiente middleware
    req.userAuth = usuarioAutenticado;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "El token es invalido" });
  }
};

module.exports = { validarJWT };
