//Librerias
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const privateKey = fs.readFileSync(path.basename("../../../../jwtRS256.key"), "utf-8");

const authorize = async (token) => {
    try {
        let result;

        jwt.verify(token, privateKey, { algorithms: ["RS256"] }, (error, decoded) => {
            if (error) {
                throw new Error("Token de autorización no valido");
            }

            result = {
                error: false,
                data: decoded,
            };
        });

        return result;
    } catch (error) {
        let result = {
            error: true,
            msg: error.message,
        };

        return result;
    }
};

module.exports = authorize;
