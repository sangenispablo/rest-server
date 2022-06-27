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

// aca puedo crear metodos personalizados, en este caso estoy sobreescribiendo el metodo
// toJSON para que solo devuelva parte del schema y no todo
UsuarioSchema.methods.toJSON = function () {
  const { password, __v, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
