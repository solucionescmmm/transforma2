//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_ProyectosEspeciales");

//Routes
routes.post(
    "/transforma/api/servicios/maestro/proyectosespeciales/setProyectosEspeciales",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.setProyectosEspeciales(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/maestro/proyectosespeciales/getProyectosEspeciales",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getProyectosEspeciales(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/maestro/proyectosespeciales/updateProyectosEspeciales",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.updateProyectosEspeciales(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/maestro/proyectosespeciales/deleteProyectosEspeciales",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.deleteProyectosEspeciales(req, res);
    }
);

module.exports = routes;
