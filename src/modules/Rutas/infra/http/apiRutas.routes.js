//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Rutas");

//Routes
routes.post(
    "/transforma/api/rutas/setRutas",
    async (req, res) => {
        let controllerRutas = new classController();
        await controllerRutas.setRutas(req, res);
    }
);

routes.get(
    "/transforma/api/rutas/getRutas",
    async (req, res) => {
        let controllerRutas = new classController();
        await controllerRutas.getRutas(req, res);
    }
);

routes.get(
    "/transforma/api/rutas/getEstadosRutas",
    async (req, res) => {
        let controllerRutas = new classController();
        await controllerRutas.getEstadosRutas(req, res);
    }
);

routes.get(
    "/transforma/api/rutas/getContadorRutas",
    async (req, res) => {
        let controllerRutas = new classController();
        await controllerRutas.getContadorRutas(req, res);
    }
);

routes.get(
    "/transforma/api/rutas/getRutasActivas",
    async (req, res) => {
        let controllerRutas = new classController();
        await controllerRutas.getRutasActivas(req, res);
    }
);

routes.put(
    "/transforma/api/rutas/updateRutas",
    async (req, res) => {
        let controllerRutas = new classController();
        await controllerRutas.updateRutas(req, res);
    }
);

routes.put(
    "/transforma/api/rutas/updateRutaEnviada",
    async (req, res) => {
        let controllerRutas = new classController();
        await controllerRutas.updateRutaEnviada(req, res);
    }
);

routes.put(
    "/transforma/api/rutas/updateRutaActivada",
    async (req, res) => {
        let controllerRutas = new classController();
        await controllerRutas.updateRutaActivada(req, res);
    }
);

routes.put(
    "/transforma/api/rutas/updateRutaCancelada",
    async (req, res) => {
        let controllerRutas = new classController();
        await controllerRutas.updateRutaCancelada(req, res);
    }
);

routes.put(
    "/transforma/api/rutas/checkPaqueteFase",
    async (req, res) => {
        let controllerRutas = new classController();
        await controllerRutas.checkPaqueteFase(req, res);
    }
);

routes.put(
    "/transforma/api/rutas/checkServicioFase",
    async (req, res) => {
        let controllerRutas = new classController();
        await controllerRutas.checkServicioFase(req, res);
    }
);

routes.delete(
    "/transforma/api/rutas/deleteRutas",
    async (req, res) => {
        let controllerRutas = new classController();
        await controllerRutas.deleteRutas(req, res);
    }
);

module.exports = routes;
