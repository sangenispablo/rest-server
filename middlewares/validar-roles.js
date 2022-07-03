const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  if (!req.userAuth) {
    return res
      .status(500)
      .json({ msg: "Se quiere verificar el rol del usuario sin token" });
  }

  const { rol } = req.userAuth;

  if (rol !== "ADMIN_ROLE") {
    return res
      .status(401)
      .json({ msg: "El usuario no tiene permisos de Admin" });
  }
  next();
};

const asRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.userAuth) {
      return res
        .status(500)
        .json({ msg: "Se quiere verificar el rol del usuario sin token" });
    }
    if (!roles.includes(req.userAuth.rol)) {
      return res
        .status(401)
        .json({ msg: `El usuario debe tener estos roles ${roles}` });
    }
    console.log(roles, req.userAuth.rol);
    next();
  };
};

module.exports = { isAdminRole, asRole };
