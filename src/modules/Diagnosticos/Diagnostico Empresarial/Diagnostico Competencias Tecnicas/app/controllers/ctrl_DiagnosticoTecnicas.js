//Servicios
const setDiagnosticoTecnica = require("../../domain/setDiagnosticoTecnicas.service");
const getDiagnosticoTecnica = require("../../domain/getDiagnosticoTecnicas.service");
const getDiagnosticoTecnicasInforme = require("../../domain/getDiagnosticoTecnicasInforme.service")
const updateDiagnosticoTecnica = require ("../../domain/updateDiagnosticoTecnicas.service")
const deleteDiagnosticoTecnica = require ("../../domain/deleteDiagnosticoTecnicas.service")
const updateFinalizarDiagnosticoTecnicas = require ("../../domain//updateFinalizarDiagnosticoTecnicas.service")

class ctrl_DiagnosticoTecnica {
    async setDiagnosticoTecnica(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setDiagnosticoTecnica(data, strDataUser);
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

    async getDiagnosticoTecnica(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getDiagnosticoTecnica(objParams, strDataUser);

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

    async getDiagnosticoTecnicasInforme(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getDiagnosticoTecnicasInforme(objParams, strDataUser);

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

    async deleteDiagnosticoTecnica(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new deleteDiagnosticoTecnica(data, strDataUser);
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

    async updateDiagnosticoTecnica(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateDiagnosticoTecnica(data, strDataUser);
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

    async updateFinalizarDiagnosticoTecnicas(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateFinalizarDiagnosticoTecnicas(data, strDataUser);
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

module.exports = ctrl_DiagnosticoTecnica;