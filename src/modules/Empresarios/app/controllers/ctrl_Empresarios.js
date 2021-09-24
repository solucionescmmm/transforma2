//Classes
const classSetEmpresario = require("../../domian/setEmpresario.service");
const classUpdateEmpresario = require("../../domian/updateEmpresario.service")

//servicios
const getEmpresario = require("../../domian/getEmpresario.service");
const uploadFile = require("../functions/uploadFile");

class ctrlEmpresarios {
    async uploadFileEmpresario(req, res) {
        try {
            uploadFile(req, res, async (error) => {
                if (error) {
                    let result = {
                        error: true,
                        msg: error.message,
                    };

                    res.status(500).json(result);
                }

                let result = {
                    error: false,
                    data: {
                        fileName: req.file.filename,
                        mimeType: req.file.mimetype,
                        size: req.file.size,
                        extension: req.file.originalname.substring(
                            req.file.originalname.lastIndexOf("."),
                            req.file.originalname.length
                        ),
                        path: `/uploads/Empresarios/${req.file.filename}`,
                    },
                };

                res.status(200).json(result);
            });
        } catch (error) {
            let result = {
                error: true,
                msg: error.message,
            };

            res.status(400).json(result);
        }
    }

    async postEmpresario(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new classSetEmpresario(data, strDataUser);

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

    async updateEmpresario(req, res){
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new classUpdateEmpresario(data, strDataUser);

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
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getEmpresario(objParams, strDataUser);

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
    async deleteEmpresario(req, res){
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getEmpresario(objParams, strDataUser);

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
