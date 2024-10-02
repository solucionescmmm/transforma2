//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Tareas");

//Routes
routes.post("/transforma/api/Tareas/setTarea", async (req, res) => {
    let controllerTareas = new classController();
    await controllerTareas.setTarea(req, res);
});

routes.post("/transforma/api/Tareas/setFinalizarTarea", async (req, res) => {
    let controllerTareas = new classController();
    await controllerTareas.setFinalizarTarea(req, res);
});

routes.put("/transforma/api/Tareas/updateTarea", async (req, res)=>{
    let controllerTareas = new classController()
    await controllerTareas.updateTarea(req, res)
})

routes.delete("/transforma/api/Tareas/deleteTarea", async (req, res)=>{
    let controllerTareas = new classController()
    await controllerTareas.deleteTarea(req, res)
})

routes.get("/transforma/api/Tareas/getTarea", async(req, res)=>{
    let controllerTareas = new classController()
    await controllerTareas.getTarea(req, res)
})

routes.get("/transforma/api/Tareas/getEstadoTarea", async(req, res)=>{
    let controllerTareas = new classController()
    await controllerTareas.getEstadoTarea(req, res)
})

module.exports = routes;