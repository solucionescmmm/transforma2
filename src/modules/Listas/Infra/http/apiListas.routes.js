//librerias
const routes = require("express").Router();

//Middlewares
const cache = require("../../../../common/middleware/apiCache");

// Clases
const classController = require("../../app/controllers/ctrl_Listas");

routes.get("/transforma/api/listas", cache(), async (req, res) => {
    let controllerListas = new classController();
    controllerListas.getListas(req, res);
});

module.exports = routes;
