"use strict";

const usuarioService = {};

const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const intoStream = require("into-stream");
const bcryptLib = require("../libs/bcryptLib");
const usuarioRepository = require("../repository/usuarioRepository");
const azureSpeakerRecognitionVerificacionDependienteConfig = require("../config/azureSpeakerRecognitionVerificacionDependienteConfig");
const azureFaceConfig = require("../config/azureFaceConfig");
const {
  blobService,
  nombreContenedorFotosRostro,
  urlContenedorFotosRostro,
  nombreContenedorAudioGrabaciones,
  urlContenedorAudioGrabaciones,
} = require("../config/azureStorageConfig");
const { Stream } = require("stream");

function subirImagenAzureStorage(usuario) {
  const nombreArchivo = `${usuario.dni}_${usuario.archivoFotoRostro.originalname}`;
  const stream = intoStream(usuario.archivoFotoRostro.buffer);
  const streamLength = usuario.archivoFotoRostro.buffer.length;
  const archivoFotoRostroGuardado = blobService.createBlockBlobFromStream(
    nombreContenedorFotosRostro,
    nombreArchivo,
    stream,
    streamLength,
    async (error, result, response) => {
      if (error) {
        throw new Error(
          `Error en usuarioService.subirImagenAzureStorage: ${error}`
        );
      }
    }
  );
  return archivoFotoRostroGuardado;
}

function subirAudioAzureStorage(usuario) {
  const nombreArchivo = `${usuario.dni}_${usuario.archivoAudioGrabacion.originalname}`;
  const stream = intoStream(usuario.archivoAudioGrabacion.buffer);
  const streamLength = usuario.archivoAudioGrabacion.buffer.length;
  const archivoAudioGrabacionGuardado = blobService.createBlockBlobFromStream(
    nombreContenedorAudioGrabaciones,
    nombreArchivo,
    stream,
    streamLength,
    async (error, result, response) => {
      if (error) {
        throw new Error(
          `Error en usuarioService.subirAudioAzureStorage: ${error}`
        );
      }
    }
  );
  return archivoAudioGrabacionGuardado;
}

async function generarInscripcion(archivoAudioGrabacion) {
  const profile = await azureSpeakerRecognitionVerificacionDependienteConfig.crearPerfil();
  const stream = intoStream(archivoAudioGrabacion.buffer);
  const streamLength = archivoAudioGrabacion.buffer.length;
  const enrollment = await azureSpeakerRecognitionVerificacionDependienteConfig.crearInscripcion(
    profile.profileId,
    stream,
    streamLength
  );
  return enrollment;
}

async function entrenarInscripcion(profileId, urlAudioGrabacion) {
  const response = await axios.get(`${urlAudioGrabacion}`, {
    responseType: "arraybuffer",
    httpsAgent,
  });
  let bufferAudioGrabacion = Buffer.from(response.data, "binary");
  const stream = intoStream(bufferAudioGrabacion);
  const streamLength = bufferAudioGrabacion.length;
  const enrollment = await azureSpeakerRecognitionVerificacionDependienteConfig.crearInscripcion(
    profileId,
    stream,
    streamLength
  );
  return enrollment;
}

usuarioService.registrarUsuario = async (usuario) => {
  try {
    let archivoFotoRostroGuardado = subirImagenAzureStorage(usuario);
    let archivoAudioGrabacionGuardado = subirAudioAzureStorage(usuario);
    let inscripcion = await generarInscripcion(usuario.archivoAudioGrabacion);
    const usuarioParaGuardar = {
      dni: usuario.dni,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuario.email,
      password: await bcryptLib.encryptPassword(usuario.password),
      url_foto_rostro: `${urlContenedorFotosRostro}/${archivoFotoRostroGuardado.name}`,
      audio_profile_id: inscripcion.profileId,
      audio_profile_status: inscripcion.enrollmentStatus,
      url_audio_grabacion: `${urlContenedorAudioGrabaciones}/${archivoAudioGrabacionGuardado.name}`,
      id_aplicacion: usuario.id_aplicacion,
    };
    let nuevoUsuario = await usuarioRepository.registrarUsuario(
      usuarioParaGuardar
    );
    return nuevoUsuario.toJSON();
  } catch (err) {
    throw new Error(`Error en usuarioService.registrarUsuario: ${err}`);
  }
};

usuarioService.entrenarSpeakerRecognition = async (idUsuario) => {
  try {
    let usuario = await usuarioRepository.obtenerUsuarioPorId(idUsuario);
    let inscripcion = await entrenarInscripcion(
      usuario.audio_profile_id,
      usuario.url_audio_grabacion
    );
    let estado = await usuarioRepository.actualizarUsuario({
      id: usuario.id,
      audio_profile_status: inscripcion.enrollmentStatus,
    });
    return estado[1][0].toJSON();
  } catch (err) {
    throw new Error(
      `Error en usuarioService.entrenarSpeakerRecognition: ${err}`
    );
  }
};

usuarioService.listarUsuariosPorIdAplicacion = async (id_aplicacion) => {
  try {
    let usuarios = await usuarioRepository.listarUsuariosPorIdAplicacion(
      id_aplicacion
    );
    return usuarios;
  } catch (err) {
    throw new Error(
      `Error en usuarioService.listarUsuariosPorIdAplicacion: ${err}`
    );
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

usuarioService.loginFacial = async (idUsuario, faceId2File) => {
  try {
    let usuario = await usuarioRepository.obtenerUsuarioPorId(idUsuario);
    const faceId1Info = await azureFaceConfig.detectWithUrl(
      `${usuario.url_foto_rostro}`
    );
    const faceId2Stream = intoStream(faceId2File.buffer);
    const faceId2Info = await azureFaceConfig.detectWithStream(faceId2Stream);
    let resultado = await azureFaceConfig.verifyFaceToFace(
      faceId1Info[0].faceId,
      faceId2Info[0].faceId
    );
    return resultado;
  } catch (err) {
    throw new Error(`Error en usuarioService.loginFacial: ${err}`);
  }
};

usuarioService.loginVoz = async (profileId, recordingFile) => {
  try {
    const recordingFileStream = intoStream(recordingFile.buffer);
    const recordingFileStreamLength = recordingFile.buffer.length;
    let resultado = await azureSpeakerRecognitionVerificacionDependienteConfig.verificarPerfil(
      profileId,
      recordingFileStream,
      recordingFileStreamLength
    );
    return resultado;
  } catch (err) {
    throw new Error(`Error en usuarioService.loginVoz: ${err}`);
  }
};

module.exports = usuarioService;
