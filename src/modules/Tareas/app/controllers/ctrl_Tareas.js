//Servicios
const setTarea = require("../../domain/setTarea.service");
const setFinalizarTarea = require("../../domain/setFinalizarTarea.service")
const getTarea = require("../../domain/getTarea.service");
const updateTarea = require("../../domain/updateTarea.service");
const deleteTarea = require("../../domain/deleteTarea.service");

class ctrl_Tarea {
    async setTarea(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setTarea(data, strDataUser);
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

    async setFinalizarTarea(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setFinalizarTarea(data, strDataUser);
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

    async updateTarea(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateTarea(data, strDataUser);
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

    async deleteTarea(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteTarea(objParams);
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

    async getTarea(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getTarea(objParams, strDataUser);

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

module.exports = ctrl_Tarea;
