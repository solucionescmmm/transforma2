//librerias
const sql = require("mssql");

//Conexion
const {
    conexion,
} = require("../../../../common/config/confSQL_connectionSecurityTransforma");
class daoSedes {
    async setSedes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Sedes VALUES
            (
                ${data.strNombre},
                ${data.intIdEstado},
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Sedes WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La sede, fue agregada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setSedes de la clase daoSedes",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getSedes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT * FROM tbl_Sedes 
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
                    "Error en el metodo getSedes de la clase daoSedes",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateSedes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                UPDATE tbl_Sedes

                SET strNombre               = COALESCE(${data.strNombre}, strNombre),
                    intIdEstado             = COALESCE(${data.intIdEstado}, intIdEstado),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_Sedes WHERE intId = ${data.intId}`;

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
                    "Error en el metodo updateSedes de la clase daoSedes",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteSedes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_Sedes WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: `Se eliminó exitosamente la sede.`,
              };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteSedes de la clase daoSedes",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoSedes;
