//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_SedeTipoTarifaServicio");

//Routes
routes.post(
    "/transforma/api/servicios/maestro/sedetipotarifaservicio/setSedeTipoTarifaServicio",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.setSedeTipoTarifaServicio(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/maestro/sedetipotarifaservicio/getSedeTipoTarifaServicio",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.getSedeTipoTarifaServicio(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/maestro/sedetipotarifaservicio/updateSedeTipoTarifaServicio",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.updateSedeTipoTarifaServicio(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/maestro/sedetipotarifaservicio/deleteSedeTipoTarifaServicio",
    async (req, res) => {
        let controllerComentarios = new classController();
        await controllerComentarios.deleteSedeTipoTarifaServicio(req, res);
    }
);

module.exports = routes;