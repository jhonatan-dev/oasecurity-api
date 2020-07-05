"use strict";

const usuarioController = {};
const usuarioService = require("../services/usuarioService");

usuarioController.registrarUsuario = async (usuario) => {
  return await usuarioService.registrarUsuario(usuario);
};

usuarioController.listarUsuarios = async () => {
  return await usuarioService.listarUsuarios();
};

usuarioController.listarUsuariosPorIdAplicacion = async (id_aplicacion) => {
  return await usuarioService.listarUsuariosPorIdAplicacion(id_aplicacion);
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

usuarioController.loginFacial = async (idUsuario, faceId2File) => {
  return await usuarioService.loginFacial(idUsuario, faceId2File);
};

usuarioController.loginVoz = async (profileId, recordingFile) => {
  return await usuarioService.loginVoz(profileId, recordingFile);
};

usuarioController.entrenarSpeakerRecognition = async (idUsuario) => {
  return await usuarioService.entrenarSpeakerRecognition(idUsuario);
};

module.exports = usuarioController;
