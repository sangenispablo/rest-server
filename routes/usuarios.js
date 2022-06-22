const { Router } = require("express");

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

router.post("/", usuariosPost);

router.delete("/", usuariosDelete);

module.exports = router;
