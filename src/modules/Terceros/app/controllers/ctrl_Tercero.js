//Servicios
const setTercero = require("../../domain/setTercero.service");
const getTercero = require("../../domain/getTercero.service");
const updateTercero = require("../../domain/updateTercero.service");
const deleteTercero = require("../../domain/deleteTercero.service");

class ctrl_Tercero {
    async setTercero(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setTercero(data, strDataUser);
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

    async setFinalizarTercero(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setFinalizarTercero(data, strDataUser);
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

    async updateTercero(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateTercero(data, strDataUser);
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

    async deleteTercero(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteTercero(objParams);
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

    async getTercero(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getTercero(objParams, strDataUser);

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

module.exports = ctrl_Tercero;
