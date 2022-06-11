//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_TipoTarifa");

//Routes
routes.post(
    "/transforma/api/servicios/maestro/tipotarifa/setTipoTarifa",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.setTipoTarifa(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/maestro/tipotarifa/getTipoTarifa",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getTipoTarifa(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/maestro/tipotarifa/updateTipoTarifa",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.updateTipoTarifa(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/maestro/tipotarifa/deleteTipoTarifa",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.deleteTipoTarifa(req, res);
    }
);

module.exports = routes;
