//Servicios
const setComentario = require("../../domain/setComentario.service");
const updateComentario = require("../../domain/updateComentario.service");
const deleteComentario = require("../../domain/deleteComentario.service");
const getComentario = require("../../domain/getComentario.service");
const setRespuesta = require("../../domain/setRespuesta.service");
const updateRespuesta = require("../../domain/updateRespuesta.service");
const deleteRespuesta = require("../../domain/deleteRespuesta.service");

class ctrl_Comentarios {
    async setComentario(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setComentario(data, strDataUser);
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

    async updateComentario(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateComentario(data, strDataUser);
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

    async deleteComentario(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let service = new deleteComentario(objParams, strDataUser);
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

    async getComentario(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getComentario(objParams, strDataUser);

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

    async setRespuesta(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setRespuesta(data, strDataUser);
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

    async updateRespuesta(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateRespuesta(data, strDataUser);
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

    async deleteRespuesta(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let service = new deleteRespuesta(objParams, strDataUser);
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

module.exports = ctrl_Comentarios;
