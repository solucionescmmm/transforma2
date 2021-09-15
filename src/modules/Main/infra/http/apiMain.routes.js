//libreias
routes = require("express").Router();

//Clases
const classController = require("../../app/controllers/ctrl_Main");

//Routes
routes.get("/admin/api/authorize", async (req, res) => {
    let classMain = new classController();
    await classMain.Authorize(req, res);
});

routes.post("/admin/api/login", async (req, res) => {
    let classMain = new classController();
    await classMain.Login(req, res);
});

module.exports = routes;
