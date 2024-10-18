//Classes
const setEmpresarioPrincipal = require("../../domian/setEmpresarioPrincipal.service");
const setEmpresarioSecundario = require("../../domian/setEmpresarioSecundario.service")
const setCambioEmpresarioPrincipal = require("../../domian/setCambioEmpresarioPrincipal.service")
const updateEmpresarioPrincipal = require("../../domian/updateEmpresarioPrincipal.service")
const updateEmpresarioSecundario = require("../../domian/updateEmpresarioSecundario.service")
const updateInactivarEmpresario = require("../../domian/updateInactivarEmpresario.service")
const updateNoContactarEmpresario = require("../../domian/updateNoContactarEmpresario.service")
const classDaleteEmpresario = require("../../domian/deleteEmpresario.service")

//servicios
const getIdeaEmpresario = require("../../domian/getIdeaEmpresario.service");
const getLastEmpresarios = require("../../domian/getLastEmpresarios.service");
const getEmpresarioTabla = require("../../domian/getEmpresarioTabla.service");
const getEmpresario = require("../../domian/getEmpresario.service");
const getEmpresarioByIdea = require("../../domian/getEmpresarioByIdea.service")
const getEstadoVinculacion = require ("../../domian/getEstadoVinculacion.service")
const uploadFile = require("../functions/uploadFile");
const deleteFile = require("../functions/deleteFile");
const getEmpresarioEvento = require("../../domian/getEmpresarioEvento.service");

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
                    return
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

    async deleteFileEmpresario(req, res) {
        try {
            let objParams = req.query;

            let query = await deleteFile(objParams)

            res.status(200).json(query);
        } catch (error) {
            let result = {
                error: true,
                msg: error.message,
            };

            res.status(400).json(result);
        }
    }

    async setEmpresarioPrincipal(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setEmpresarioPrincipal(data, strDataUser);

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

    async setEmpresarioSecundario(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setEmpresarioSecundario(data, strDataUser);

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

    async setCambioEmpresarioPrincipal(req, res) {
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new setCambioEmpresarioPrincipal(data, strDataUser);

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

    async updateEmpresarioPrincipal(req, res){
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateEmpresarioPrincipal(data, strDataUser);

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

    async updateEmpresarioSecundario(req, res){
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateEmpresarioSecundario(data, strDataUser);

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

    async updateInactivarEmpresario(req, res){
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateInactivarEmpresario(data, strDataUser);

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

    async updateNoContactarEmpresario(req, res){
        try {
            let data = req.body;
            let { strDataUser } = req;

            let service = new updateNoContactarEmpresario(data, strDataUser);

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

    async getIdeaEmpresario(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getIdeaEmpresario(objParams, strDataUser);

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

    async getLastEmpresarios(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getLastEmpresarios(objParams, strDataUser);

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

    async getEmpresarioTabla(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getEmpresarioTabla(objParams, strDataUser);

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

    async getEmpresarioByIdea(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getEmpresarioByIdea(objParams, strDataUser);

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

    async getEstadoVinculacion(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getEstadoVinculacion(objParams, strDataUser);

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

    async getEmpresarioEvento(req, res) {
        try {
            let objParams = req.query;
            let { strDataUser } = req;

            let query = await getEmpresarioEvento(objParams, strDataUser);

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

            let service = new classDaleteEmpresario(objParams);

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
