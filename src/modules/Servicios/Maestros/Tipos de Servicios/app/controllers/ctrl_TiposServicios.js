//Servicios
const setTiposServicios = require("../../domain/setTiposServicios.service");
const getTiposServicios = require("../../domain/getTiposServicios.service");
const updateTiposServicios = require("../../domain/updateTiposServicios.service");
const deleteTiposServicios = require("../../domain/deleteTiposServicios.service");

class ctrl_TiposServicios {
    async setTiposServicios(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setTiposServicios(data, strDataUser);
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

    async updateTiposServicios(req, res) {
        try {
            let data = req.body;

            let service = new updateTiposServicios(data);
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

    async deleteTiposServicios(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteTiposServicios(objParams);
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

    async getTiposServicios(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getTiposServicios(objParams, strDataUser);

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

module.exports = ctrl_TiposServicios;