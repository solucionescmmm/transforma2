//Paquetes
const setPaquete = require("../../domain/setPaquetes.service");
const updatePaquete = require("../../domain/updatePaquetes.service");
const getPaquete = require("../../domain/getPaquetes.service");
const getPaquetesActivos = require("../../domain/getPaquetesActivos.service")
const deletePaquete = require("../../domain/deletePaquetes.service")

class ctrl_SedeTipoTarifaPaquete {
    async setPaquete(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setPaquete(data, strDataUser);
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

    async getPaquete(req, res) {
        try {
            let data = req.query;
            let { strDataUser } = req;

            let query = await getPaquete(data, strDataUser);

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

    async getPaquetesActivos(req, res) {
        try {
            let data = req.query;
            let { strDataUser } = req;

            let query = await getPaquetesActivos(data, strDataUser);

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

    async updatePaquete(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updatePaquete(data, strDataUser);
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
    async deletePaquete(req, res) {
        try {
            let objParams = req.query;

            let service = new deletePaquete(objParams);
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

module.exports = ctrl_SedeTipoTarifaPaquete;
