//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Empresarios");

//routes
routes.post("/transforma/api/postEmpresario", async(req, res) => {
    let controllerEmpresarios = new classController()
    await controllerEmpresarios.postEmpresario(req, res)
});