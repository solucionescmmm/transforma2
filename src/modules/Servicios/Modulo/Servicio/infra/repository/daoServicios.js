//librerias
const sql = require("mssql");
const validator = require("validator").default;

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
                ${data.strNombre},
                ${data.intIdTipoServicio},
                ${data.strDescripcion},
                ${data.bitModulos},
                ${data.intIdEstado},
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();

            INSERT INTO tbl_Result_TipoServicio_Servicio (intIdTipoServicio, intIdServicio, dtmCreacion, strUsuarioCreacion)
            VALUES (${data.intIdTipoServicio}, @intId, GETDATE(), ${data.strUsuarioCreacion})
    
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
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_modulos_Servicio WHERE intId = @intId`;

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
                    "Error en el metodo setSedeTipoTarifaServicio de la clase daoServicios",
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
                    "Error en el metodo setAreasServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setResultServicios(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .input("strIdServicio", sql.NVarChar, data.intIdServicio)
                .input("strIdAtributo", sql.NVarChar, data.intIdAtributo)
                .input("strResultAtributo", sql.NVarChar, data.strResultAtributo)
                .execute("sp_updateResultTipoServicioAtributos");

            let result = {
                error: false,
                data: response.recordsets[0] ? response.recordsets[0][0] : null,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setAreasServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
            SELECT 
            
            Servicio.intId,
            Servicio.intIdTipoServicio,
            Servicio.strNombre,
            Servicio.strDescripcion,
            Servicio.btModulos,
            Servicio.intIdEstado,
            Estado.strNombre as strEstado,
            Servicio.dtmCreacion,
            Servicio.strUsuarioCreacion,
            Servicio.dtmActualizacion,
            Servicio.strUsuarioActualizacion,
            TipoServicio.strNombre as strNombreTipoServicio,
            (
                SELECT * FROM tbl_modulos_Servicio ModuloServicio
                WHERE ModuloServicio.intIdServicio = Servicio.intId
                FOR JSON PATH
            ) as arrModulos,
            (
                SELECT 
                *,
                Valor as dblValor FROM tbl_Sede_TipoTarifa_Servicio SedeTipoTarifa
                WHERE SedeTipoTarifa.intIdServicio = Servicio.intId
                FOR JSON PATH
            ) as arrSedesTarifas,
            (
                SELECT * FROM tbl_Area_Servicios AreaServicio
                WHERE AreaServicio.intIdServicio = Servicio.intId
                FOR JSON PATH
            ) as arrResponsables,
            (
                SELECT * FROM tbl_Result_TipoServicio_Servicio ResultadoServicio
                WHERE ResultadoServicio.intIdServicio = Servicio.intId
                FOR JSON PATH  
            )as objResultAtributos
            FROM tbl_Servicios Servicio

            INNER JOIN tbl_Estados Estado on Estado.intId = Servicio.intIdEstado
            INNER JOIN tbl_TiposServicios TipoServicio on TipoServicio.intId = Servicio.intIdTipoServicio

            WHERE (Servicio.intId = ${data.intId} OR ${data.intId} IS NULL)`;

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
                        arrNewData[i].objResultAtributos = objResultAtributos[0];
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
                    "Error en el metodo getServicios de la clase daoServicios",
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
                    error.message : "Error en el metodo getTiposServicios de la clase daoServicios",
            };
            sql.close(conexion);
            return result;
        }
    }

    async getServiciosActivos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .input("pstrNombreMaestro", sql.VarChar, data.strNombreMaestro)
                .input("pintIdMaestro", sql.VarChar, data.intIdMaestro)
                .execute("sp_getServiciosActivos");
            let result = {
                error: false,
                data:response.recordsets[0],
            };
            sql.close(conexion);
            return result;
        } catch (error) {
            let result = {
                error: true,
                msg: error.message ?
                    error.message : "Error en el metodo getServiciosActivos de la clase daoServicios",
            };
            sql.close(conexion);
            return result;
        }
    }

    async updateServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                UPDATE tbl_Servicios

                SET intIdTipoServicio       = COALESCE(${data.intIdTipoServicio}, intIdTipoServicio),
                    strDescripcion          = COALESCE(${data.strDescripcion}, strDescripcion),
                    btModulos               = COALESCE(${data.btModulos}, btModulos),
                    intIdEstado             = COALESCE(${data.intIdEstado}, intIdEstado),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_Servicios WHERE intId = ${data.intId}`;

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
                    "Error en el metodo updateServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateModuloServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                UPDATE tbl_modulos_Servicio

                SET intIdServicio           = COALESCE(${data.intIdServicio}, intIdServicio),
                    strNombre               = COALESCE(${data.strNombre}, strNombre),
                    intHoras                = COALESCE(${data.intHoras}, intHoras),
                    strEntregables          = COALESCE(${data.strEntregables}, strEntregables),
                    strResponsables         = COALESCE(${data.strResponsables}, strResponsables),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_modulos_Servicio WHERE intId = ${data.intId}`;

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
                    "Error en el metodo updateModuloServicios de la clase daoServicios",
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
                    Valor                   = COALESCE(${data.dblValor}, Valor),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_Sede_TipoTarifa_Servicio WHERE intId = ${data.intId}`;

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
                    "Error en el metodo updateSedeTipoTarifaServicio de la clase daoServicios",
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
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_Area_Servicios WHERE intId = ${data.intId}`;

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
                    "Error en el metodo updateAreasServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`
                DELETE FROM tbl_Result_TipoServicio_Servicio WHERE intIdServicio = ${data.intId}
                DELETE FROM tbl_Area_Servicios WHERE intIdServicio = ${data.intId}
                DELETE FROM tbl_Sede_TipoTarifa_Servicio WHERE intIdServicio = ${data.intId}
                DELETE FROM tbl_modulos_Servicio WHERE intIdServicio = ${data.intId}
                DELETE FROM tbl_Servicios WHERE intId = ${data.intId}`;

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
                    "Error en el metodo deleteServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteModuloServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_modulos_Servicio WHERE intIdServicio = ${data.intId}`;

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
                    "Error en el metodo deleteModuloServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteSedeTipoTarifaServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_Sede_TipoTarifa_Servicio WHERE intIdServicio = ${data.intId}`;

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
                    "Error en el metodo deleteSedeTipoTarifaServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteAreaServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_Area_Servicios WHERE intIdServicio = ${data.intId}`;

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
                    "Error en el metodo deleteAreaServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteResultadoServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_Result_TipoServicio_Servicio WHERE intIdServicio = ${data.intId}`;

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
                    "Error en el metodo deleteAreaServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoServicios;
