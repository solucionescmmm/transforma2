//Librerias
require("dotenv-flow");
const { OAuth2Client } = require("google-auth-library");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

//Private Key JWT
const privateKey = fs.readFileSync(path.basename("../../../../jwtRS256.key"), "utf-8");

const login = async (token) => {
    let ticket;

    try {
      if(process.env.ENV === 'prod') {
        const CLIENT_ID = process.env.CLIENT_GOOGLE;
        const client = new OAuth2Client(CLIENT_ID);

        if (!token) {
            throw new Error("Se esperaba el token de autenticación de Google.");
        }

        ticket = await client
            .verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            })
            .catch((error) => {
                if (error.message.startsWith("Token used too late")) {
                    throw new Error(
                        "El token suministrado por Google ha expirado, por favor intenta nuevamente."
                    );
                }

                throw new Error(error.message);
            })
            .then((res) => {
                return res;
            });
      }

        const payload = ticket?.getPayload();

        let objUserData = {
            strNombre: payload?.given_name || 'Pruebas',
            strApellidos: payload?.family_name || '.',
            strEmail: payload?.email || 'lider.tecnologia@cmmmedellin.org',
            strUsuario: payload?.email.substring(0, payload.email.indexOf("@")) || "Líder Tecnología",
            strURLImagen: payload?.picture || "",
        };

        if (
            !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@cmmmedellin.org$/.test(
                objUserData.strEmail
            )
        ) {
            throw new Error(
                "El dominio de la cuenta no es válido, por favor intenta con usuario de la corporación."
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
