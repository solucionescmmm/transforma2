//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_DiagnosticoProducto");

//Routes
routes.post(
    "/transforma/api/diagnosticos/diagnosticoDisenio/setDiagnosticoProducto",
    async (req, res) => {
        let controllerDiagnosticoProducto = new classController();
        await controllerDiagnosticoProducto.setDiagnosticoProducto(req, res);
    }
);

routes.put(
    "/transforma/api/diagnosticos/diagnosticoDisenio/updateDiagnosticoProducto",
    async (req, res) => {
        let controllerDiagnosticoProducto = new classController();
        await controllerDiagnosticoProducto.updateDiagnosticoProducto(req, res);
    }
);

routes.put(
    "/transforma/api/diagnosticos/diagnosticoDisenio/updateFinalizarDiagnosticoProducto",
    async (req, res) => {
        let controllerDiagnosticoProducto = new classController();
        await controllerDiagnosticoProducto.updateFinalizarDiagnosticoProducto(req, res);
    }
);

routes.delete(
    "/transforma/api/diagnosticos/diagnosticoDisenio/deleteDiagnosticoProducto",
    async (req, res) => {
        let controllerDiagnosticoProducto = new classController();
        await controllerDiagnosticoProducto.deleteDiagnosticoProducto(req, res);
    }
);

routes.get(
    "/transforma/api/diagnosticos/diagnosticoDisenio/getDiagnosticoProducto",
    async (req, res) => {
        let controllerDiagnosticoProducto = new classController();
        await controllerDiagnosticoProducto.getDiagnosticoProducto(req, res);
    }
);

routes.get(
    "/transforma/api/diagnosticos/diagnosticoDisenio/getDiagnosticoProductoInforme",
    async (req, res) => {
        let controllerDiagnosticoProducto = new classController();
        await controllerDiagnosticoProducto.getDiagnosticoProductoInforme(req, res);
    }
);
module.exports = routes;
