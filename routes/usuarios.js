const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// importo los controladores para cada endpoint
const {
  usuariosGet,
  usuariosDelete,
  usuariosPost,
  usuariosPut,
} = require("../controllers/usuarios");

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post(
  "/",
  [
    check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
    check(
      "password",
      "El password tiene que tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "La dirección de correo no es valida").isEmail(),
    check("rol", "No es un Rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],
  usuariosPost
);

router.delete("/", usuariosDelete);

module.exports = router;
