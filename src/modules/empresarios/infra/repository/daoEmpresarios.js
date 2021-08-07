//librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../common/config/confSQL_connectionTransfroma");

class daoEmpresarios {
    async setEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`  
        DECLARE @intId INTERGER;

        INSER INTO tbl_Empresario VALUES
        (
            ${data.strNombres}, 
            ${data.strApellidos},
            ${data.dtFechaNacimiento},
            ${data.intIdTipoDocto},
            ${data.strNroDocto},
            ${data.strLugarExpedicionDocto},
            ${data.dtFechaExpedicionDocto},
            ${data.intIdSexo},
            ${data.strCelular},
            ${data.strCorreoElectronico},
            ${data.intIdNivelEducativo},
            ${data.strTitulos},
            ${data.intIdCondicionDiscapacidad},
            ${data.intIdSede},
            ${data.intIdTipoEmpresario},
            ${data.dtFechaVinculacion},
            ${data.intIdestado},
            ${data.strUrlFoto},
            ${data.strUsuario},
            ${data.intIdEspacioJornada}
        );
        SET @intId = SCOPE_IDENTITY();

        SELECT * FROM tbl_Empresario WHERE intId = @intId`;
            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El empresario con nombre ${response.recordset[0].strNombres}, fue registrado con éxito, con el identificador #${response.recordset[0].intId}.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setEmpresa(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setEmpresa de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setEmprendimiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setEmprendimiento de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoEmpresarios;
