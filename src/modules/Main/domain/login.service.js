//Librerias
require("dotenv-flow");
const { OAuth2Client } = require("google-auth-library");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const validator = require("validator").default;

//Private Key JWT
const privateKey = fs.readFileSync(
    path.basename("../../../../jwtRS256.key"),
    "utf-8"
);

//Services
const serviceGetRolesUsuario = require("../../Usuarios/domain/getRolesUsuario.service");

const login = async (payload) => {
    try {
        let objUserData;

        if (process.env.ENV === "prod" || process.env.ENV === "dev" || process.env.ENV === "test") {
            const { account } = payload;

            objUserData = {
                strNombre: account.name,
                strEmail: account.username,
                strUsuario: account.username.substring(
                    0,
                    account.username.indexOf("@")
                ),
                strURLImagen: "",
            };
        } else {
            objUserData = {
                strNombre: "Pruebas",
                strApellidos: "Transforma",
                strEmail: "lider.tecnologia@cmmmedellin.org",
                strUsuario: "Líder Tecnología",
                strURLImagen: "",
            };
        }

        const queryGetRolesUsuario = await serviceGetRolesUsuario({
            strApp: "Transforma",
            strEmail: objUserData.strEmail,
        });

        if (queryGetRolesUsuario.error) {
            throw new Error(queryGetRolesUsuario.msg);
        }

        objUserData = {
            ...objUserData,
            strRol: queryGetRolesUsuario.data[0]?.strNombre,
        };

        if (
            !validator.isEmail(objUserData.strEmail, {
                domain_specific_validation: "demismanos.org",
            })
        ) {
            throw new Error(
                "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino demismanos.org."
            );
        }

        let JWT = jwt.sign(
            {
                ...objUserData,
            },
            { key: privateKey, passphrase: process.env.TOKEN_SEED },
            { expiresIn: process.env.TOKEN_EXPIRATION, algorithm: "RS256" }
        );

        let result = {
            error: false,
            data: JWT,
        };

        return result;
    } catch (error) {
        let result = {
            error: true,
            msg: error.message,
        };

        return result;
    }
};

module.exports = login;
