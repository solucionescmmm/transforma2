//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Estados");

//Routes
routes.get(
    "/transforma/api/servicios/maestro/estados/getEstados",
    async (req, res) => {
        let controllerEstados = new classController();
        await controllerEstados.getEstado(req, res);
    }
);

module.exports = routes; 