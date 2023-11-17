//Librerias
require("dotenv-flow");
const { OAuth2Client } = require("google-auth-library");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const validator = require("validator").default;

//Private Key JWT
const privateKey = fs.readFileSync(path.basename("../../../../jwtRS256.key"), "utf-8");

//Services
const serviceGetRolesUsuario = require("../../Usuarios/domain/getRolesUsuario.service")

const login = async (token) => {

    try {
      if(process.env.ENV === 'prod') {

        }

        const payload = null
        
        let objUserData = {
            strNombre: payload?.given_name || 'Pruebas',
            strApellidos: payload?.family_name || '.',
            strEmail: payload?.email || 'lider.tecnologia@cmmmedellin.org',
            strUsuario: payload?.email.substring(0, payload.email.indexOf("@")) || "Líder Tecnología",
            strURLImagen: payload?.picture || "",
        };

        const queryGetRolesUsuario = await serviceGetRolesUsuario({
            strApp:"Transforma",
            strEmail:"auxiliarcontable@demismanos.org"
        })

        if (queryGetRolesUsuario.error) {
            throw new Error(queryGetRolesUsuario.msg)
        }

        objUserData={
            ...objUserData,
            strRol: queryGetRolesUsuario.data[0]?.strNombre
        }

        if (
            !validator.isEmail(objUserData.strEmail, {
                domain_specific_validation: "cmmmedellin.org",
            })
        ) {
            throw new Error(
                "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
            );
        }

        console.log(objUserData)

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
