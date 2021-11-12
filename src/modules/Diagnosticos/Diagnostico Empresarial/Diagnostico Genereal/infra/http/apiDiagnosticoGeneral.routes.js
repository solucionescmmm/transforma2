//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_DiagnosticoGeneral");

//Routes
routes.post("/transforma/api/diagnosticos/diagnosticoEmpresarial/setDiagnosticoGeneral", async (req, res) => {
    let controllerComentarios = new classController();
    await controllerComentarios.setDiagnosticoGeneral(req, res);
});



module.exports = routes;