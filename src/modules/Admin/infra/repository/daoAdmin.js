//librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../common/config/confSQL_connectionTransfroma");

class daoAdmin {
    async setCargaMasiva(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Empresario VALUES
            (
                ${data.strNombres},
                ${data.strApellidos},
                ${data.strTipoDocto},
                ${data.strNroDocto},
                ${data.strLugarExpedicionDocto},
                ${data.dtFechaExpedicionDocto},
                ${data.dtFechaNacimiento},
                ${data.strNacionalidad},
                ${data.strGenero},
                ${data.strCelular1},
                ${data.strCelular2},
                ${data.strCorreoElectronico1},
                ${data.strCorreoElectronico2},
                ${data.strNivelEducativo},
                ${data.strTitulos},
                ${data.strCondicionDiscapacidad},
                ${data.intIdSede},
                ${data.btPerfilSensible},
                ${data.strEstrato},
                ${data.arrPais},
                ${data.arrDepartamento},
                ${data.arrCiudad},
                ${data.strBarrio},
                ${data.strDireccionResidencia},
                ${data.strURLFileFoto},
                ${data.intIdEstado},
                0,
                GETDATE(),
                GETDATE(),
                ${data.strUsuario}
            )
            
            SET @intId = SCOPE_IDENTITY();

            SELECT * FROM tbl_Empresario WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La persona ${response.recordset[0].strNombres} ${response.recordset[0].strApellidos}, fue registrado con éxito.`,
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

    async getNroDocumentoEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            SELECT strNroDocto FROM tbl_Empresario where strNroDocto = ${data.strNroDocto}`;

            let result = {
                error: false,
                data: response.recordset[0],
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getNroDocumentoEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }
}

module.exports = daoAdmin