//librerias
const sql = require("mssql");

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");
class daoAtributos {
    async setAtributos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Atributos VALUES
            (
                ${data.strNombre},
                ${data.intIdTipoCampo},
                ${data.strDescripcion},
                ${data.intIdEstado},
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Atributos WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El atributo, fue agregada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setAtributos de la clase daoAtributos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getAtributos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT * FROM tbl_Atributos 
                WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let result = {
                error: false,
                data: response.recordsets[0],
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getAtributos de la clase daoAtributos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateAtributos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                UPDATE tbl_Atributos

                SET strNombre               = COALESCE(${data.strNombre}, strNombre),
                    intIdTipoCampo          = COALESCE(${data.intIdTipoCampo}, intIdTipoCampo),
                    strDescripcion             = COALESCE(${data.strDescripcion}, strDescripcion),
                    intIdEstado             = COALESCE(${data.intIdEstado}, intIdEstado),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_Atributos WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La sede, fue actualizada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateAtributos de la clase daoAtributos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteAtributos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_Atributos WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: `Se eliminó exitosamente el atributo.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteAtributos de la clase daoAtributos",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoAtributos;
