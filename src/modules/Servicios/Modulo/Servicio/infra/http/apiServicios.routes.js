//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Servicios");

//Routes
routes.post(
    "/transforma/api/servicios/modulo/setServicio",
    async (req, res) => {
        let controllerServicios = new classController();
        await controllerServicios.setSedeTipoTarifaServicio(req, res);
    }
);

routes.get(
    "/transforma/api/servicios/maestro/sedetipotarifaservicio/getSedeTipoTarifaServicio",
    async (req, res) => {
        let controllerServicios = new classController();
        await controllerServicios.getSedeTipoTarifaServicio(req, res);
    }
);

routes.put(
    "/transforma/api/servicios/maestro/sedetipotarifaservicio/updateSedeTipoTarifaServicio",
    async (req, res) => {
        let controllerServicios = new classController();
        await controllerServicios.updateSedeTipoTarifaServicio(req, res);
    }
);

routes.delete(
    "/transforma/api/servicios/maestro/sedetipotarifaservicio/deleteSedeTipoTarifaServicio",
    async (req, res) => {
        let controllerServicios = new classController();
        await controllerServicios.deleteSedeTipoTarifaServicio(req, res);
    }
);

module.exports = routes;
