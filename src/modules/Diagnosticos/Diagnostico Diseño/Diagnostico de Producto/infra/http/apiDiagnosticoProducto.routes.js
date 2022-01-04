//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_DiagnosticoProducto");

//Routes
routes.post("/transforma/api/diagnosticos/diagnosticoDisenio/setDiagnosticoProducto", async (req, res) => {
    let controllerDiagnosticoProducto = new classController();
    await controllerDiagnosticoProducto.setDiagnosticoProducto(req, res);
});

routes.put("/transforma/api/diagnosticos/diagnosticoDisenio/updateDiagnosticoProducto", async (req, res) => {
    let controllerDiagnosticoProducto = new classController();
    await controllerDiagnosticoProducto.updateDiagnosticoProducto(req, res);
});

module.exports = routes;
