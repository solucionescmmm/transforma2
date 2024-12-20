const setCargaMasiva = require("../../domain/setCargaMasiva.service");

class ctrlAdmin {
    async setCargaMasiva(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setCargaMasiva(data, strDataUser);

            let query = await service.main();

            if (query.error) {
                throw new Error(query.msg);
            }

            res.status(200).json(query);
        } catch (error) {
            let result = {
                error: true,
                data:error.data,
                msg: error.message,
            };

            res.status(400).json(result);
        }
    }
}

module.exports = ctrlAdmin