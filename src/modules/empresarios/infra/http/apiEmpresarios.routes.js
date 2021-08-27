//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Empresarios");

//Routes
routes.post("/transforma/api/Interesados/setRegistro", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.postEmpresario(req, res);
});

routes.post("/transforma/api/Interesados/uploadFile", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.uploadFileEmpresario(req, res);
});

routes.get("/transforma/api/Interesados/getData", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.getEmpresario(req, res);
});

module.exports = routes;
