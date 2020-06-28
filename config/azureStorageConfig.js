"use strict";

const azure = require("azure-storage");
const blobService = azure.createBlobService();

const nombreContenedorFotosRostro = "rostros";
const urlContenedorFotosRostro = `${process.env.AZURE_STORAGE_BLOB_URL}/${nombreContenedorFotosRostro}`;
const nombreContenedorAudioGrabaciones = "grabaciones";
const urlContenedorAudioGrabaciones = `${process.env.AZURE_STORAGE_BLOB_URL}/${nombreContenedorAudioGrabaciones}`;

module.exports = {
  blobService,
  nombreContenedorFotosRostro,
  urlContenedorFotosRostro,
  nombreContenedorAudioGrabaciones,
  urlContenedorAudioGrabaciones,
};
