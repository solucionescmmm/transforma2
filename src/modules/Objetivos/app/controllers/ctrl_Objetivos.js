//Servicios
const setObjetivos = require("../../domain/setObjetivos.service");
const getObjetivos = require("../../domain/getObjetivos.service");
const updateObjetivos = require("../../domain/updateObjetivos.service");
const deleteObjetivos = require("../../domain/deleteObjetivos.service");

class ctrl_Objetivos {
    async setObjetivos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setObjetivos(data, strDataUser);
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

    async updateObjetivos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateObjetivos(data, strDataUser);
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

    async deleteObjetivos(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteObjetivos(objParams);
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

    async getObjetivos(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getObjetivos(objParams, strDataUser);

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

module.exports = ctrl_Objetivos;
