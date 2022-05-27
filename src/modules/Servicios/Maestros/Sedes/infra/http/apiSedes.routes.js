//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Sedes");

//Routes
routes.post(
    "/transforma/api/servicios/maestro/sedes/setSedes",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.setSedes(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/maestro/sedes/getSedes",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getSedes(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/maestro/sedes/updateSedes",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.updateSedes(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/maestro/sedes/deleteSedes",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.deleteSedes(req, res);
    }
);

module.exports = routes;