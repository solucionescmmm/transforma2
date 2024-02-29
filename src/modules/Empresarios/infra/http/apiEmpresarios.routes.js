//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Empresarios");

//Routes
routes.post("/transforma/api/Empresario/setEmpresarioPrincipal", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.setEmpresarioPrincipal(req, res);
});

routes.post("/transforma/api/Empresario/setEmpresarioSecundario", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.setEmpresarioSecundario(req, res);
});

routes.post("/transforma/api/Empresario/setCambioEmpresarioPrincipal", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.setCambioEmpresarioPrincipal(req, res);
});

routes.put("/transforma/api/Empresario/updateEmpresarioPrincipal", async(req, res)=>{
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.updateEmpresarioPrincipal(req, res);
})

routes.put("/transforma/api/Empresario/updateEmpresarioSecundario", async(req, res)=>{
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.updateEmpresarioSecundario(req, res);
})

routes.put("/transforma/api/Empresario/updateInactivarEmpresario", async(req, res)=>{
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.updateInactivarEmpresario(req, res);
})

routes.put("/transforma/api/Empresario/updateNoContactarEmpresario", async(req, res)=>{
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.updateNoContactarEmpresario(req, res);
})

routes.post("/transforma/api/Interesados/uploadFile", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.uploadFileEmpresario(req, res);
});

routes.delete("/transforma/api/Interesados/deleteFile", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.deleteFileEmpresario(req, res);
});

routes.get("/transforma/api/Empresario/getIdeaEmpresario", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.getIdeaEmpresario(req, res);
});

routes.get("/transforma/api/Empresario/getLastEmpresarios", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.getLastEmpresarios(req, res);
});

routes.get("/transforma/api/Empresario/getEmpresario", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.getEmpresario(req, res);
});

routes.get("/transforma/api/Empresario/getEmpresarioByIdea", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.getEmpresarioByIdea(req, res);
});

routes.get("/transforma/api/Empresario/getEstadoVinculacion", async (req, res) => {
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.getEstadoVinculacion(req, res);
});

routes.delete("/transforma/api/Interesados/delete",async(req, res)=>{
    let controllerEmpresarios = new classController();
    await controllerEmpresarios.deleteEmpresario(req, res)
})

module.exports = routes;
