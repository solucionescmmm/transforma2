//servicios
const getPaises = require("../../domain/getPaises.service")
const getDepartamento = require("../../domain/getDepartamentos.service");
const getMunicipios = require("../../domain/getMunicipios.service")
const getLocalidades = require("../../domain/getLocalidades.service")

class ctrlLocalizaciones {
    async getPaises(req, res) {
        try {

            let query = await getPaises();
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

    async getDepartamento(req, res) {
        try {
            let data = req.query;

            let query = await getDepartamento(data);
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

    async getMunicipios(req, res) {
        try {
            let data = req.query;
            let query = await getMunicipios(data);
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

    async getLocalidades(req, res) {
        try {
            let data = req.query;
            let query = await getLocalidades(data);
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

module.exports = ctrlLocalizaciones;