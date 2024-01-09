//Servicios
const setDiagnosticoGeneral = require("../../domain/setDiagnosticoGeneral.service");
const getDiagnosticoGeneral = require("../../domain/getDiagnosticoGeneral.service");
const deleteDiagnosticoGeneral = require ("../../domain/deleteDiagnosticoGeneral.service")
const updateDiagnosticoGeneral = require ("../../domain/updateDiagnosticoGeneral.service")
const updateFinalizarDiagnosticoGeneral = require ("../../domain/updateFinalizarDiagnosticoGeneral.service")

class ctrl_DiagnosticoGeneral {
    async setDiagnosticoGeneral(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setDiagnosticoGeneral(data, strDataUser);
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

    async getDiagnosticoGeneral(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getDiagnosticoGeneral(objParams, strDataUser);

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

    async deleteDiagnosticoGeneral(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new deleteDiagnosticoGeneral(data, strDataUser);
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

    async updateDiagnosticoGeneral(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateDiagnosticoGeneral(data, strDataUser);
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

    async updateFinalizarDiagnosticoGeneral(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateFinalizarDiagnosticoGeneral(data, strDataUser);
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

module.exports = ctrl_DiagnosticoGeneral;
