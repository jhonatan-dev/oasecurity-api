"use strict";

const azureFaceConfig = {};

const { FaceClient, FaceModels } = require("@azure/cognitiveservices-face");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

const faceKey = process.env.AZURE_FACE_API_KEY;
const faceEndPoint = process.env.AZURE_FACE_API_URL;
const cognitiveServiceCredentials = new CognitiveServicesCredentials(faceKey);
const clientFaceDetect = new FaceClient(
  cognitiveServiceCredentials,
  `${faceEndPoint}/detect`
);
const clientFaceVerify = new FaceClient(
  cognitiveServiceCredentials,
  `${faceEndPoint}/verify`
);

const optionsFaceDetect = {
  detectionModel: "detection_01", //detection_01 o detection_02, valor por defecto detection_01
  recognitionModel: "recognition_01", //recognition_01 o recognition_02, valor por defecto recognition_01
  returnFaceId: true,
  returnFaceLandmarks: false,
  returnRecognitionModel: false,
  returnFaceAttributes: [
    "age",
    "gender",
    "smile",
    "facialHair",
    "headPose",
    "glasses",
    "emotion",
    "hair",
    "makeup",
    "accessories",
    "blur",
    "exposure",
    "noise",
  ],
};

azureFaceConfig.detectWithUrl = async (urlImage) => {
  try {
    let response = await clientFaceDetect.face.detectWithUrl(
      urlImage,
      optionsFaceDetect
    );
    return response;
  } catch (err) {
    throw new Error(`Error en azureFaceConfig.detectWithUrl: ${err}`);
  }
};

azureFaceConfig.detectWithStream = async (readableStream) => {
  try {
    let response = await clientFaceDetect.face.detectWithStream(() => {
      return readableStream;
    }, optionsFaceDetect);
    return response;
  } catch (err) {
    throw new Error(`Error en azureFaceConfig.detectWithUrl: ${err}`);
  }
};

azureFaceConfig.verifyFaceToFace = async (faceId1, faceId2) => {
  try {
    let response = await clientFaceVerify.face.verifyFaceToFace(
      faceId1,
      faceId2
    );
    return response;
  } catch (err) {
    throw new Error(`Error en azureFaceConfig.verifyFaceToFace: ${err}`);
  }
};

module.exports = azureFaceConfig;
