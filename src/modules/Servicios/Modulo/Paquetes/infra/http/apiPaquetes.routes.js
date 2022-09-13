//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Paquetes");

//Routes
routes.post(
    "/transforma/api/servicios/modulo/setPaquete",
    async (req, res) => {
        let controllerPaquetes = new classController();
        await controllerPaquetes.setPaquete(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/modulo/getPaquete",
    async (req, res) => {
        let controllerPaquetes = new classController();
        await controllerPaquetes.getPaquete(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/modulo/getPaquetesActivos",
    async (req, res) => {
        let controllerPaquetes = new classController();
        await controllerPaquetes.getPaquetesActivos(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/modulo/updatePaquete",
    async (req, res) => {
        let controllerPaquetes = new classController();
        await controllerPaquetes.updatePaquete(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/modulo/deletePaquete",
    async (req, res) => {
        let controllerPaquetes = new classController();
        await controllerPaquetes.deletePaquete(req, res);
    }
);

module.exports = routes;
