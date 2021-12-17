const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  name: {
    type: String,
    require: [true, "el nombre el obligatorio"],
  },
  email: {
    type: String,
    require: [true, "el email el obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "el password el obligatorio"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    require: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// susbcribimos el usuario para evitar mostrar esta informacion
usuarioSchema.methods.toJSON = function(){
  const{__v, password, ...usuario} = this.toObject();
  return usuario;
}

module.exports = model("Usuario", usuarioSchema);
