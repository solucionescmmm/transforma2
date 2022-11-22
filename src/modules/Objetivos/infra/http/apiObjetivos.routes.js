//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Objetivos");

//Routes
routes.post(
    "/transforma/api/Objetivos/setObjetivos",
    async (req, res) => {
        let controllerObjetivos = new classController();
        await controllerObjetivos.setObjetivos(req, res);
    }
);

routes.get(
    "/transforma/api/Objetivos/getObjetivos",
    async (req, res) => {
        let controllerObjetivos = new classController();
        await controllerObjetivos.getObjetivos(req, res);
    }
);

routes.put(
    "/transforma/api/Objetivos/updateObjetivos",
    async (req, res) => {
        let controllerObjetivos = new classController();
        await controllerObjetivos.updateObjetivos(req, res);
    }
);

routes.delete(
    "/transforma/api/Objetivos/deleteObjetivos",
    async (req, res) => {
        let controllerObjetivos = new classController();
        await controllerObjetivos.deleteObjetivos(req, res);
    }
);

module.exports = routes;
