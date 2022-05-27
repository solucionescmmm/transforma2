//Servicios
const setSedes = require("../../domain/setSedes.service");
const getSedes = require("../../domain/getSedes.service");
const updateSedes = require("../../domain/updateSedes.service");
const deleteSedes = require("../../domain/deleteSedes.service");

class ctrl_Sedes {
    async setSedes(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setSedes(data, strDataUser);
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

    async updateSedes(req, res) {
        try {
            let data = req.body;

            let service = new updateSedes(data);
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

    async deleteSedes(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteSedes(objParams);
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

    async getSedes(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getSedes(objParams, strDataUser);

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

module.exports = ctrl_Sedes;