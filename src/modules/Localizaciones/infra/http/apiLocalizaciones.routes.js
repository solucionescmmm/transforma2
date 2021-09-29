//librerias
const routes = require("express").Router();

//Middlewares
const cache = require("../../../../common/middleware/apiCache");

// Clases
const classController = require("../../app/controllers/ctrl_Localizaciones");

routes.get("/transforma/api/localizaciones/getdepartamentos", cache(), async (req, res) => {
    console.log("Entre")
    let controllerListas = new classController();
    controllerListas.getDepartamento(req, res);
});

module.exports = routes;