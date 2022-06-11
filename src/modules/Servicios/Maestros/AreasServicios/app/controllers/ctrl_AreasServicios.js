//Servicios
const setAreasServicios = require("../../domain/setAreasServicios.service");
const getAreasServicios = require("../../domain/getAreasServicios.service");
const updateAreasServicios = require("../../domain/updateAreasServicios.service");
const deleteAreasServicios = require("../../domain/deleteAreasServicios.service");

class ctrl_AreasServicios {
    async setAreasServicios(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setAreasServicios(data, strDataUser);
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

    async updateAreasServicios(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateAreasServicios(data, strDataUser);
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

    async deleteAreasServicios(req, res) {
        try {
            let objParams = req.query;

            let service = new deleteAreasServicios(objParams);
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

    async getAreasServicios(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getAreasServicios(objParams, strDataUser);

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

module.exports = ctrl_AreasServicios;
