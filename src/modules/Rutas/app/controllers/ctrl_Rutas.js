//Servicios
const setRutas = require("../../domain/setRutas.service");
const getRutas = require("../../domain/getRutas.service");
const getEstadosRutas = require("../../domain/getEstadosRutas.service")
const getContadorRutas = require("../../domain/getContadorRutas.service")
const getRutasActivas = require("../../domain/getRutasActivas.service")
const getServicioFases = require("../../domain/getServiciosFase.service")
const getPaquetesFases = require("../../domain/getPaquetesFases.service")
const getMotivosCancelacion = require("../../domain/getMotivosCancelacion.service");
const updateRutas = require("../../domain/updateRutas.service");
const updateRutaEnviada = require("../../domain/updateRutaEnviada.service");
const updateRutaActivada = require("../../domain/updateRutaActivada.service");
const updateRutaCancelada = require("../../domain/updateRutaCancelada.service");
const checkPaqueteFase = require("../../domain/checkPaqueteFase.service");
const checkServicioFase = require("../../domain/checkServicioFase.service")
const deleteRutas = require("../../domain/deleteRutas.service");

class ctrl_Rutas {
    async setRutas(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setRutas(data, strDataUser);
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

    async getRutas(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getRutas(objParams, strDataUser);

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

    async getEstadosRutas(req, res) {
        try {
            let objParams = req.query;

            let query = await getEstadosRutas(objParams);

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

    async getContadorRutas(req, res) {
        try {
            let objParams = req.query;

            let query = await getContadorRutas(objParams);

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

    async getRutasActivas(req, res) {
        try {
            let objParams = req.query;

            let query = await getRutasActivas(objParams);

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

    async getServicioFases(req, res) {
        try {
            let objParams = req.query;

            let query = await getServicioFases(objParams);

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

    async getPaquetesFases(req, res) {
        try {
            let objParams = req.query;

            let query = await getPaquetesFases(objParams);

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

    async getMotivosCancelacion(req, res) {
        try {
            let { strDataUser } = req;

            let query = await getMotivosCancelacion(strDataUser);

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

    async updateRutas(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateRutas(data, strDataUser);
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

    async updateRutaEnviada(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateRutaEnviada(data, strDataUser);
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

    async updateRutaActivada(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateRutaActivada(data, strDataUser);
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

    async updateRutaCancelada(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateRutaCancelada(data, strDataUser);
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

    async checkPaqueteFase(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new checkPaqueteFase(data, strDataUser);
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

    async checkServicioFase(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new checkServicioFase(data, strDataUser);
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

    async deleteRutas(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let service = new deleteRutas(objParams, strDataUser);
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

module.exports = ctrl_Rutas;
