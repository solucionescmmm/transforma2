//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_DiagnosticoExpress");

//Routes
routes.post(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/setDiagnosticoExpress",
    async (req, res) => {
        let controllerDiagnosticoExpress = new classController();
        await controllerDiagnosticoExpress.setDiagnosticoExpress(req, res);
    }
);

routes.get(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/getDiagnosticoExpress",
    async (req, res) => {
        let controllerDiagnosticoExpress = new classController();
        await controllerDiagnosticoExpress.getDiagnosticoExpress(req, res);
    }
);

routes.put(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/updateDiagnosticoExpress",
    async (req, res) => {
        let controllerDiagnosticoExpress = new classController();
        await controllerDiagnosticoExpress(req, res);
    }
);

module.exports = routes;
