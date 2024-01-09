//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_DiagnosticoTecnicas");

//Routes
routes.post(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/setDiagnosticoTecnica",
    async (req, res) => {
        let controllerDiagnosticoTecnica = new classController();
        await controllerDiagnosticoTecnica.setDiagnosticoTecnica(req, res);
    }
);

routes.get(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/getDiagnosticoTecnica",
    async (req, res) => {
        let controllerDiagnosticoTecnica = new classController();
        await controllerDiagnosticoTecnica.getDiagnosticoTecnica(req, res);
    }
);

routes.delete(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/deleteDiagnosticoTecnica",
    async (req, res) => {
        let controllerDiagnosticoTecnica = new classController();
        await controllerDiagnosticoTecnica.deleteDiagnosticoTecnica(req, res);
    }
);

routes.put(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/updateDiagnosticoTecnica",
    async (req, res) => {
        let controllerDiagnosticoTecnica = new classController();
        await controllerDiagnosticoTecnica.updateDiagnosticoTecnica(req, res);
    }
);

routes.put(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/updateFinalizarDiagnosticoTecnicas",
    async (req, res) => {
        let controllerDiagnosticoTecnica = new classController();
        await controllerDiagnosticoTecnica.updateFinalizarDiagnosticoTecnicas(req, res);
    }
);

module.exports = routes;