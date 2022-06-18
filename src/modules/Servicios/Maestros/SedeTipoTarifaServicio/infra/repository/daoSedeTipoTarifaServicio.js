//librerias
const sql = require("mssql");

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");
class daoSedeTipoTarifaServicio {
    async setSedeTipoTarifaServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Sede_TipoTarifa_Servicio VALUES
            (
                ${data.intIdSede},
                ${data.intIdTipoTarifa},
                ${data.intIdServicio},
                ${data.Valor},
                ${data.intIdEstado},
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Sede_TipoTarifa_Servicio WHERE intId = @intId`;

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
                    "Error en el metodo setSedeTipoTarifaServicio de la clase daoSedeTipoTarifaServicio",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getSedeTipoTarifaServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT * FROM tbl_Sede_TipoTarifa_Servicio 
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
                    "Error en el metodo getSedeTipoTarifaServicio de la clase daoSedeTipoTarifaServicio",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateSedeTipoTarifaServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                UPDATE tbl_Sede_TipoTarifa_Servicio

                SET intIdSede               = COALESCE(${data.intIdSede}, intIdSede),
                    intIdTipoTarifa         = COALESCE(${data.intIdTipoTarifa}, intIdTipoTarifa),
                    intIdServicio           = COALESCE(${data.intIdServicio}, intIdServicio),
                    Valor                   = COALESCE(${data.Valor}, Valor),
                    intIdEstado             = COALESCE(${data.intIdEstado}, intIdEstado),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_Sede_TipoTarifa_Servicio WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La tarifa de la sede, fue actualizada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateSedeTipoTarifaServicio de la clase daoSedeTipoTarifaServicio",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteSedeTipoTarifaServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_Sede_TipoTarifa_Servicio WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: `Se eliminó exitosamente la tarifa de la sede.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteSedeTipoTarifaServicio de la clase daoSedeTipoTarifaServicio",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoSedeTipoTarifaServicio;
