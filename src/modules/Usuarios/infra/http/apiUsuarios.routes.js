//librerias
const routes = require("express").Router();

//Middlewares
const cache = require("../../../../common/middleware/apiCache");

// Clases
const classController = require("../../app/controllers/ctrl_Usuario");

routes.get("/transforma/api/usuarios/getUsuarios", async (req, res) => {
    let controllerUsuarios = new classController();
    controllerUsuarios.getUsuarios(req, res);
});

module.exports = routes;
