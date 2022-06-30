//Servicios
const setServicio = require("../../domain/setServicios.service");
const updateServicio = require("../../domain/updateServicio.service");
const getServicio = require("../../domain/getServicios.service");
const getServiciosActivos = require("../../domain/getServiciosActivos.service")
const deleteServicio = require("../../domain/deleteServicios.service")

class ctrl_SedeTipoTarifaServicio {
    async setServicio(req, res) {
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

    async getServicio(req, res) {
        try {
            let data = req.query;
            let { strDataUser } = req;

            let query = await getServicio(data, strDataUser);

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

    async getServiciosActivos(req, res) {
        try {
            let data = req.query;
            let { strDataUser } = req;

            let query = await getServiciosActivos(data, strDataUser);

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

    async updateServicio(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateServicio(data, strDataUser);
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
    async deleteServicio(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteServicio(objParams);
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
