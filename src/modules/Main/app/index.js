//Librerias
const express = require("express");
const app = express();
const path = require("path");

//Librerias adicionales
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const authToken = require("../../../common/middleware/authToken");

//Declaracion de variables globales
app.set("port", process.env.PORT);
app.set("typeServer", process.env.NODE_ENV);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan((process.env.NODE_ENV = "development" ? "dev" : "common")));
app.use(helmet());
app.use(compression({ level: 9 }));
app.use("/transforma/api", authToken);

//Static
app.use(
    "/uploads/Empresarios",
    express.static(path.resolve(__dirname, "../../Empresarios/app/uploads"))
);

//router
app.use(require("../infra/http/apiMain.routes"));
app.use(require("../../Listas/Infra/http/apiListas.routes"));
app.use(require("../../Empresarios/infra/http/apiEmpresarios.routes"));
app.use(require("../../Localizaciones/infra/http/apiLocalizaciones.routes"))
app.use(require("../../Comentarios/infra/http/apiComentarios.routes"))
app.use(require("../../Diagnosticos/Diagnostico Empresarial/Diagnostico Genereal/infra/http/apiDiagnosticoGeneral.routes"))
app.use(require("../../Diagnosticos/Diagnostico Diseño/Diagnostico de Producto/infra/http/apiDiagnosticoProducto.routes"))
app.use(require("../../Usuarios/Infra/http/apiUsuarios.routes"))

module.exports = app;
