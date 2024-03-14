//librerias
const routes = require("express").Router();

//Middlewares
const cache = require("../../../../common/middleware/apiCache");

// Clases
const classController = require("../../app/controllers/ctrl_Localizaciones");

routes.get("/transforma/api/localizaciones/getPaises", cache(), async (req, res) => {
    let controllerListas = new classController();
    controllerListas.getPaises(req, res);
});

routes.get("/transforma/api/localizaciones/getdepartamentos", cache(), async (req, res) => {
    let controllerListas = new classController();
    controllerListas.getDepartamento(req, res);
});

routes.get("/transforma/api/localizaciones/getmunicipios", cache(), async (req, res) => {
    let controllerListas = new classController();
    controllerListas.getMunicipios(req, res);
});

routes.get("/transforma/api/localizaciones/getlocalidades", cache(), async (req, res) => {
    let controllerListas = new classController();
    controllerListas.getLocalidades(req, res);
});

module.exports = routes;