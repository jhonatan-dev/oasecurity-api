"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");
const usuarioController = require("../controllers/usuarioController");
const multerConfig = multer(
  require("../config/multerConfig").multerConfig
).fields([
  { name: "foto_rostro", maxCount: 1 },
  { name: "audio_grabacion", maxCount: 1 },
]);

router.post("/", multerConfig, async (req, res) => {
  const { dni, nombres, apellidos, email, password } = req.body;
  const archivoFotoRostro = req.files["foto_rostro"][0];
  //const archivoAudioGrabacion = req.files["audio_grabacion"][0];
  try {
    let nuevoUsuario = await usuarioController.registrarUsuario({
      dni,
      nombres,
      apellidos,
      email,
      password,
      archivoFotoRostro,
      //archivoAudioGrabacion
    });
    res.status(201).json(nuevoUsuario).end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

router.get("/", async (req, res) => {
  try {
    let usuarios = await usuarioController.listarUsuarios();
    res.status(200).json(usuarios).end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

router.get("/:id", async (req, res) => {
  try {
    let usuario = await usuarioController.obtenerUsuario(req.params.id);
    if (usuario) {
      res.status(200).json(usuario).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

module.exports = router;
