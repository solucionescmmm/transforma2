//librerias
const routes = require("express").Router();

// class
const classController = require("../../app/controllers/ctrl_Listas");

routes.get("/transforma/api/listas", async (req, res) => {
    let controllerListas = new classController();
    controllerListas.getListas(req, res);
});

module.exports = routes;
