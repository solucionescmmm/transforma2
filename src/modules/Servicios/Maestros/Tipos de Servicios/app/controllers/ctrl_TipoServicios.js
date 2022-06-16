//Servicios
const setTipoServicios = require("../../domain/setTipoServicios.service");
const getTipoServicios = require("../../domain/getTipoServicios.service");
const updateTipoServicios = require("../../domain/updateTipoServicios.service");
const deleteTipoServicios = require("../../domain/deleteTipoServicios.service");

class ctrl_TipoServicios {
    async setTipoServicios(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setTipoServicios(data, strDataUser);
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

    async updateTipoServicios(req, res) {
        try {
            let data = req.body;

            let service = new updateTipoServicios(data);
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

    async deleteTipoServicios(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteTipoServicios(objParams);
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

    async getTipoServicios(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getTipoServicios(objParams, strDataUser);

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

module.exports = ctrl_TipoServicios;