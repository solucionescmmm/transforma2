//Servicios
const setAcompañamiento = require("../../domain/setAcompañamiento.service");
const setSesionAcompañamiento = require("../../domain/setSesionAcompañamiento.service")
const getAcompañamiento = require("../../domain/getAcompañamiento.service");
const getTipoAcompañamiento = require("../../domain/getTipoAcompañamiento.service")
const getTipoActividad = require("../../domain/getTipoActividad.service")
const updateAcompañamiento = require("../../domain/updateAcompañamiento.service");
const updateFinalizarSesionAcompañamiento = require("../../domain/updateFinalizarSesionAcompañamiento.service");
const updateSesionAcompañamiento = require("../../domain/updateSesionAcompañamiento.service");
const deleteAcompañamiento = require("../../domain/deleteAcompañamiento.service");

class ctrl_Acompañamiento {
    async setAcompañamiento(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setAcompañamiento(data, strDataUser);
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

    async setSesionAcompañamiento(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setSesionAcompañamiento(data, strDataUser);
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

    async getAcompañamiento(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getAcompañamiento(objParams, strDataUser);

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

    async getTipoAcompañamiento(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getTipoAcompañamiento(objParams, strDataUser);

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

    async getTipoActividad(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getTipoActividad(objParams, strDataUser);

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

    async updateAcompañamiento(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateAcompañamiento(data, strDataUser);
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

    async updateSesionAcompañamiento(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateSesionAcompañamiento(data, strDataUser);
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

    async updateFinalizarSesionAcompañamiento(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateFinalizarSesionAcompañamiento(data, strDataUser);
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

    async deleteAcompañamiento(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteAcompañamiento(objParams);
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

module.exports = ctrl_Acompañamiento;
