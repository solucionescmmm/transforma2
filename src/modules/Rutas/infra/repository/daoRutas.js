//librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../common/config/confSQL_connectionTransfroma");

class daoRutas {
    async setRutas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Rutas VALUES
            (
                ${data.intIdIdea},
                ${data.strNombre},
                ${data.intIdEstadoRuta},
                ${data.valorTotalRuta},
                ${data.intIdDoctoPropuesta},
                ${data.strResponsable},
                ${data.strObservaciones},
                ${data.intIdMotivoCancelacion},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Rutas WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La ruta, fue agregada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setRutas de la clase daoRutas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setFases(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Fases VALUES
            (
                ${data.intIdRuta},
                ${data.strNombre},
                ${data.intIdDiagnostico},
                ${data.intIdEstadoFase},
                ${data.intIdReferenciaTipoTarifa},
                ${data.valorReferenciaTotalFase},
                ${data.valorTotalFase},
                ${data.strResponsables},
                ${data.strObservaciones},
                ${data.intIdMotivoCancelacion},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Fases WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La fase, fue agregada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setRutas de la clase daoRutas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setPaquetesFases(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Paquetes_Fases VALUES
            (
                ${data.intIdFase},
                ${data.intIdPaquete},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Paquetes_Fases WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La fase, fue agregada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setRutas de la clase daoRutas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setServiciosFases(data) {
        
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Servicios_Fases VALUES
            (
                ${data.intIdFase},
                ${data.intIdServicio},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Servicios_Fases WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La fase, fue agregada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setRutas de la clase daoRutas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setObjetivosFases(data) {

        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Objetivos_Fases VALUES
            (
                ${data.intIdObjetivo},
                ${data.intIdFase},
                ${data.btCumplio},
                ${data.strObservacionesCumplimiento},
                GETDATE(),
                ${data.strUsuarioCreacion}
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Objetivos_Fases WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El objetivo, fue agregado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setRutas de la clase daoRutas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setObjetivosPaquetesFases(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Objetivos_Paquetes_Fases VALUES
            (
                ${data.intIdPaquetes_Fases},
                ${data.intIdObjetivo},
                ${data.btCumplio},
                ${data.strObservacionesCumplimiento},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Objetivos_Paquetes_Fases WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El objetivo, fue agregado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setRutas de la clase daoRutas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setObjetivosServiciosFases(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Objetivos_Servicios_Fases VALUES
            (
                ${data.intIdServicios_Fases},
                ${data.intIdObjetivo},
                ${data.btCumplio},
                ${data.strObservacionesCumplimiento},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Objetivos_Servicios_Fases WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El objetivo, fue agregado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setRutas de la clase daoRutas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getRutas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT 

                Rutas.intId,
                Rutas.intIdIdea,
                Rutas.strNombre,
                Rutas.intIdEstadoRuta,
                Rutas.valorTotalRuta,
                Rutas.intIdDoctoPropuesta,
                Rutas.strResponsables,
                Rutas.strObservaciones,
                Rutas.intIdMotivoCancelacion,
                Rutas.dtmCreacion,
                Rutas.strUsuarioCreacion,
                Rutas.dtmActualizacion,
                Rutas.strUsuarioActualizacion,
                EstadosRutas.strNombre as strEstadoRuta,
                (
                    SELECT 
                    Fases.intId,
                    Fases.intIdRuta,
                    Fases.strNombre,
                    Fases.intIdDiagnostico,
                    Fases.intIdEstadoFase,
                    Fases.intIdReferenciaTipoTarifa as intIdTarifa,
                    Fases.valorReferenciaTotalFase as dblValorRef,
                    Fases.valorTotalFase as dblValorFase,
                    Fases.strResponsables as strResponsable,
                    Fases.strObservaciones,
                    Fases.intIdMotivoCancelacion,
                    Fases.dtmCreacion,
                    Fases.strUsuarioCreacion,
                    Fases.dtmActualizacion,
                    Fases.strUsuarioActualizacion,
                    EstadosRutas.strNombre as strEstadoFase,
                    (
                        SELECT 
                        
                        FasesPaquetes.intId,
                        FasesPaquetes.intIdFase,
                        FasesPaquetes.intIdPaquete,
                        FasesPaquetes.dtmCreacion,
                        FasesPaquetes.strUsuarioCreacion,
                        FasesPaquetes.dtmActualizacion,
                        FasesPaquetes.strUsuarioActualizacion,
                        (
                            SELECT 
                            FasesObjPaquetes.intId,
                            FasesObjPaquetes.intIdPaquetes_Fases,
                            FasesObjPaquetes.intIdObjetivo,
                            FasesObjPaquetes.btCumplio,
                            FasesObjPaquetes.strObservacionesCumplimiento,
                            FasesObjPaquetes.dtmCreacion,
                            FasesObjPaquetes.strUsuarioCreacion,
                            FasesObjPaquetes.dtmActualizacion,
                            FasesObjPaquetes.strUsuarioActualizacion
                            
                            FROM tbl_Objetivos_Paquetes_Fases FasesObjPaquetes
        
                            WHERE FasesObjPaquetes.intIdPaquetes_Fases = FasesPaquetes.intId 
                            FOR JSON PATH
                        )as arrFasesObjPaquetes
                        
                        FROM tbl_Paquetes_Fases FasesPaquetes
                        WHERE FasesPaquetes.intIdFase = Fases.intId 
                        FOR JSON PATH
                    )as arrPaquetes,
                    (
                        SELECT 
                        
                        FasesServicios.intId,
                        FasesServicios.intIdFase,
                        FasesServicios.intIdServicio,
                        FasesServicios.dtmCreacion,
                        FasesServicios.strUsuarioCreacion,
                        FasesServicios.dtmActualizacion,
                        FasesServicios.strUsuarioActualizacion,
                        (
                            SELECT 
        
                            FasesObjServicios.intId,
                            FasesObjServicios.intIdServicios_Fases,
                            FasesObjServicios.intIdObjetivo,
                            FasesObjServicios.btCumplio,
                            FasesObjServicios.strObservacionesCumplimiento,
                            FasesObjServicios.dtmCreacion,
                            FasesObjServicios.strUsuarioCreacion,
                            FasesObjServicios.dtmActualizacion,
                            FasesObjServicios.strUsuarioActualizacion
                            
                            FROM tbl_Objetivos_Servicios_Fases FasesObjServicios
        
                            WHERE FasesObjServicios.intIdServicios_Fases = FasesServicios.intId 
                            FOR JSON PATH
                        )as arrFasesObjServicios

                        FROM tbl_Servicios_Fases FasesServicios
                        WHERE FasesServicios.intIdFase = Fases.intId 
                        FOR JSON PATH
                    )as arrServicios,
                    (
                        SELECT 
    
                        FasesObjetivos.intId,
                        FasesObjetivos.intIdObjetivo,
                        FasesObjetivos.intIdFase,
                        FasesObjetivos.btCumplio,
                        FasesObjetivos.strObservacionesCumplimiento,
                        FasesObjetivos.dtmCreacion,
                        FasesObjetivos.strUsuarioCreacion
                        
                        FROM tbl_Objetivos_Fases FasesObjetivos
                        WHERE FasesObjetivos.intIdFase = Fases.intId 
                        FOR JSON PATH
                    )as arrObjetivos

                    FROM tbl_Fases Fases
                    WHERE Fases.intIdRuta = Rutas.intId 
                    FOR JSON PATH
                )as arrFasesRutas
                
                FROM tbl_Rutas Rutas

                INNER JOIN tbl_EstadoRuta_Fase EstadosRutas on EstadosRutas.intId = Rutas.intIdEstadoRuta

                WHERE (Rutas.intIdIdea = ${data.intIdIdea})
                AND   (Rutas.intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let arrNewData = response.recordsets[0];

            for (let i = 0; i < arrNewData.length; i++) {
                let { arrFasesRutas } = arrNewData[i];

                if (validator.isJSON(arrFasesRutas)) {
                    arrFasesRutas = JSON.parse(arrFasesRutas);
                    arrNewData[i].arrFasesRutas = arrFasesRutas;
                }
                
            }

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
                    "Error en el metodo getRutas de la clase daoRutas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getEstadoFase(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT 

                Rutas.intId,
                (
                    SELECT 
                    Fases.intId,
                    Fases.intIdEstadoFase
                    FROM tbl_Fases Fases
                    WHERE Fases.intIdRuta = Rutas.intId 
                    FOR JSON PATH
                )as arrFasesRutas
                
                FROM tbl_Rutas Rutas

                INNER JOIN tbl_EstadoRuta_Fase EstadosRutas on EstadosRutas.intId = Rutas.intIdEstadoRuta

                WHERE (Rutas.intIdIdea = ${data.intIdIdea})
                AND   (Rutas.intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let arrNewData = response.recordsets[0];

            for (let i = 0; i < arrNewData.length; i++) {
                let { arrFasesRutas } = arrNewData[i];

                if (validator.isJSON(arrFasesRutas)) {
                    arrFasesRutas = JSON.parse(arrFasesRutas);
                    arrNewData[i].arrFasesRutas = arrFasesRutas;
                }
                
            }

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
                    "Error en el metodo getRutas de la clase daoRutas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getEstadosRutasFases(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT * FROM tbl_EstadoRuta_Fase 
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
                    "Error en el metodo getEstados de la clase daoEstados",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getIdEstadoRutas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT intId FROM tbl_EstadoRuta_Fase 
                WHERE (strNombre = ${data.strNombre})`;

            let result = {
                error: false,
                data: response.recordset[0],
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getIdEstados de la clase daoEstados",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateRutas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
            UPDATE tbl_Rutas

            SET strNombre               = COALESCE(${data.strNombre}, strNombre),
                intIdEstadoRuta         = COALESCE(${data.intIdEstadoRuta}, intIdEstadoRuta),
                valorTotalRuta          = COALESCE(${data.valorTotalRuta}, valorTotalRuta),
                intIdDoctoPropuesta     = COALESCE(${data.intIdDoctoPropuesta}, intIdDoctoPropuesta),
                strResponsables         = COALESCE(${data.strResponsables}, strResponsables),
                strObservaciones        = COALESCE(${data.strObservaciones}, strObservaciones),
                intIdMotivoCancelacion  = COALESCE(${data.intIdMotivoCancelacion}, intIdMotivoCancelacion),
                dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

            WHERE intId = ${data.intId}
            
            
            SELECT * FROM tbl_Rutas WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La ruta, fue actualizada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateRutas de la clase daoRutas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteRutas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`
            DELETE FROM tbl_Fases WHERE intIdRuta = ${data.intId}`;

            let result = {
                error: false,
                msg: `Se eliminó exitosamente la ruta.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteRutas de la clase daoRutas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteFases(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`
            DELETE FROM tbl_Fases WHERE intIdRuta = ${data.intIdRuta}
            `;

            let result = {
                error: false,
                msg: `Se eliminó exitosamente la ruta.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteRutas de la clase daoRutas",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoRutas;
