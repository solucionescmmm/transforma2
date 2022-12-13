//librerias
const routes = require("express").Router();
const cache = require("apicache-plus")

//Classes
const classController = require("../../app/controllers/ctrl_Rutas");

//Routes
routes.post(
    "/transforma/api/rutas/setRutas",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.setRutas(req, res);
    }
);

routes.get(
    "/transforma/api/rutas/getRutas", cache(),
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getRutas(req, res);
    }
);

routes.get(
    "/transforma/api/rutas/getEstadosRutas",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getEstadosRutas(req, res);
    }
);

routes.put(
    "/transforma/api/rutas/updateRutas",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.updateRutas(req, res);
    }
);

routes.delete(
    "/transforma/api/rutas/deleteRutas",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.deleteRutas(req, res);
    }
);

module.exports = routes;
