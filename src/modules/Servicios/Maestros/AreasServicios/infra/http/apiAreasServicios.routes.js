//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_AreasServicios");

//Routes
routes.post(
    "/transforma/api/servicios/maestro/areaservicio/setAreasServicios",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.setAreasServicios(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/maestro/areaservicio/getAreasServicios",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getAreasServicios(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/maestro/areaservicio/updateAreasServicios",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.updateAreasServicios(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/maestro/areaservicio/deleteAreasServicios",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.deleteAreasServicios(req, res);
    }
);

module.exports = routes;
