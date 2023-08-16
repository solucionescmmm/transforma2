//Servicios
const setEventos = require("../../domain/setEventos.service");
const setSesionesEventos = require("../../domain/setSesionesEventos.service");
const setAsistentesEventos = require("../../domain/setAsistentesEventos.service");
const setAsistentesSesionesEventos = require("../../domain/setAsistentesSesionesEventos.service")
const updateEventos = require("../../domain/updateEventos.service");
const updateSesionesEventos = require("../../domain/updateSesionesEventos.service");
const getEventos = require("../../domain/getEventos.service");
const getSesionesEventos = require("../../domain/getSesionesEventos.service");
const getAsistentesEventos = require("../../domain/getAsistentesEventos.service");
const getTiposEventos = require("../../domain/getTiposEventos.service");


class ctrlEventos {
    async setEventos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setEventos(data,strDataUser);

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

    async setSesionesEventos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setSesionesEventos(data,strDataUser);

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

    async setAsistentesEventos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setAsistentesEventos(data,strDataUser);

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

    async setAsistentesSesionesEventos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setAsistentesSesionesEventos(data,strDataUser);

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

    async updateEventos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateEventos(data,strDataUser);

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

    async updateSesionesEventos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateSesionesEventos(data,strDataUser);

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

    async getSesionesEventos(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getSesionesEventos(objParams, strDataUser);

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

    async getAsistentesEventos(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getAsistentesEventos(objParams, strDataUser);

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
}
module.exports = ctrlEventos;