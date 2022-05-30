//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Atributos");

//Routes
routes.post(
    "/transforma/api/servicios/maestro/atributos/setAtributos",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.setAtributos(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/maestro/atributos/getAtributos",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getAtributos(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/maestro/atributos/updateAtributos",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.updateAtributos(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/maestro/atributos/deleteAtributos",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.deleteAtributos(req, res);
    }
);

module.exports = routes;