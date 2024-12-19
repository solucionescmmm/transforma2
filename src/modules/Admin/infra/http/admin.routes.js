//libreias
routes = require("express").Router();

//Clases
const classController = require("../../app/controllers/ctrl_Admin");

//Routes
routes.post("/transforma/api/admin/setCargaMasiva", async (req, res) => {
    let classAdmin = new classController();
    await classAdmin.setCargaMasiva(req, res);
});

module.exports = routes;