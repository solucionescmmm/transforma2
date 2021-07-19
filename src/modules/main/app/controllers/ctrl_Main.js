const serviceGetDataUser = require("../../domain/getDataUser.service")

class ctrlMain {
    async getDataUser(req, res) {

        try {
            let token = req.headers.token
            let queryDataUser = await serviceGetDataUser(token)

            res.status(200).json(queryDataUser)
        } catch (error) {
            let result = {
                error: true,
                msg: error.message,
            };

            res.status(400).json(result);
        }
    }
}

module.exports = ctrlMain;