"use strict";

const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./config/sequelizeConfig");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Inicializaciones
const app = express();

//Configuraciones
app.set("port", process.env.PORT);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require("./routes/index"));
app.use(cors());
app.use("/api/v1/validaciones", require("./routes/validacionRoute"));
app.use("/api/v1/usuarios", require("./routes/usuarioRoute"));

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Servidor ejecutándose por el puerto ${app.get("port")}`);
});
