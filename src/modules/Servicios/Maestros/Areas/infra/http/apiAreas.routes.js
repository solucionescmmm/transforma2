//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Areas");

//Routes
routes.post(
    "/transforma/api/servicios/maestro/areas/setAreas",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.setArea(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/maestro/areas/getAreas",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getArea(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/maestro/areas/updateAreas",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.updateArea(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/maestro/areas/deleteAreas",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.deleteArea(req, res);
    }
);

module.exports = routes;
