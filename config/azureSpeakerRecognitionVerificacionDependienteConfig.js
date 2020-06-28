"use strict";

const azureSpeakerRecognitionVerificacionDependienteConfig = {};

const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const urlEndpointVerificacion = `${process.env.AZURE_SPEAKER_RECOGNITION_API_VERIFICATION_TEXT_DEPENDENT_URL}`;
const urlEndpointVerificacionProfiles = `${process.env.AZURE_SPEAKER_RECOGNITION_API_VERIFICATION_TEXT_DEPENDENT_URL}/profiles`;
const OcpApimSubscriptionKey = `${process.env.AZURE_SPEAKER_RECOGNITION_API_KEY}`;

const headers = {
  "Ocp-Apim-Subscription-Key": OcpApimSubscriptionKey,
};

azureSpeakerRecognitionVerificacionDependienteConfig.obtenerPerfil = async (
  profileId
) => {
  try {
    const response = await axios.get(
      `${urlEndpointVerificacionProfiles}/${profileId}`,
      {
        headers,
        httpsAgent,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionDependienteConfig.obtenerPerfil: ${err}`
    );
  }
};

azureSpeakerRecognitionVerificacionDependienteConfig.obtenerListaPerfiles = async (
  top = 100
) => {
  try {
    const response = await axios.get(`${urlEndpointVerificacionProfiles}`, {
      params: {
        $top: top,
      },
      headers,
      httpsAgent,
    });
    return response.data;
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionDependienteConfig.obtenerListaPerfiles: ${err}`
    );
  }
};

azureSpeakerRecognitionVerificacionDependienteConfig.obtenerListaFrases = async (
  locale = "en-US"
) => {
  try {
    const response = await axios.get(
      `${urlEndpointVerificacion}/phrases/${locale}`,
      {
        headers,
        httpsAgent,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionDependienteConfig.obtenerListaFrases: ${err}`
    );
  }
};

azureSpeakerRecognitionVerificacionDependienteConfig.crearPerfil = async (
  locale = "en-US"
) => {
  try {
    const response = await axios.post(
      `${urlEndpointVerificacionProfiles}`,
      {
        locale,
      },
      {
        headers,
        httpsAgent,
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionDependienteConfig.crearPerfil: ${err}`
    );
  }
};

azureSpeakerRecognitionVerificacionDependienteConfig.eliminarPerfil = async (
  profileId
) => {
  try {
    await axios.delete(`${urlEndpointVerificacionProfiles}/${profileId}`, {
      headers,
      httpsAgent,
    });
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionDependienteConfig.eliminarPerfil: ${err}`
    );
  }
};

azureSpeakerRecognitionVerificacionDependienteConfig.crearInscripcion = async (
  profileId,
  readableStream,
  readableStreamLength
) => {
  try {
    const response = await axios({
      method: "post",
      url: `${urlEndpointVerificacionProfiles}/${profileId}/enrollments`,
      data: readableStream,
      headers: {
        "Ocp-Apim-Subscription-Key": OcpApimSubscriptionKey,
        "Content-Type": "audio/wav",
        "Content-Length": readableStreamLength,
      },
      httpsAgent,
    });
    return response.data;
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionDependienteConfig.crearInscripcion: ${err}`
    );
  }
};

azureSpeakerRecognitionVerificacionDependienteConfig.verificarPerfil = async (
  profileId,
  newReadableStream,
  newReadableStreamLength
) => {
  try {
    const response = await axios({
      method: "post",
      url: `${urlEndpointVerificacionProfiles}/${profileId}/verify`,
      data: newReadableStream,
      headers: {
        "Ocp-Apim-Subscription-Key": OcpApimSubscriptionKey,
        "Content-Type": "audio/wav",
        "Content-Length": newReadableStreamLength,
      },
      httpsAgent,
    });
    return response.data;
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionDependienteConfig.verificarPerfil: ${err}`
    );
  }
};

azureSpeakerRecognitionVerificacionDependienteConfig.restablecerPerfil = async (
  profileId
) => {
  try {
    await axios({
      url: `${urlEndpointVerificacionProfiles}/${profileId}/reset`,
      method: "post",
      headers,
      httpsAgent,
    });
  } catch (err) {
    throw new Error(
      `Error en azureSpeakerRecognitionVerificacionDependienteConfig.restablecerPerfil: ${err}`
    );
  }
};

module.exports = azureSpeakerRecognitionVerificacionDependienteConfig;
