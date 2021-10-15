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

module.exports = routes;