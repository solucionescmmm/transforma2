//Servicios
const setSedeTipoTarifaServicio = require("../../domain/setSedeTipoTarifaServicio.service");
const getSedeTipoTarifaServicio = require("../../domain/getSedeTipoTarifaServicio.service");
const updateSedeTipoTarifaServicio = require("../../domain/updateSedeTipoTarifaServicio.service");
const deleteSedeTipoTarifaServicio = require("../../domain/deleteSedeTipoTarifaServicio.service");

class ctrl_SedeTipoTarifaServicio {
    async setSedeTipoTarifaServicio(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setSedeTipoTarifaServicio(data, strDataUser);
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

    async updateSedeTipoTarifaServicio(req, res) {
        try {
            let data = req.body;

            let service = new updateSedeTipoTarifaServicio(data);
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

    async deleteSedeTipoTarifaServicio(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteSedeTipoTarifaServicio(objParams);
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

    async getSedeTipoTarifaServicio(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getSedeTipoTarifaServicio(objParams, strDataUser);

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