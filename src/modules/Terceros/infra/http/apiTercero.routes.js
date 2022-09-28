//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Tercero");

//Routes
routes.post("/transforma/api/Tercero/setTercero", async (req, res) => {
    let controllerTercero = new classController();
    await controllerTercero.setTercero(req, res);
});

routes.put("/transforma/api/Tercero/updateTercero", async (req, res)=>{
    let controllerTercero = new classController()
    await controllerTercero.updateTercero(req, res)
})

routes.delete("/transforma/api/Tercero/deleteTercero", async (req, res)=>{
    let controllerTercero = new classController()
    await controllerTercero.deleteTercero(req, res)
})

routes.get("/transforma/api/Tercero/getTercero", async(req, res)=>{
    let controllerTercero = new classController()
    await controllerTercero.getTercero(req, res)
})

module.exports = routes;