"use strict";

const usuarioRepository = {};

const { usuarioModel, rolModel, aplicacionModel } = require("../models");
const { Op } = require("sequelize");

usuarioRepository.registrarUsuario = async (usuario) => {
  try {
    const {
      dni,
      nombres,
      apellidos,
      email,
      password,
      audio_profile_id,
      audio_profile_status,
      url_foto_rostro,
      url_audio_grabacion,
      id_aplicacion,
    } = usuario;
    let nuevoUsuario = await usuarioModel.create(
      {
        dni,
        nombres,
        apellidos,
        email,
        password,
        url_foto_rostro,
        audio_profile_id,
        audio_profile_status,
        url_audio_grabacion,
        id_rol: 2, //Cliente
        id_aplicacion,
      },
      {
        fields: [
          "dni",
          "nombres",
          "apellidos",
          "email",
          "password",
          "url_foto_rostro",
          "audio_profile_id",
          "audio_profile_status",
          "url_audio_grabacion",
          "id_rol",
          "id_aplicacion",
        ],
      }
    );
    return nuevoUsuario;
  } catch (err) {
    console.log(err);
    throw new Error(`Error en usuarioRepository.registrarUsuario: ${err}`);
  }
};

usuarioRepository.actualizarUsuario = async (usuario) => {
  try {
    const { id, audio_profile_status } = usuario;
    let usuarioActualizado = await usuarioModel.update(
      {
        audio_profile_status: audio_profile_status,
      },
      {
        where: {
          id: Number(id),
        },
        fields: ["audio_profile_status"],
        returning: true,
      }
    );
    return usuarioActualizado;
  } catch (err) {
    throw new Error(`Error en usuarioRepository.actualizarUsuario: ${err}`);
  }
};

usuarioRepository.listarUsuarios = async () => {
  try {
    let usuarios = await usuarioModel.findAll({
      attributes: [
        "id",
        "dni",
        "nombres",
        "apellidos",
        "email",
        "audio_profile_status",
        "url_foto_rostro",
      ],
      include: [
        {
          required: true,
          model: rolModel,
        },
        {
          required: true,
          model: aplicacionModel,
        },
      ],
    });
    return usuarios;
  } catch (err) {
    throw new Error(`Error en usuarioRepository.listarUsuarios: ${err}`);
  }
};
usuarioRepository.listarUsuariosPorIdAplicacion = async (id_aplicacion) => {
  try {
    let usuarios = await usuarioModel.findAll({
      attributes: [
        "id",
        "dni",
        "nombres",
        "apellidos",
        "email",
        "audio_profile_status",
        "url_foto_rostro",
      ],
      include: [
        {
          required: true,
          model: rolModel,
          where: {
            id: 2, //Rol Cliente
          },
        },
        {
          required: true,
          model: aplicacionModel,
          where: {
            id: Number(id_aplicacion),
          },
        },
      ],
    });
    return usuarios;
  } catch (err) {
    throw new Error(
      `Error en usuarioRepository.listarUsuariosPorIdAplicacion: ${err}`
    );
  }
};

usuarioRepository.obtenerUsuarioPorId = async (id) => {
  try {
    let usuario = await usuarioModel.findOne({
      attributes: [
        "id",
        "dni",
        "nombres",
        "apellidos",
        "email",
        "url_foto_rostro",
        "audio_profile_id",
        "url_audio_grabacion",
      ],
      include: [
        {
          required: true,
          model: rolModel,
        },
        {
          model: aplicacionModel,
        },
      ],
      where: {
        id: Number(id),
      },
    });
    return usuario;
  } catch (err) {
    throw new Error(`Error en usuarioRepository.obtenerUsuarioPorId: ${err}`);
  }
};

usuarioRepository.obtenerUsuarioPorEmail = async (email) => {
  try {
    let usuario = await usuarioModel.findOne({
      attributes: [
        "id",
        "dni",
        "nombres",
        "apellidos",
        "email",
        "password",
        "url_foto_rostro",
        "audio_profile_id",
        "url_audio_grabacion",
      ],
      include: [
        {
          required: true,
          model: rolModel,
        },
        {
          model: aplicacionModel,
        },
      ],
      where: {
        email: String(email).toLowerCase(),
      },
    });
    return usuario;
  } catch (err) {
    throw new Error(
      `Error en usuarioRepository.obtenerUsuarioPorEmail: ${err}`
    );
  }
};

module.exports = usuarioRepository;
