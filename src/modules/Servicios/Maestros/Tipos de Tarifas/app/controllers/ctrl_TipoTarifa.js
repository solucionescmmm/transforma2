//Servicios
const setTipoTarifa = require("../../domain/setTipoTarifa.service");
const getTipoTarifa = require("../../domain/getTipoTarifa.service");
const updateTipoTarifa = require("../../domain/updateTipoTarifa.service");
const deleteTipoTarifa = require("../../domain/deleteTipoTarifa.service");

class ctrl_TipoTarifa {
    async setTipoTarifa(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setTipoTarifa(data, strDataUser);
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

    async updateTipoTarifa(req, res) {
        try {
            let data = req.body;

            let service = new updateTipoTarifa(data);
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

    async deleteTipoTarifa(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteTipoTarifa(objParams);
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

    async getTipoTarifa(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getTipoTarifa(objParams, strDataUser);

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

module.exports = ctrl_TipoTarifa;