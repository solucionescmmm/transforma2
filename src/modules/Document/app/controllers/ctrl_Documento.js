//Servicios
const setDocumento = require("../../domain/setDocumento.service");
const getDocumento = require("../../domain/getDocumento.service");
const updateDocumento = require("../../domain/updateDocumento.service");
const deleteDocumento = require("../../domain/deleteDocumento.service");

class ctrl_Documento {
    async setDocumento(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setDocumento(data, strDataUser);
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

    async setFinalizarDocumento(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setFinalizarDocumento(data, strDataUser);
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

    async updateDocumento(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateDocumento(data, strDataUser);
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

    async deleteDocumento(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteDocumento(objParams);
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

    async getDocumento(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getDocumento(objParams, strDataUser);

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

module.exports = ctrl_Documento;
