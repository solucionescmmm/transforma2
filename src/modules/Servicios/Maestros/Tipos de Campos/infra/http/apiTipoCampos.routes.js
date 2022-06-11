//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_TipoCampos");

//Routes
routes.get(
    "/transforma/api/servicios/maestro/tipoCampos/getTipoCampos",
    async (req, res) => {
        let controllerTipoCampos = new classController();
        await controllerTipoCampos.getTipoCampos(req, res);
    }
);

module.exports = routes; 