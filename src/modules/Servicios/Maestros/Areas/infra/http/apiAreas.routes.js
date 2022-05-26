//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Areas");

//Routes
routes.post(
    "/transforma/api/servicios/maestro/areas/setAreas",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.setAreas(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/maestro/areas/getAreas",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getAreas(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/maestro/areas/updateAreas",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.updateAreas(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/maestro/areas/deleteAreas",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.deleteAreas(req, res);
    }
);

module.exports = routes;
