//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Servicios");

//Routes
routes.post(
    "/transforma/api/servicios/modulo/setServicio",
    async (req, res) => {
        let controllerServicios = new classController();
        await controllerServicios.setServicio(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/modulo/getServicio",
    async (req, res) => {
        let controllerServicios = new classController();
        await controllerServicios.getServicio(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/modulo/getServiciosActivos",
    async (req, res) => {
        let controllerServicios = new classController();
        await controllerServicios.getServiciosActivos(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/modulo/updateServicio",
    async (req, res) => {
        let controllerServicios = new classController();
        await controllerServicios.updateServicio(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/modulo/deleteServicio",
    async (req, res) => {
        let controllerServicios = new classController();
        await controllerServicios.deleteServicio(req, res);
    }
);

module.exports = routes;
