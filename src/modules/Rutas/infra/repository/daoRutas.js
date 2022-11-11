//librerias
const sql = require("mssql");

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
                ${data.strResponsables},
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

    async getRutas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT * FROM tbl_Rutas
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
                    "Error en el metodo getRutas de la clase daoRutas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getEstadosRutas(data) {
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
            await conn.query`DELETE FROM tbl_Rutas WHERE intId = ${data.intId}`;

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
