//Paquetes
require("dotenv-flow").config();

//Librerias
const express = require("express");
const app = express();

//Librerias adicionales
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const authToken = require("../../../common/middleware/authToken");

//Declaracion de variables globales
app.set("port", process.env.PORT);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan((process.env.NODE_ENV = "development" ? "dev" : "common")));
app.use(helmet());
app.use(compression({ level: 9 }));
app.use("/transforma/api", authToken);

//router
app.use(require("../infra/http/apiMain.routes"));
app.use(require("../../Listas/Infra/http/apiListas.routes"));
app.use(require("../../Empresarios/infra/http/apiEmpresarios.routes"));

module.exports = app;
