//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_DiagnosticoHumanas");

//Routes
routes.post(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/setDiagnosticoHumana",
    async (req, res) => {
        let controllerDiagnosticoHumana = new classController();
        await controllerDiagnosticoHumana.setDiagnosticoHumana(req, res);
    }
);

routes.get(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/getDiagnosticoHumana",
    async (req, res) => {
        let controllerDiagnosticoHumana = new classController();
        await controllerDiagnosticoHumana.getDiagnosticoHumana(req, res);
    }
);

routes.put(
    "/transforma/api/diagnosticos/diagnosticoEmpresarial/updateDiagnosticoHumana",
    async (req, res) => {
        let controllerDiagnosticoHumana = new classController();
        await controllerDiagnosticoHumana.updateDiagnosticoHumana(req, res);
    }
);

module.exports = routes;