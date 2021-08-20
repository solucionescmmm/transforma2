//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Empresarios");

//routes
routes.post("/transforma/api/postempresario", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.postEmpresario(req, res);
});

routes.get("/transforma/api/getEmpresario", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.getEmpresario(req, res);
});

module.exports = routes;
