//librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");

class daoPaquetes {
    async setPaquetes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Paquetes VALUES
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
    
            SELECT * FROM tbl_Paquetes WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El paquete, fue agregado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setPaquetes de la clase daoPaquetes",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setServiciosPaquetes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Paquetes_Servicios VALUES
            (
                ${data.intIdPaquete},
                ${data.intIdServicio},
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Paquetes_Servicios WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El servicio asociado al paquete, fue agregado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setAreasPaquetes de la clase daoPaquetes",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setSedeTipoTarifaPaquete(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Sede_TipoTarifa_Paquetes VALUES
            (
                ${data.intIdSede},
                ${data.intIdTipoTarifa},
                ${data.intIdPaquete},
                ${data.dblValor},
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Sede_TipoTarifa_Paquetes WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La sede del paquete, fue agregada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setSedeTipoTarifaPaquete de la clase daoPaquetes",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getPaquetes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
            SELECT 
            
            Paquete.intId,
            Paquete.strNombre,
            Paquete.strDescripcion,
            Paquete.intIdEstado,
            Estado.strNombre as strEstado,
            Paquete.dtmCreacion,
            Paquete.strUsuarioCreacion,
            Paquete.dtmActualizacion,
            Paquete.strUsuarioActualizacion,
            (
                SELECT * FROM tbl_Paquetes_Servicios ServiciosPaquete
                WHERE ServiciosPaquete.intIdPaquete = Paquete.intId
                FOR JSON PATH
            ) as arrServicios,
            (
                SELECT 
                *,
                Valor as dblValor FROM tbl_Sede_TipoTarifa_Paquetes SedeTipoTarifa
                WHERE SedeTipoTarifa.intIdPaquete = Paquete.intId
                FOR JSON PATH
            ) as arrSedesTarifas

            FROM tbl_Paquetes Paquete

            INNER JOIN tbl_Estados Estado on Estado.intId = Paquete.intIdEstado

            WHERE (Paquete.intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let arrNewData = response.recordsets[0];

            for (let i = 0; i < arrNewData.length; i++) {
                if (arrNewData[i].arrSedesTarifas) {
                    let { arrSedesTarifas } = arrNewData[i];

                    if (validator.isJSON(arrSedesTarifas)) {
                        arrSedesTarifas = JSON.parse(arrSedesTarifas);
                        arrNewData[i].arrSedesTarifas = arrSedesTarifas;
                    }
                }
                if (arrNewData[i].arrServicios) {
                    let { arrServicios } = arrNewData[i];

                    if (validator.isJSON(arrServicios)) {
                        arrServicios = JSON.parse(arrServicios);
                        arrNewData[i].arrServicios = arrServicios;
                    }
                }
            }

            let result = {
                error: false,
                data: arrNewData
                    ? arrNewData.length > 0
                        ? arrNewData
                        : null
                    : null,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getPaquetes de la clase daoPaquetes",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getAtributosTiposPaquetes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .input("p_intIdTipoPaquete", sql.VarChar, data.intIdTipoPaquete)
                .execute("sp_getAtributosTipoPaquete");
            let result = {
                error: false,
                data: response.recordsets[0],
            };
            sql.close(conexion);
            return result;
        } catch (error) {
            let result = {
                error: true,
                msg: error.message
                    ? error.message
                    : "Error en el metodo getTiposPaquetes de la clase daoPaquetes",
            };
            sql.close(conexion);
            return result;
        }
    }

    async getPaquetesActivos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .input("pstrNombreMaestro", sql.VarChar, data.strNombreMaestro)
                .input("pintIdMaestro", sql.VarChar, data.intIdMaestro)
                .execute("sp_getPaquetesActivos");
            let result = {
                error: false,
                data: response.recordsets[0],
            };
            sql.close(conexion);
            return result;
        } catch (error) {
            let result = {
                error: true,
                msg: error.message
                    ? error.message
                    : "Error en el metodo getPaquetesActivos de la clase daoPaquetes",
            };
            sql.close(conexion);
            return result;
        }
    }

    async updatePaquetes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                UPDATE tbl_Paquetes

                SET strNombre              = COALESCE(${data.strNombre}, strNombre),
                    strDescripcion          = COALESCE(${data.strDescripcion}, strDescripcion),
                    intIdEstado             = COALESCE(${data.intIdEstado}, intIdEstado),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_Paquetes WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El paquete, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updatePaquetes de la clase daoPaquetes",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deletePaquetes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`
                DELETE FROM tbl_Result_TipoPaquete_Paquete WHERE intIdPaquete = ${data.intId}
                DELETE FROM tbl_Area_Paquetes WHERE intIdPaquete = ${data.intId}
                DELETE FROM tbl_Sede_TipoTarifa_Paquete WHERE intIdPaquete = ${data.intId}
                DELETE FROM tbl_modulos_Paquete WHERE intIdPaquete = ${data.intId}
                DELETE FROM tbl_Paquetes WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: `El servicio, fue eliminado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deletePaquetes de la clase daoPaquetes",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteServiciosPaquetes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_Paquetes_Servicios WHERE intIdPaquete = ${data.intId}`;

            let result = {
                error: false,
                msg: `El servicio, fue eliminado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteServiciosPaquetes de la clase daoPaquetes",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteSedeTipoTarifaPaquetes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_Sede_TipoTarifa_Paquetes WHERE intIdPaquete = ${data.intId}`;

            let result = {
                error: false,
                msg: `El servicio, fue eliminado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteSedeTipoTarifaPaquetes de la clase daoPaquetes",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoPaquetes;
