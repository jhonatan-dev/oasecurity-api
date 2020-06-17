"use strict";

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Bienvenido a la API de OA Security v1.0").end();
});

module.exports = router;
