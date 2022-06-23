const { Router } = require("express");
const { check } = require("express-validator");

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
  [check("correo", "La dirección de correo no es valida").isEmail()],
  usuariosPost
);

router.delete("/", usuariosDelete);

module.exports = router;
