//Librerias
const validator = require("validator").default;
const sql = require("mssql");

//Conexion
const { conexion } = require("../../../../common/config/confSQL_connectionTransfroma");

class daoTercero {
    async setTercero(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Terceros VALUES
            (
                ${data.intIdEstado},
                ${data.strNombres},
                ${data.strApellidos},
                ${data.strTipoDocto},
                ${data.strNroDocto},
                ${data.dtFechaNacimiento},
                ${data.strNacionalidad},
                ${data.strGenero},
                ${data.strCorreoElectronico},
                ${data.strCelular},
                ${data.strEstrato},
                ${data.strDepartamento},
                ${data.strCiudad},
                ${data.strDireccionResidencia},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Terceros WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La persona Tercera, fue registrada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setTercero de la clase daoTercero",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateTercero(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_Terceros

            SET intIdEstado             = COALESCE(${data.intIdEstado}, intIdEstado),
                strNombres              = COALESCE(${data.strNombres}, strNombres),
                strApellidos            = COALESCE(${data.strApellidos}, strApellidos),
                strTipoDocto            = COALESCE(${data.strTipoDocto}, strTipoDocto),
                strNroDocto             = COALESCE(${data.strNroDocto}, strNroDocto),
                dtFechaNacimiento       = COALESCE(${data.dtFechaNacimiento}, dtFechaNacimiento),
                strNacionalidad         = COALESCE(${data.strNacionalidad}, strNacionalidad),
                strGenero               = COALESCE(${data.strGenero}, strGenero),
                strCorreoElectronico    = COALESCE(${data.strCorreoElectronico}, strCorreoElectronico),
                strCelular              = COALESCE(${data.strCelular}, strCelular),
                strEstrato              = COALESCE(${data.strEstrato}, strEstrato),
                strDepartamento         = COALESCE(${data.strDepartamento}, strDepartamento),
                strCiudad               = COALESCE(${data.strCiudad}, strCiudad),
                strBarrio               = COALESCE(${data.strBarrio}, strBarrio),
                strDireccionResidencia  = COALESCE(${data.strDireccionResidencia}, strDireccionResidencia),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_Terceros WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La persona Tercera, fue actualizada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateTercero de la clase daoTercero",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteTercero(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_Terceros WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: "El Tercero, fue eliminado con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteTercero de la clase daoTercero",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getTercero(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT 

            *
            
            FROM tbl_Terceros Tercero

            WHERE (Tercero.intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let arrNewData = response.recordsets[0];

            let result = {
                error: false,
                data: arrNewData ? (arrNewData.length > 0 ? arrNewData : null) : null,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getTercero de la clase daoTercero",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoTercero;
