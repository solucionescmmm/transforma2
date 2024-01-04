//Servicios
const setDiagnosticoServicio = require("../../domain/setDiagnosticoServicio.service");
const updateDiagnosticoServicio = require("../../domain/updateDiagnsoticoServicio.service");
const updateFinalizarDiagnosticoServicio = require("../../domain/updateFinalizarDiagnosticoServicio.service");
const getDiagnosticoServicio = require("../../domain/getDiagnosticoServicio.service");
const getDiagnosticoServicioInforme = require("../../domain/getDiagnosticoServicioInforme.service");

class ctrl_DiagnosticoServicio {
    async setDiagnosticoServicio(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setDiagnosticoServicio(data, strDataUser);
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

    async updateDiagnosticoServicio(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateDiagnosticoServicio(data, strDataUser);
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

    async updateFinalizarDiagnosticoServicio(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateFinalizarDiagnosticoServicio(data, strDataUser);
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

    async getDiagnosticoServicio(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getDiagnosticoServicio(objParams, strDataUser);

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

    async getDiagnosticoServicioInforme(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getDiagnosticoServicioInforme(objParams, strDataUser);

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

module.exports = ctrl_DiagnosticoServicio;
