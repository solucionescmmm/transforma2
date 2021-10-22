//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Comentarios");

//Routes
routes.post("/transforma/api/comentarios/setComentario", async (req, res) => {
    let controllerComentarios = new classController();
    await controllerComentarios.setComentario(req, res);
});

routes.put("/transforma/api/comentarios/updateComentario", async (req, res)=>{
    let controllerComentarios = new classController()
    await controllerComentarios.updateComentario(req, res)
})

routes.delete("/transforma/api/comentarios/deleteComentario", async (req, res)=>{
    let controllerComentarios = new classController()
    await controllerComentarios.deleteComentario(req, res)
})

routes.get("/transforma/api/comentarios/getComentario", async(req, res)=>{
    let controllerComentarios = new classController()
    await controllerComentarios.getComentario(req, res)
})

routes.post("/transforma/api/comentarios/setRespuesta", async(req, res)=>{
    let controllerComentarios = new classController()
    await controllerComentarios.setRespuesta(req, res)
})

routes.put("/transforma/api/comentarios/updateRespuesta", async(req, res)=>{
    let controllerComentarios = new classController()
    await controllerComentarios.updateRespuesta(req, res)
})

routes.delete("/transforma/api/comentarios/deleteRespuesta", async(req, res)=>{
    let controllerComentarios = new classController()
    await controllerComentarios.deleteRespuesta(req, res)
})

module.exports = routes;