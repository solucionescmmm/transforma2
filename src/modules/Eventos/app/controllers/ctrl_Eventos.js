//Servicios
const setEventos = require("../../domain/setEventos.service");
//const getEventos = require("../../domain/getEventos.service");
const getTiposEventos = require("../../domain/getTiposEventos.service");
//const updateEventos = require("../../domain/updateEventos.service");
//const deleteEventos = require("../../domain/deleteEventos.service");

class ctrl_Eventos {
    async setEventos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setEventos(data, strDataUser);
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

    async getEventos(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getEventos(objParams, strDataUser);

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

    async getTiposEventos(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getTiposEventos(objParams, strDataUser);

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

    async updateEventos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateEventos(data, strDataUser);
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

    async deleteEventos(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let service = new deleteEventos(objParams, strDataUser);
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

module.exports = ctrl_Eventos;
