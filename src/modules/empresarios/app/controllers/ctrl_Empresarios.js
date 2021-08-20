//Classes
const classSetEmpresario = require("../../domian/setEmpresario.service");

//servicios
const getEmpresario = require("../../domian/getEmpresario.service");

class ctrlEmpresarios {
    async postEmpresario(req, res) {
        try {
            let data = req.body;
            
            let service = new classSetEmpresario(data);

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
    async getEmpresario(req, res) {
        try {
            let data = req.query;
            let query = await getEmpresario(data);
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
