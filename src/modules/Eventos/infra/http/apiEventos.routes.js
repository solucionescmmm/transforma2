//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Eventos");

//Routes
routes.post("/transforma/api/eventos/setEventos", async (req, res) => {
    let controllerEventos = new classController();
    await controllerEventos.setEventos(req, res);
});

routes.get("/transforma/api/eventos/getEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.getEventos(req, res)
})

routes.get("/transforma/api/eventos/getTiposEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.getTiposEventos(req, res)
})

routes.put("/transforma/api/eventos/updateEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.updateEventos(req, res)
})

routes.delete("/transforma/api/eventos/deleteEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.deleteEventos(req, res)
})

module.exports = routes;