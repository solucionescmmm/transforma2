//Servicios
const setServicio = require("../../domain/setServicios.service");

class ctrl_SedeTipoTarifaServicio {
    async setSedeTipoTarifaServicio(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setServicio(data, strDataUser);
            let query = await service.main();

            if (query.error) {
                throw new Error(query.msg);
            }

            res.status(200).json(query);
        } catch (error) {
            let result = {
                error: true,
                msg: error.message,
            };

            res.status(400).json(result);
        }
    }
}

module.exports = ctrl_SedeTipoTarifaServicio;