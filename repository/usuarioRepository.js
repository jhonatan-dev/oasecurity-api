"use strict";

const usuarioRepository = {};

const { usuarioModel, rolModel } = require("../models");

usuarioRepository.registrarUsuario = async (usuario) => {
  try {
    const {
      dni,
      nombres,
      apellidos,
      email,
      password,
      image_face_id,
      audio_profile_id,
      url_foto_rostro,
      url_audio_grabacion,
    } = usuario;
    let nuevoUsuario = await usuarioModel.create({
      dni,
      nombres,
      apellidos,
      email,
      password,
      image_face_id,
      audio_profile_id,
      url_foto_rostro,
      url_audio_grabacion,
      id_rol: 2, //Cliente
    });
    return nuevoUsuario;
  } catch (err) {
    throw new Error(`Error en usuarioRepository.registrarUsuario: ${err}`);
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
      ],
    });
    return usuarios;
  } catch (err) {
    throw new Error(`Error en usuarioRepository.listarUsuarios: ${err}`);
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
        "image_face_id",
        "url_foto_rostro",
        "audio_profile_id",
        "url_audio_grabacion",
      ],
      include: [
        {
          required: true,
          model: rolModel,
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
        "image_face_id",
        "url_foto_rostro",
        "audio_profile_id",
        "url_audio_grabacion",
      ],
      include: [
        {
          required: true,
          model: rolModel,
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
