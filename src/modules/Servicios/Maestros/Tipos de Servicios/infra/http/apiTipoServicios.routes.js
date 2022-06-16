//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_TipoServicios");

//Routes
routes.post(
    "/transforma/api/servicios/maestro/tiposervicio/setTipoServicios",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.setTipoServicios(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/maestro/tiposervicio/getTipoServicios",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getTipoServicios(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/maestro/tiposervicio/updateTipoServicios",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.updateTipoServicios(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/maestro/tiposervicio/deleteTipoServicios",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.deleteTipoServicios(req, res);
    }
);

module.exports = routes;
