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
      image_face_id: await azureFaceConfig.detectWithStream(streamFotoRostro)[0]
        .faceId,
      url_foto_rostro: `${urlContenedorFotosRostro}/${archivoFotoRostroGuardado.name}`,
      audio_profile_id: `empty_${new Date().getTime()}`, //await azureSpeakerRecognitionVerificacionIndependienteConfig.crearPerfil().identificationProfileId
      url_audio_grabacion: "http://empty",
    };
    let nuevoUsuario = await usuarioRepository.registrarUsuario(
      usuarioParaGuardar
    );
    return nuevoUsuario.toJSON();
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

usuarioService.obtenerUsuarioPorId = async (id) => {
  try {
    let usuario = await usuarioRepository.obtenerUsuarioPorId(id);
    return usuario.toJSON();
  } catch (err) {
    throw new Error(`Error en usuarioService.obtenerUsuarioPorId: ${err}`);
  }
};

usuarioService.obtenerUsuarioPorEmail = async (email) => {
  try {
    let usuario = await usuarioRepository.obtenerUsuarioPorEmail(email);
    return usuario.toJSON();
  } catch (err) {
    throw new Error(`Error en usuarioService.obtenerUsuarioPorEmail: ${err}`);
  }
};

usuarioService.login = async (email, password) => {
  try {
    let usuario = await usuarioRepository.obtenerUsuarioPorEmail(email);
    if (usuario) {
      const passwordsMatches = await bcryptLib.matchPassword(
        password,
        usuario.password
      );
      if (passwordsMatches) {
        return usuario.toJSON();
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    throw new Error(`Error en usuarioService.login: ${err}`);
  }
};

usuarioService.loginFacial = async (faceId1, faceId2File) => {
  try {
    let faceId2Stream = intoStream(faceId2File.buffer);
    let faceId2Info = await azureFaceConfig.detectWithStream(faceId2Stream);
    let resultado = await azureFaceConfig.verifyFaceToFace(
      faceId1,
      faceId2Info[0].faceId
    );
    return resultado;
  } catch (err) {
    throw new Error(`Error en usuarioService.loginFacial: ${err}`);
  }
};

module.exports = usuarioService;
