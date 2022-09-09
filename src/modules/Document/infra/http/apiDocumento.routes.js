//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Documento");

//Routes
routes.post("/transforma/api/Documento/setDocumento", async (req, res) => {
    let controllerDocumento = new classController();
    await controllerDocumento.setDocumento(req, res);
});

routes.put("/transforma/api/Documento/updateDocumento", async (req, res)=>{
    let controllerDocumento = new classController()
    await controllerDocumento.updateDocumento(req, res)
})

routes.delete("/transforma/api/Documento/deleteDocumento", async (req, res)=>{
    let controllerDocumento = new classController()
    await controllerDocumento.deleteDocumento(req, res)
})

routes.get("/transforma/api/Documento/getDocumento", async(req, res)=>{
    let controllerDocumento = new classController()
    await controllerDocumento.getDocumento(req, res)
})

module.exports = routes;