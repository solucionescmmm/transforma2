//Servicios
const setAtributos = require("../../domain/setAtributos.service");
const getAtributos = require("../../domain/getAtributos.service");
const updateAtributos = require("../../domain/updateAtributos.service");
const deleteAtributos = require("../../domain/deleteAtributos.service");

class ctrl_Atributos {
    async setAtributos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setAtributos(data, strDataUser);
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

    async updateAtributos(req, res) {
        try {
            let data = req.body;

            let service = new updateAtributos(data);
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

    async deleteAtributos(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteAtributos(objParams);
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

    async getAtributos(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getAtributos(objParams, strDataUser);

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

module.exports = ctrl_Atributos;