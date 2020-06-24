"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");
const usuarioController = require("../controllers/usuarioController");
const jsonWebTokenConfig = require("../config/jsonWebTokenConfig");
const { json } = require("sequelize/types");
const multerConfig = multer(
  require("../config/multerConfig").multerConfig
).fields([
  { name: "foto_rostro", maxCount: 1 },
  { name: "audio_grabacion", maxCount: 1 },
]);

const validApps = (req, res, next) => {
  const whiteListApps = ["OA_SECURITY_ADMIN", "OA_SECURITY_CLIENT"];
  const { appcode } = req.headers;
  if (!appcode || !whiteListApps.includes(appcode)) {
    return res.status(400).end();
  }
  next();
};

router.post("/", validApps, multerConfig, async (req, res) => {
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

router.get("/", validApps, async (req, res) => {
  try {
    let usuarios = await usuarioController.listarUsuarios();
    res.status(200).json(usuarios).end();
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

router.get("/:id", validApps, async (req, res) => {
  try {
    let usuario = await usuarioController.obtenerUsuarioPorId(req.params.id);
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

router.post("/login", validApps, async (req, res) => {
  const { email, password } = req.body;
  let usuario = await usuarioController.login(email, password);
  if (usuario) {
    const token = jsonWebTokenConfig.sign(usuario);
    res.status(200).json({ token }).end();
  } else {
    res.status(400).end();
  }
});

router.post("/login/facial", validApps, multerConfig, async (req, res) => {
  const { faceId1 } = req.headers;
  const faceId2File = req.files["face_id_2"][0];
  try {
    let respuesta = await usuarioController.loginFacial(faceId1, faceId2File);
    if (respuesta.isIdentical) {
      res.status(200).json({ identico: true }).end();
    } else {
      res.status(200).json({ identico: false }).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

module.exports = router;
