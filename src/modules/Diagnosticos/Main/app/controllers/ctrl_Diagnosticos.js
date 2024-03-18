//Servicios
const setDiagnosticos = require("../../domain/setDiagnosticos.service");
const getDiagnosticos = require("../../domain/getDiagnosticos.service");
const getDiagnosticosHijos = require("../../domain/getDiagnosticosHijos.service");
const getTipoDiagnosticos = require("../../domain/getTipoDiagnosticos.service")
const getEstadoDiagnosticos = require("../../domain/getEstadoDiagnosticos.service")
const getIdEstadoDiagnosticos = require("../../domain/getIdEstadoDiagnosticos.service")
const updateDiagnosticos = require("../../domain/updateDiagnosticos.service");
const updateFinalizarDiagnosticos = require("../../domain/updateFinalizarDiagnosticos.service");
const cancelDiagnosticos = require("../../domain/cancelDiagnostico.service")
const deleteDiagnosticos = require("../../domain/deleteDiagnosticos.service");

class ctrl_Diagnosticos {
    async setDiagnosticos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setDiagnosticos(data, strDataUser);
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

    async getDiagnosticos(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getDiagnosticos(objParams, strDataUser);

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

    async getDiagnosticosHijos(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getDiagnosticosHijos(objParams, strDataUser);

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

    async getTipoDiagnosticos(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getTipoDiagnosticos(objParams, strDataUser);

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

    async getEstadoDiagnosticos(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getEstadoDiagnosticos(objParams, strDataUser);

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

    async getIdEstadoDiagnosticos(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getIdEstadoDiagnosticos(objParams, strDataUser);

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

    async updateDiagnosticos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateDiagnosticos(data, strDataUser);
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

    async updateFinalizarDiagnosticos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateFinalizarDiagnosticos(data, strDataUser);
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

    async cancelDiagnosticos(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new cancelDiagnosticos(data, strDataUser);
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

    async deleteDiagnosticos(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteDiagnosticos(objParams);
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

module.exports = ctrl_Diagnosticos;
