//Servicios
const setAreas = require("../../domain/setAreas.service");
const getAreas = require("../../domain/getAreas.service");
const updateAreas = require("../../domain/updateAreas.service");
const deleteAreas = require("../../domain/deleteAreas.service");

class ctrl_Areas {
    async setAreas(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setAreas(data, strDataUser);
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

    async updateAreas(req, res) {
        try {
            let data = req.body;

            let service = new updateAreas(data);
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

    async deleteAreas(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteAreas(objParams);
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

    async getAreas(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getAreas(objParams, strDataUser);

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

module.exports = ctrl_Areas;
