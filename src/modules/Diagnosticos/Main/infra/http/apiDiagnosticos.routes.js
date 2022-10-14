//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Diagnosticos");

//Routes
routes.post(
    "/transforma/api/Diagnosticos/main/setDiagnosticos",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.setDiagnosticos(req, res);
    }
);

routes.get(
    "/transforma/api/Diagnosticos/main/getDiagnosticos",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getDiagnosticos(req, res);
    }
);

routes.get(
    "/transforma/api/Diagnosticos/main/getTipoDiagnosticos",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getTipoDiagnosticos(req, res);
    }
);

routes.get(
    "/transforma/api/Diagnosticos/main/getEstadoDiagnosticos",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getEstadoDiagnosticos(req, res);
    }
);

routes.put(
    "/transforma/api/Diagnosticos/main/updateDiagnosticos",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.updateDiagnosticos(req, res);
    }
);

routes.delete(
    "/transforma/api/Diagnosticos/main/deleteDiagnosticos",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.deleteDiagnosticos(req, res);
    }
);

module.exports = routes;
