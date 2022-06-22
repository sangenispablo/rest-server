// Modelo de Usuario
// {
//     nombre: '',
//     correo: '',
//     password: 'asqdas',
//     img: 'url a una imagen',
//     rol: 'asdasd',
//     estado: true,
//     google: true
// }

const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo del usuario es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Usuario", UsuarioSchema);
