const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const router = Router();

// importo los controladores para cada endpoint
const {
  usuariosGet,
  usuariosDelete,
  usuariosPost,
  usuariosPut,
} = require("../controllers/usuarios");

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
    check(
      "password",
      "El password tiene que tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "La dirección de correo no es valida").isEmail(),
    // chequeo si el mail existe
    check("correo").custom(emailExiste),
    // check("rol", "No es un Rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    // como chequear un campo con otra colecion o tabla
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    check("id").custom(existeUsuarioPorId), 
    validarCampos
  ],
  usuariosDelete
);

module.exports = router;
