//Servicios
const setArea = require("../../domain/setAreas.service");
const getArea = require("../../domain/getAreas.service");
const updateArea = require("../../domain/updateAreas.service");
const deleteArea = require("../../domain/deleteAreas.service");

class ctrl_Areas {
    async setArea(req, res) {
        try {
            let data = req.body;

            let service = new setArea(data);
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

    async updateArea(req, res) {
        try {
            let data = req.body;

            let service = new updateArea(data);
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

    async deleteArea(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteArea(objParams);
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

    async getArea(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getArea(objParams, strDataUser);

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
