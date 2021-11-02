const serviceAuthorize = require("../../domain/authorize");
const serviceLogin = require("../../domain/login.service");

class ctrlMain {
    async Login(req, res) {
        try {
            let token = req.headers.authorization;

            let query = await serviceLogin(token);

            res.status(200).json(query);
        } catch (error) {
            let result = {
                error: true,
                msg: error.message,
            };

            res.status(400).json(result);
        }
    }

    async Authorize(req, res) {
        try {
            let token = req.headers.authorization;

            let query = await serviceAuthorize(token);

            if (query.error) {
                res.status(401).json(query);
            } else {
                res.status(200).json(query);
            }
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
