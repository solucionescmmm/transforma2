//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Historicos");

//Routes
routes.post("/transforma/api/Historico/setHistorico", async (req, res) => {
    let controllerHistoricos = new classController();
    await controllerHistoricos.setHistorico(req, res);
});

routes.get("/transforma/api/Historico/getHistorico", async (req, res) => {
    let controllerHistoricos = new classController();
    await controllerHistoricos.getHistorico(req, res);
});



module.exports = routes;
