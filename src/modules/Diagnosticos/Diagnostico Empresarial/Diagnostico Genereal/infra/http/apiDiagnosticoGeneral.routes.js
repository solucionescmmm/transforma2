//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_DiagnosticoGeneral");

//Routes
routes.post("/transforma/api/diagnosticos/diagnosticoEmpresarial/setDiagnosticoGeneral", async (req, res) => {
    let controllerDiagnosticoGeneral = new classController();
    await controllerDiagnosticoGeneral.setDiagnosticoGeneral(req, res);
});



module.exports = routes;