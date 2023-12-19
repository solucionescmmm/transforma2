//Servicios
const setHistorico = require("../../domain/setHistorico.service");
const getHistorico = require("../../domain/getHistorico.service");
const getHistoricoTabla = require("../../domain/getHistoricoTabla.service");


class ctrlHistoricos {
    async setHistorico(req, res) {
        try {
            let data = req.body;

            let service = new setHistorico(data);

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

    async getHistorico(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getHistorico(objParams, strDataUser);

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

    async getHistoricoTabla(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getHistoricoTabla(objParams, strDataUser);

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
module.exports = ctrlHistoricos;