//Servicios
const setRutas = require("../../domain/setRutas.service");
const getRutas = require("../../domain/getRutas.service");
const getEstadosRutas = require("../../domain/getEstadosRutas.service")
const updateRutas = require("../../domain/updateRutas.service");
const deleteRutas = require("../../domain/deleteRutas.service");

class ctrl_Rutas {
    async setRutas(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setRutas(data, strDataUser);
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

    async getRutas(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getRutas(objParams, strDataUser);

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

    async getEstadosRutas(req, res) {
        try {
            let objParams = req.query;

            let query = await getEstadosRutas(objParams);

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

    async updateRutas(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateRutas(data, strDataUser);
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

    async deleteRutas(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let service = new deleteRutas(objParams, strDataUser);
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

module.exports = ctrl_Rutas;
