//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_TiposServicios");

//Routes
routes.post(
    "/transforma/api/servicios/maestro/tiposervicio/setTiposServicios",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.setTiposServicios(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/maestro/tiposervicio/getTiposServicios",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getTiposServicios(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/maestro/tiposervicio/updateTiposServicios",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.updateTiposServicios(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/maestro/tiposervicio/deleteTiposServicios",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.deleteTiposServicios(req, res);
    }
);

module.exports = routes;
