//Servicios
const setProyectosEspeciales = require("../../domain/setProyectosEspeciales.service");
const getProyectosEspeciales = require("../../domain/getProyectosEspeciales.service");
const updateProyectosEspeciales = require("../../domain/updateProyectosEspeciales.service");
const deleteProyectosEspeciales = require("../../domain/deleteProyectosEspeciales.service");

class ctrl_ProyectosEspeciales {
    async setProyectosEspeciales(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setProyectosEspeciales(data, strDataUser);
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

    async updateProyectosEspeciales(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateProyectosEspeciales(data, strDataUser);
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

    async deleteProyectosEspeciales(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteProyectosEspeciales(objParams);
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

    async getProyectosEspeciales(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getProyectosEspeciales(objParams, strDataUser);

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

module.exports = ctrl_ProyectosEspeciales;
