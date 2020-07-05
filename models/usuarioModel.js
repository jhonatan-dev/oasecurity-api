const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class Usuario extends Model {}
module.exports = (sequelize) => {
  Usuario.init(
    {
      // atributos
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      dni: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nombres: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellidos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url_foto_rostro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      audio_profile_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      audio_profile_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url_audio_grabacion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_rol: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      },
      id_aplicacion: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      },
    },
    {
      // opciones
      sequelize,
      modelName: "usuario",
      tableName: "usuarios",
      name: {
        singular: "usuario",
        plural: "usuarios",
      },
    }
  );
  return Usuario;
};
