const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class Aplicacion extends Model {}
module.exports = (sequelize) => {
  Aplicacion.init(
    {
      // atributos
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url_login: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      // opciones
      sequelize,
      modelName: "aplicacion",
      tableName: "aplicaciones",
      name: {
        singular: "aplicacion",
        plural: "aplicaciones",
      },
    }
  );
  return Aplicacion;
};
