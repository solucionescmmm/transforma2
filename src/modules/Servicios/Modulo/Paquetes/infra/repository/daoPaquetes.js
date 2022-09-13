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
                if (arrNewData[i].arrModulos) {
                    let { arrModulos } = arrNewData[i];

                    if (validator.isJSON(arrModulos)) {
                        arrModulos = JSON.parse(arrModulos);
                        arrNewData[i].arrModulos = arrModulos;
                    }
                }
                if (arrNewData[i].arrSedesTarifas) {
                    let { arrSedesTarifas } = arrNewData[i];

                    if (validator.isJSON(arrSedesTarifas)) {
                        arrSedesTarifas = JSON.parse(arrSedesTarifas);
                        arrNewData[i].arrSedesTarifas = arrSedesTarifas;
                    }
                }
                if (arrNewData[i].arrResponsables) {
                    let { arrResponsables } = arrNewData[i];

                    if (validator.isJSON(arrResponsables)) {
                        arrResponsables = JSON.parse(arrResponsables);
                        arrNewData[i].arrResponsables = arrResponsables;
                    }
                }

                if (arrNewData[i].objResultAtributos) {
                    let { objResultAtributos } = arrNewData[i];

                    if (validator.isJSON(objResultAtributos)) {
                        objResultAtributos = JSON.parse(objResultAtributos);
                        arrNewData[i].objResultAtributos =
                            objResultAtributos[0];
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

                SET intIdTipoPaquete       = COALESCE(${data.intIdTipoPaquete}, intIdTipoPaquete),
                    strDescripcion          = COALESCE(${data.strDescripcion}, strDescripcion),
                    btModulos               = COALESCE(${data.bitModulos}, btModulos),
                    intIdEstado             = COALESCE(${data.intIdEstado}, intIdEstado),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_Paquetes WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El servicio, fue actualizado con éxito.`,
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

    async updateServiciosPaquetes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                UPDATE tbl_modulos_Paquete

                SET intIdPaquete           = COALESCE(${data.intIdPaquete}, intIdPaquete),
                    strNombre               = COALESCE(${data.strNombre}, strNombre),
                    intHoras                = COALESCE(${data.intHoras}, intHoras),
                    strEntregables          = COALESCE(${data.strEntregables}, strEntregables),
                    strResponsables         = COALESCE(${data.strResponsables}, strResponsables),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_modulos_Paquete WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El modulo del servicio, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateServiciosPaquetes de la clase daoPaquetes",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateSedeTipoTarifaPaquete(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                UPDATE tbl_Sede_TipoTarifa_Paquete

                SET intIdSede               = COALESCE(${data.intIdSede}, intIdSede),
                    intIdTipoTarifa         = COALESCE(${data.intIdTipoTarifa}, intIdTipoTarifa),
                    intIdPaquete           = COALESCE(${data.intIdPaquete}, intIdPaquete),
                    Valor                   = COALESCE(${data.dblValor}, Valor),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_Sede_TipoTarifa_Paquete WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `la tarifa del servicio, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateSedeTipoTarifaPaquete de la clase daoPaquetes",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateAreasPaquetes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                UPDATE tbl_Area_Paquetes

                SET intIdPaquete           = COALESCE(${data.intIdPaquete}, intIdPaquete),
                    intIdArea               = COALESCE(${data.intIdArea}, intIdArea),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_Area_Paquetes WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `la tarifa del servicio, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateAreasPaquetes de la clase daoPaquetes",
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
            await conn.query`DELETE FROM tbl_modulos_Paquete WHERE intIdPaquete = ${data.intId}`;

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
            await conn.query`DELETE FROM tbl_Sede_TipoTarifa_Paquete WHERE intIdPaquete = ${data.intId}`;

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

    async deleteAreaPaquetes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_Area_Paquetes WHERE intIdPaquete = ${data.intId}`;

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
                    "Error en el metodo deleteAreaPaquetes de la clase daoPaquetes",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteResultadoPaquetes(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_Result_TipoPaquete_Paquete WHERE intIdPaquete = ${data.intId}`;

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
                    "Error en el metodo deleteAreaPaquetes de la clase daoPaquetes",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoPaquetes;
