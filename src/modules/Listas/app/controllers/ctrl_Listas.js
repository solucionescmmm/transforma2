//class

//servicios
const getListas = require("../../domain/getListas.service");

class ctrlListas {
    async getListas(req, res) {
        try {
            let data = req.query;
            let query = await getListas(data);
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

module.exports = ctrlListas;
