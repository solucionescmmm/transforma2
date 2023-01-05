//Librerias
const express = require("express");
const app = express();
const path = require("path");
const apicache = require("apicache-plus")

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
app.use(apicache.middleware(process.env.CACHE_DURATION))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));

//Static
app.use(
    "/uploads/Empresarios",
    express.static(path.resolve(__dirname, "../../Empresarios/app/uploads"))
);

//router
app.use(require("../infra/http/apiMain.routes"));
app.use(require("../../Empresarios/infra/http/apiEmpresarios.routes"));
app.use(require("../../Historicos/infra/http/apiHistoricos.routes"))
app.use(require("../../Listas/Infra/http/apiListas.routes"));
app.use(require("../../Localizaciones/infra/http/apiLocalizaciones.routes"))
app.use(require("../../Comentarios/infra/http/apiComentarios.routes"))
app.use(require("../../Diagnosticos/Diagnostico Diseño/Diagnostico de Producto/infra/http/apiDiagnosticoProducto.routes"))
app.use(require("../../Diagnosticos/Diagnostico Diseño/Diagnostico de Servicio/infra/http/apiDiagnosticoServicio.routes"))
app.use(require("../../Diagnosticos/Diagnostico Empresarial/Diagnostico Competencias Humanas/infra/http/apiDiagnosticoHumanas.routes"))
app.use(require("../../Diagnosticos/Diagnostico Empresarial/Diagnostico Genereal/infra/http/apiDiagnosticoGeneral.routes"))
app.use(require("../../Diagnosticos/Main/infra/http/apiDiagnosticos.routes"))
app.use(require("../../Document/infra/http/apiDocumento.routes"))
app.use(require("../../Estados/infra/http/apiEstados.routes"))
app.use(require("../../Objetivos/infra/http/apiObjetivos.routes"))
app.use(require("../../Rutas/infra/http/apiRutas.routes"))
app.use(require("../../Servicios/Maestros/Areas/infra/http/apiAreas.routes"))
app.use(require("../../Servicios/Maestros/Sedes/infra/http/apiSedes.routes"))
app.use(require("../../Servicios/Maestros/Tipos de Tarifas/infra/http/apiTipoTarifa.routes"))
app.use(require("../../Servicios/Maestros/Atributos/infra/http/apiAtributos.routes"))
app.use(require("../../Servicios/Maestros/Tipos de Campos/infra/http/apiTipoCampos.routes"))
app.use(require("../../Servicios/Maestros/Tipos de Servicios/infra/http/apiTiposServicios.routes"))
app.use(require("../../Servicios/Maestros/ProyectosEspeciales/infra/http/apiProyectosEspeciales.routes"))
app.use(require("../../Servicios/Modulo/Servicio/infra/http/apiServicios.routes"))
app.use(require("../../Servicios/Modulo/Paquetes/infra/http/apiPaquetes.routes"))
app.use(require("../../Tareas/infra/http/apiTareas.routes"))
app.use(require("../../Terceros/infra/http/apiTercero.routes"))
app.use(require("../../Usuarios/infra/http/apiUsuarios.routes"))


module.exports = app;
