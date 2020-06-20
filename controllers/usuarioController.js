"use strict";

const usuarioController = {};
const usuarioService = require("../services/usuarioService");

usuarioController.registrarUsuario = async (usuario) => {
  return await usuarioService.registrarUsuario(usuario);
};

usuarioController.listarUsuarios = async () => {
  return await usuarioService.listarUsuarios();
};

usuarioController.obtenerUsuarioPorId = async (id) => {
  return await usuarioService.obtenerUsuarioPorId(id);
};

usuarioController.obtenerUsuarioPorEmail = async (email) => {
  return await usuarioService.obtenerUsuarioPorEmail(email);
};

usuarioController.login = async (email, password) => {
  return await usuarioService.login(email, password);
};

module.exports = usuarioController;
