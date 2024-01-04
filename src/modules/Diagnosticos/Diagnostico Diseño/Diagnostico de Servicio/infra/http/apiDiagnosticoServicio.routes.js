//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_DiagnosticoServicio");

//Routes
routes.post(
    "/transforma/api/diagnosticos/diagnosticoDisenio/setDiagnosticoServicio",
    async (req, res) => {
        let controllerDiagnosticoServicio = new classController();
        await controllerDiagnosticoServicio.setDiagnosticoServicio(req, res);
    }
);

routes.put(
    "/transforma/api/diagnosticos/diagnosticoDisenio/updateDiagnosticoServicio",
    async (req, res) => {
        let controllerDiagnosticoServicio = new classController();
        await controllerDiagnosticoServicio.updateDiagnosticoServicio(req, res);
    }
);

routes.put(
    "/transforma/api/diagnosticos/diagnosticoDisenio/updateFinalizarDiagnosticoServicio",
    async (req, res) => {
        let controllerDiagnosticoServicio = new classController();
        await controllerDiagnosticoServicio.updateFinalizarDiagnosticoServicio(req, res);
    }
);

routes.get(
    "/transforma/api/diagnosticos/diagnosticoDisenio/getDiagnosticoServicio",
    async (req, res) => {
        let controllerDiagnosticoServicio = new classController();
        await controllerDiagnosticoServicio.getDiagnosticoServicio(req, res);
    }
);

routes.get(
    "/transforma/api/diagnosticos/diagnosticoDisenio/getDiagnosticoServicioInforme",
    async (req, res) => {
        let controllerDiagnosticoServicio = new classController();
        await controllerDiagnosticoServicio.getDiagnosticoServicioInforme(req, res);
    }
);

module.exports = routes;
