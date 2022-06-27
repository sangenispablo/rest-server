const { default: mongoose } = require("mongoose");

const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en el BD`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El email ${correo} ya esta registrado en la BD`);
  }
};

const existeUsuarioPorId = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
      throw new Error(`El id ${id} no esta registrado en la BD`);
    }
  } else {
    throw new Error(`El id ${id} no es un MongoId`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
};
