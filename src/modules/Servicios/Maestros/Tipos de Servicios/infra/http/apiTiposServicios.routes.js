//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_TiposServicios");

//Routes
routes.post(
    "/transforma/api/servicios/maestro/tiposervicio/setTiposServicios",
    async (req, res) => {
        let controllerTipoServicio = new classController();
        await controllerTipoServicio.setTiposServicios(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/maestro/tiposervicio/getTiposServicios",
    async (req, res) => {
        let controllerTipoServicio = new classController();
        await controllerTipoServicio.getTiposServicios(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/maestro/tiposervicio/updateTiposServicios",
    async (req, res) => {
        let controllerTipoServicio = new classController();
        await controllerTipoServicio.updateTiposServicios(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/maestro/tiposervicio/deleteTiposServicios",
    async (req, res) => {
        let controllerTipoServicio = new classController();
        await controllerTipoServicio.deleteTiposServicios(req, res);
    }
);

module.exports = routes;
