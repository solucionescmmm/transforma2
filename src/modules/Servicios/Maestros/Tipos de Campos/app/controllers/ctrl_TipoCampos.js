//Servicios
const getTipoCampos = require("../../domain/getTipoCampos.service");

class ctrl_TipoCampos {
    async getTipoCampos(req, res) {
        try {
            let objParams = req.query;

            let query = await getTipoCampos(objParams);

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

module.exports = ctrl_TipoCampos;
