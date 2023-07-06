//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_DiagnosticoGeneral");

//Routes
routes.post(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/setDiagnosticoGeneral",
    async (req, res) => {
        let controllerDiagnosticoGeneral = new classController();
        await controllerDiagnosticoGeneral.setDiagnosticoGeneral(req, res);
    }
);

routes.get(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/getDiagnosticoGeneral",
    async (req, res) => {
        let controllerDiagnosticoGeneral = new classController();
        await controllerDiagnosticoGeneral.getDiagnosticoGeneral(req, res);
    }
);

routes.put(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/updateDiagnosticoGeneral",
    async (req, res) => {
        let controllerDiagnosticoGeneral = new classController();
        await controllerDiagnosticoGeneral.updateDiagnosticoGeneral(req, res);
    }
);

routes.put(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/updateFinalizarDiagnosticoGeneral",
    async (req, res) => {
        let controllerDiagnosticoGeneral = new classController();
        await controllerDiagnosticoGeneral.updateFinalizarDiagnosticoGeneral(req, res);
    }
);

module.exports = routes;
