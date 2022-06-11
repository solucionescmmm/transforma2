//librerias
const sql = require("mssql");

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");
class daoAreasServicios {
    async setAreasServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Area_Servicios VALUES
            (
                ${data.intIdServicio},
                ${data.intIdArea},
                ${data.intIdEstado},
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Area_Servicios WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El área, fue agregada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setAreasServicios de la clase daoAreasServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getAreasServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT * FROM tbl_Area_Servicios 
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
                    "Error en el metodo getAreasServicios de la clase daoAreasServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateAreasServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                UPDATE tbl_Area_Servicios

                SET intIdServicio           = COALESCE(${data.intIdServicio}, intIdServicio),
                    intIdArea               = COALESCE(${data.intIdArea}, intIdArea),
                    intIdEstado             = COALESCE(${data.intIdEstado}, intIdEstado),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_Area_Servicios WHERE intId = ${data.intId}`;

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
                    "Error en el metodo updateAreasServicios de la clase daoAreasServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteAreasServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_Area_Servicios WHERE intId = ${data.intId}`;

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
                    "Error en el metodo deleteAreasServicios de la clase daoAreasServicios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoAreasServicios;
