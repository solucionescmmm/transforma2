//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_DiagnosticoExpress");

//Routes
routes.post(
    "/transforma/api/diagnosticos/diagnosticoExpress/setDiagnosticoExpress",
    async (req, res) => {
        let controllerDiagnosticoExpress = new classController();
        await controllerDiagnosticoExpress.setDiagnosticoExpress(req, res);
    }
);

routes.get(
    "/transforma/api/diagnosticos/diagnosticoExpress/getDiagnosticoExpress",
    async (req, res) => {
        let controllerDiagnosticoExpress = new classController();
        await controllerDiagnosticoExpress.getDiagnosticoExpress(req, res);
    }
);

routes.put(
    "/transforma/api/diagnosticos/diagnosticoExpress/updateDiagnosticoExpress",
    async (req, res) => {
        let controllerDiagnosticoExpress = new classController();
        await controllerDiagnosticoExpress.updateDiagnosticoExpress(req, res);
    }
);

routes.put(
    "/transforma/api/diagnosticos/diagnosticoExpress/updateFinalizarDiagnosticoExpress",
    async (req, res) => {
        let controllerDiagnosticoExpress = new classController();
        await controllerDiagnosticoExpress.updateFinalizarDiagnosticoExpress(req, res);
    }
);

module.exports = routes;
