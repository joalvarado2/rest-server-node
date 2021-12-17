const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    // VALIDACION POR MEDIO DE EXPRESSVALIDATOR
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "la contraseña debe ser mayor de 6 caracteres").isLength({min: 6,}),
    check("email").custom(emailExiste),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",[
    check("id", "No es un id valido").isMongoId(), 
    check("id").custom(existeUsuarioPorId),
    check("role").custom(esRoleValido),
    validarCampos,
],usuariosPut
);

router.delete("/:id",[
  check("id", "No es un id valido").isMongoId(), 
  check("id").custom(existeUsuarioPorId),
  validarCampos,
], usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;
