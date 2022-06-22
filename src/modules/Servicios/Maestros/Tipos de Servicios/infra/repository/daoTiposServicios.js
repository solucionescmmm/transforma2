//librerias
const sql = require("mssql");

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");
class daoTiposServicios {
    async setTiposServicios(data) {
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
                msg: `El tipo de servicio, fue agregado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setTiposServicios de la clase daoTiposServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setAtributosTiposServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .input("p_intIdAtributo", sql.VarChar, data.intIdAtributo)
                .input("p_intIdTipoServicio", sql.VarChar, data.intIdTipoServicio)
                .input("p_intIdEstado", sql.VarChar, data.intIdEstado)
                .input("p_strUsuario", sql.VarChar, data.strUsuarioCreacion)
                .output("P_bitError", sql.Bit)
                .output("P_strMsg", sql.VarChar)
                .execute("sp_setAtributosTipoServicio");
            let result = {
                error: false,
                data: response.recordsets[0] ? response.recordsets[0][0] : null,
            };
            sql.close(conexion);
            return result;
        } catch (error) {
            let result = {
                error: true,
                msg: error.message ?
                    error.message : "Error en el metodo setAtributosTiposServicios de la clase daoTiposServicios",
            };
            sql.close(conexion);
            return result;
        }
    }

    async getTiposServicios(data) {
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
                msg: error.message ?
                    error.message : "Error en el metodo getTiposServicios de la clase daoTiposServicios",
            };
            sql.close(conexion);
            return result;
        }
    }

    async getAtributosTiposServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .input("p_intIdTipoServicio", sql.VarChar, data.intIdTipoServicio)
                .execute("sp_getAtributosTipoServicio");
            let result = {
                error: false,
                data: response.recordsets[0],
            };
            sql.close(conexion);
            return result;
        } catch (error) {
            let result = {
                error: true,
                msg: error.message ?
                    error.message : "Error en el metodo getTiposServicios de la clase daoTiposServicios",
            };
            sql.close(conexion);
            return result;
        }
    }

    async updateTiposServicios(data) {
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
                    "Error en el metodo updateTiposServicios de la clase daoTiposServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateAtributosTiposServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .input("p_intIdAtributoTipoServicio", sql.VarChar, data.intIdAtributoTipoServicio)
                .input("p_intIdAtributo", sql.VarChar, data.intIdAtributo)
                .input("p_intIdTipoServicio", sql.VarChar, data.intIdTipoServicio)
                .input("p_intIdEstado", sql.VarChar, data.intIdEstado)
                .input("p_strUsuario", sql.VarChar, data.strUsuarioCreacion)
                .output("P_bitError", sql.Bit)
                .output("P_strMsg", sql.VarChar)
                .execute("sp_UpdateAtributosTipoServicio");
            let result = {
                error: false,
                data: response.recordsets[0] ? response.recordsets[0][0] : null,
            };
            sql.close(conexion);
            return result;
        } catch (error) {
            let result = {
                error: true,
                msg: error.message ?
                    error.message : "Error en el metodo setAtributosTiposServicios de la clase daoTiposServicios",
            };
            sql.close(conexion);
            return result;
        }
    }

    async deleteTiposServicios(data) {
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
                    "Error en el metodo deleteTiposServicios de la clase daoTiposServicios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoTiposServicios;
