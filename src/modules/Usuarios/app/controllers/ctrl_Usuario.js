//class

//servicios
const getUsuarios = require("../../domain/getUsuarios.service");

class ctrlUsuarios {
    async getUsuarios(req, res) {
        try {
            let data = req.query;
            let query = await getUsuarios(data);
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

module.exports = ctrlUsuarios;
