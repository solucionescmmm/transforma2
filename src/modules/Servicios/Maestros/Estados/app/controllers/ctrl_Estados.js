//Servicios
const getEstado = require("../../domain/getEstados.service");

class ctrl_Estados {
    async getEstado(req, res) {
        try {
            let objParams = req.query;

            let query = await getEstado(objParams);

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

    async setRespuesta(req, res) {
        try {
            let data = req.body;

            let service = new setRespuesta(data);
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

module.exports = ctrl_Estados;
