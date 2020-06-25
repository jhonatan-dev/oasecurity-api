"use strict";

const express = require("express");
const router = express.Router();

const validacionController = require("../controllers/validacionController");

router.get("/interna", async (req, res) => {
  if (req.query.email) {
    let emailRegistrado = await validacionController.existeEmail(
      req.query.email
    );
    if (emailRegistrado) {
      res.status(400).json(false).end();
    } else {
      res.status(200).json(true).end();
    }
  } else if (req.query.dni) {
    let dniRegistrado = await validacionController.existeDNI(req.query.dni);
    if (dniRegistrado) {
      res.status(400).json(false).end();
    } else {
      res.status(200).json(true).end();
    }
  } else {
    res.status(400).json(false).end();
  }
});

router.get("/externa", async (req, res) => {
  if (req.query.dni) {
    let informacionValida = await validacionController.dniValido(req.query.dni);
    if (informacionValida) {
      res
        .status(200)
        .json({
          valido: true,
          informacion: informacionValida,
        })
        .end();
    } else {
      res.status(400).json(false).end();
    }
  } else {
    res.status(400).json(false).end();
  }
});

module.exports = router;
