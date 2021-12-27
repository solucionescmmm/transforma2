//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_DiagnosticoProducto");

//Routes
routes.post("/transforma/api/diagnosticos/diagnosticoDiseño/setDiagnosticoProducto", async (req, res) => {
    let controllerDiagnosticoProducto = new classController();
    await controllerDiagnosticoProducto.setDiagnosticoProducto(req, res);
});

module.exports = routes;
