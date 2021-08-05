const classSetEmpresario = require("../../domian/setEmpresario");

class ctrlEmpresarios {
    async postEmpresario(req, res) {
        try {
            let data = req.body;
            let dataUser = req;

            let service = new classSetEmpresario(data, dataUser);

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
module.exports = ctrlEmpresarios;