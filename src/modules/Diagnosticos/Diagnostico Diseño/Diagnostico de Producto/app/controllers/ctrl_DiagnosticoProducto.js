//Servicios
const setDiagnosticoProducto = require("../../domain/setDiagnosticoProducto.service");
const updateDiagnosticoProducto = require("../../domain/updateDiagnosticoProducto.service");
const updateFinalizarDiagnosticoProducto = require("../../domain/updateFinalizarDiagnosticoProducto.service");
const getDiagnosticoProducto = require("../../domain/getDiagnosticoProducto.service");

class ctrl_DiagnosticoProducto {
    async setDiagnosticoProducto(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setDiagnosticoProducto(data, strDataUser);
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

    async updateDiagnosticoProducto(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateDiagnosticoProducto(data, strDataUser);
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

    async updateFinalizarDiagnosticoProducto(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateFinalizarDiagnosticoProducto(data, strDataUser);
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

    async getDiagnosticoProducto(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getDiagnosticoProducto(objParams, strDataUser);

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

module.exports = ctrl_DiagnosticoProducto;
