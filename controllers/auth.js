const { request, response } = require("express");

const login = (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    // terminar de hacer con el curso de Fernando Herrera
    res.json({ msg: "Login Ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Algo salio mal, hable con el administrador" });
  }
};

module.exports = { login };
