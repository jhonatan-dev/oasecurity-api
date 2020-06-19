"use strict";

const validacionService = {};
const axios = require("axios");
const https = require("https");
const { usuarioModel } = require("../models");
const apiJNEVerificationConfig = require("../config/apiJNEVerificationConfig");

validacionService.existeEmail = async (email = "") => {
  try {
    let usuario = await usuarioModel.findOne({
      attributes: ["email"],
      where: {
        email,
      },
    });
    return usuario ? true : false;
  } catch (err) {
    console.error(`Error en validacionService.existeEmail: ${err}`);
    return false;
  }
};

validacionService.existeDNI = async (dni = "") => {
  try {
    let usuario = await usuarioModel.findOne({
      attributes: ["dni"],
      where: {
        dni,
      },
    });
    return usuario ? true : false;
  } catch (err) {
    console.error(`Error en validacionService.existeDNI: ${err}`);
    return false;
  }
};

validacionService.dniValido = async (dni = "") => {
  try {
    let resultadoPeticion = await axios.post(
      `${apiJNEVerificationConfig.urlJNErequestVerification}`,
      {
        CODDNI: dni,
      },
      {
        headers: {
          requestVerificationToken:
            apiJNEVerificationConfig.requestVerificationToken,
          "Content-Type": "application/json",
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    );
    const response = resultadoPeticion.data;
    if (String(response.data).replace(/\|/g, "").length > 0) {
      const nombresCompletos = String(response.data).split("|");
      return {
        nombres: `${nombresCompletos[2]}`,
        apellidos: `${nombresCompletos[0]} ${nombresCompletos[1]}`,
      };
    }
    return null;
  } catch (err) {
    console.error(
      `Error en validacionService.dniValido en API Externa: ${err}`
    );
    return null;
  }
};

module.exports = validacionService;
