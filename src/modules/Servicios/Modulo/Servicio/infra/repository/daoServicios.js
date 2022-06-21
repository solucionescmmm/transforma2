//librerias
const sql = require("mssql");

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");
class daoServicios {
    async setServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Servicios VALUES
            (
                ${data.intIdTipoServicio},
                ${data.strDescripcion},
                ${data.btModulos},
                ${data.intIdEstado},
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Servicios WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El servicio, fue agregado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setModuloServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_modulos_Servicio VALUES
            (
                ${data.intIdServicio},
                ${data.strNombre},
                ${data.intHoras},
                ${data.strEntregables},
                ${data.strResponsables},
                ${data.intIdEstado},
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Servicios WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El modulo, fue agregado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

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
                ${data.dblValor},
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
                msg: `La sede del servicio, fue agregada con éxito.`,
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
                msg: `El área responsable de servicio, fue agregada con éxito.`,
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

    async deleteServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response =
                await conn.query`DELETE FROM tbl_Servicios WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El servicio, fue eliminado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteModuloServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response =
                await conn.query`
                DELETE FROM tbl_modulos_Servicio 
                WHERE intIdServicio = ${data.intIdServicio}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El modulo de servicio, fue eliminado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteModuloServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteSedeTipoTarifaServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DELETE FROM tbl_Sede_TipoTarifa_Servicio
            WHERE intIdServicio = ${data.intIdServicio}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El modulo de servicio, fue eliminado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteSedeTipoTarifaServicio de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteAreasServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DELETE FROM tbl_Area_Servicios
            WHERE intIdServicio = ${data.intIdServicio}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El area del servicio, fue eliminado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteAreasServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoServicios;
