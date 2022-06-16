//librerias
const sql = require("mssql");

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");
class daoTipoServicios {
    async setTipoServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_TiposServicios VALUES
            (
                ${data.strNombre},
                ${data.strDescripcion},
                ${data.intIdEstado},
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_TiposServicios WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El tipo de tarifa, fue agregada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setTipoServicios de la clase daoTipoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getTipoServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT * FROM tbl_TiposServicios 
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
                    "Error en el metodo getTipoServicios de la clase daoTipoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateTipoServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                UPDATE tbl_TiposServicios

                SET strNombre               = COALESCE(${data.strNombre}, strNombre),
                    strDescripcion          = COALESCE(${data.strDescripcion}, strDescripcion),
                    intIdEstado             = COALESCE(${data.intIdEstado}, intIdEstado),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_TiposServicios WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El tipo de tarifa, fue actualizada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateTipoServicios de la clase daoTipoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteTipoServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_TiposServicios WHERE intId = ${data.intId}`;

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
                    "Error en el metodo deleteTipoServicios de la clase daoTipoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoTipoServicios;
