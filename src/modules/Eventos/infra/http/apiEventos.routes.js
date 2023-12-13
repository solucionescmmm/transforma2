//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Eventos");

//Routes
routes.post("/transforma/api/eventos/setEventos", async (req, res) => {
    let controllerEventos = new classController();
    await controllerEventos.setEventos(req, res);
});

routes.post("/transforma/api/eventos/setSesionesEventos", async (req, res) => {
    let controllerEventos = new classController();
    await controllerEventos.setSesionesEventos(req, res);
});

routes.post("/transforma/api/eventos/setAsistentesEventos", async (req, res) => {
    let controllerEventos = new classController();
    await controllerEventos.setAsistentesEventos(req, res);
});

routes.post("/transforma/api/eventos/setAsistentesSesionesEventos", async (req, res) => {
    let controllerEventos = new classController();
    await controllerEventos.setAsistentesSesionesEventos(req, res);
});

routes.put("/transforma/api/eventos/updateEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.updateEventos(req, res)
})

routes.put("/transforma/api/eventos/updateSesionesEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.updateSesionesEventos(req, res)
})

routes.put("/transforma/api/eventos/updateCambiarEstadoEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.updateCambiarEstadoEventos(req, res)
})

routes.put("/transforma/api/eventos/updateFinalizarSesionesEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.updateFinalizarSesionesEventos(req, res)
})

routes.get("/transforma/api/eventos/getEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.getEventos(req, res)
})

routes.get("/transforma/api/eventos/getSesionesEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.getSesionesEventos(req, res)
})

routes.get("/transforma/api/eventos/getAsistentesEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.getAsistentesEventos(req, res)
})

routes.get("/transforma/api/eventos/getAsistentesSesionesEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.getAsistentesSesionesEventos(req, res)
})

routes.get("/transforma/api/eventos/getTiposEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.getTiposEventos(req, res)
})

routes.get("/transforma/api/eventos/getProximosEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.getProximosEventos(req, res)
})

routes.delete("/transforma/api/eventos/deleteEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.deleteEventos(req, res)
})

routes.delete("/transforma/api/eventos/deleteSesionesEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.deleteSesionesEventos(req, res)
})

routes.delete("/transforma/api/eventos/deleteAsistentesEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.deleteAsistentesEventos(req, res)
})

routes.delete("/transforma/api/eventos/deleteAsistentesSesionesEventos", async (req, res) => {
    let controllerEventos = new classController()
    await controllerEventos.deleteAsistentesSesionesEventos(req, res)
})


module.exports = routes;
