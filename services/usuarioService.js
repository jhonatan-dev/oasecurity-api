"use strict";

const usuarioService = {};
const intoStream = require("into-stream");
const bcryptLib = require("../libs/bcryptLib");
const usuarioRepository = require("../repository/usuarioRepository");
const azureSpeakerRecognitionVerificacionIndependienteConfig = require("../config/azureSpeakerRecognitionVerificacionIndependienteConfig");
const azureFaceConfig = require("../config/azureFaceConfig");
const {
  blobService,
  nombreContenedorFotosRostro,
  urlContenedorFotosRostro,
} = require("../config/azureStorageConfig");

usuarioService.registrarUsuario = async (usuario) => {
  try {
    const nombreArchivoFotoRostro = `${usuario.dni}_${new Date().getTime()}_${
      usuario.archivoFotoRostro.originalname
    }`;
    const streamFotoRostro = intoStream(usuario.archivoFotoRostro.buffer);
    const streamLengthFotoRostro = usuario.archivoFotoRostro.buffer.length;
    //const streamAudioGrabacion = intoStream(usuario.archivoAudioGrabacion.buffer);
    //const streamLengthAudioGrabacion = usuario.archivoAudioGrabacion.buffer.length;
    let archivoFotoRostroGuardado = blobService.createBlockBlobFromStream(
      nombreContenedorFotosRostro,
      nombreArchivoFotoRostro,
      streamFotoRostro,
      streamLengthFotoRostro,
      async (error, result, response) => {
        if (error) {
          throw new Error(`Error en usuarioService.registrarUsuario: ${error}`);
        }
      }
    );
    const usuarioParaGuardar = {
      dni: usuario.dni,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuario.email,
      password: await bcryptLib.encryptPassword(usuario.password),
      image_face_id: `empty_${new Date().getTime()}`, //await azureFaceConfig.detectWithStream(streamFotoRostro)[0].faceId
      url_foto_rostro: `${urlContenedorFotosRostro}/${archivoFotoRostroGuardado.name}`,
      audio_profile_id: `empty_${new Date().getTime()}`, //await azureSpeakerRecognitionVerificacionIndependienteConfig.crearPerfil().identificationProfileId
      url_audio_grabacion: "http://empty",
    };
    let nuevoUsuario = await usuarioRepository.registrarUsuario(
      usuarioParaGuardar
    );
    return nuevoUsuario;
  } catch (err) {
    throw new Error(`Error en usuarioService.registrarUsuario: ${err}`);
  }
};

usuarioService.listarUsuarios = async () => {
  try {
    let usuarios = await usuarioRepository.listarUsuarios();
    return usuarios;
  } catch (err) {
    throw new Error(`Error en usuarioService.listarUsuarios: ${err}`);
  }
};

usuarioService.obtenerUsuario = async (id) => {
  try {
    let usuario = await usuarioRepository.obtenerUsuario(id);
    return usuario;
  } catch (err) {
    throw new Error(`Error en usuarioService.obtenerUsuario: ${err}`);
  }
};

module.exports = usuarioService;
