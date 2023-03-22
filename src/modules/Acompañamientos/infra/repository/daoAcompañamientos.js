//Librerias
const validator = require("validator").default;
const sql = require("mssql");

//Conexion
const { conexion } = require("../../../../common/config/confSQL_connectionTransfroma");

class daoAcompañamientos {
    async setAcompañamiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Acompañamientos VALUES
            (
                ${data.intIdIdea},
                ${data.intIdTipoAcompañamiento},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL,
                ${data.btFinalizado}
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Acompañamientos WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La Acompañamiento, fue registrado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setAcompañamiento de la clase daoAcompañamientos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setSesionAcompañamiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Sesiones_Acompañamientos VALUES
            (
                ${data.intIdAcompañamiento},
                ${data.intIdEmpresario},
                ${data.dtmFechaInicial},
                ${data.dtmFechaFinal},
                ${data.strUbicacion},
                ${data.intIdTipoActividad},
                ${data.intIdRuta},
                ${data.intIdFase},
                ${data.intIdServicio},
                ${data.intIdPaquete},
                ${data.btFinalizarServicio},
                ${data.strResponsables},
                ${data.strObjetivoActividad},
                ${data.strTemasActividades},
                ${data.strLogrosAvances},
                ${data.strObservaciones},
                ${data.intIdTarea},
                ${data.dtmProximaActividad},
                ${data.intIdDocumento},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL,
                ${data.btFinalizado}
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Sesiones_Acompañamientos WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La Acompañamiento, fue registrado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setSesionAcompañamiento de la clase daoAcompañamientos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getAcompañamiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT 
            Acompañamientos.intId,
            Acompañamientos.intIdIdea,
            Acompañamientos.intIdEmpresario,
            Acompañamientos.intIdTipoAcompañamiento,
            Acompañamientos.dtmFechaInicial,
            Acompañamientos.dtmFechaFinal,
            Acompañamientos.strUbicacion,
            Acompañamientos.intIdTipoActividad,
            Acompañamientos.intIdRutaPaqueteServicio,
            Acompañamientos.strResponsables,
            Acompañamientos.strObjetivoActividad,
            Acompañamientos.strTemasActividades,
            Acompañamientos.strLogrosAvances,
            Acompañamientos.strObservaciones,
            Acompañamientos.intIdTarea,
            Acompañamientos.dtmProximaActividad,
            Acompañamientos.intIdDocumento,
            Acompañamientos.dtmCreacion,
            Acompañamientos.strUsuarioCreacion,
            Acompañamientos.dtmActualizacion,
            Acompañamientos.strUsuarioActualizacion,
            (
                SELECT 
                RutasAcompañamientos.intId,
                RutasAcompañamientos.intIdAcompañamiento,
                RutasAcompañamientos.intIdPaqueteFase,
                RutasAcompañamientos.intIdServicioFase,
                RutasAcompañamientos.dtmCreacion,
                RutasAcompañamientos.strUsuarioCreacion,
                RutasAcompañamientos.dtmActualizacion,
                RutasAcompañamientos.strUsuarioActualizacion

                FROM tbl_RutasAcompañamientos RutasAcompañamientos

                INNER JOIN tbl_Acompañamientos Acompañamientos on Acompañamientos.intId = RutasAcompañamientos.intIdAcompañamiento

                WHERE RutasAcompañamientos.intIdAcompañamiento = Acompañamientos.intId 
                FOR JSON PATH
            )as arrRutasAcompañamiento

            FROM tbl_Acompañamientos Acompañamientos

            WHERE (Acompañamientos.intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let arrNewData = response.recordsets[0];

            for (let i = 0; i < arrNewData.length; i++) {
                let { arrRutasAcompañamiento } = arrNewData[i];

                if (validator.isJSON(arrRutasAcompañamiento)) {
                    arrRutasAcompañamiento = JSON.parse(arrRutasAcompañamiento);
                    arrNewData[i].arrRutasAcompañamiento = arrRutasAcompañamiento;
                }
                
            }

            let result = {
                error: false,
                data: arrNewData ? (arrNewData.length > 0 ? arrNewData : null) : null,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getAcompañamiento de la clase daoAcompañamientos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getTipoAcompañamiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            FROM tbl_tipoAcompañamiento
            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let arrNewData = response.recordsets[0];

            let result = {
                error: false,
                data: arrNewData ? (arrNewData.length > 0 ? arrNewData : null) : null,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getAcompañamiento de la clase daoAcompañamientos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getTipoActividad(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            FROM tbl_tipoActividad
            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let arrNewData = response.recordsets[0];

            let result = {
                error: false,
                data: arrNewData ? (arrNewData.length > 0 ? arrNewData : null) : null,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getAcompañamiento de la clase daoAcompañamientos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateAcompañamiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_Acompañamientos

            SET intIdEmpresario          = COALESCE(${data.intIdEmpresario},intIdEmpresario),
                intIdTipoAcompañamiento  = COALESCE(${data.intIdTipoAcompañamiento},intIdTipoAcompañamiento),
                dtmFechaInicial          = COALESCE(${data.dtmFechaInicial},dtmFechaInicial),
                dtmFechaFinal            = COALESCE(${data.dtmFechaFinal},dtmFechaFinal),
                strUbicacion             = COALESCE(${data.strUbicacion},strUbicacion),
                intIdTipoActividad       = COALESCE(${data.intIdTipoActividad},intIdTipoActividad),
                intIdRutaPaqueteServicio = COALESCE(${data.intIdRutaPaqueteServicio},intIdRutaPaqueteServicio),
                strResponsables          = COALESCE(${data.strResponsables},strResponsables),
                strObjetivoActividad     = COALESCE(${data.strObjetivoActividad},strObjetivoActividad),
                strTemasActividades      = COALESCE(${data.strTemasActividades},strTemasActividades),
                strLogrosAvances         = COALESCE(${data.strLogrosAvances},strLogrosAvances),
                strObservaciones         = COALESCE(${data.strObservaciones},strObservaciones),
                intIdTarea               = COALESCE(${data.intIdTarea},intIdTarea),
                dtmProximaActividad      = COALESCE(${data.dtmProximaActividad},dtmProximaActividad),
                intIdDocumento           = COALESCE(${data.intIdDocumento},intIdDocumento),
                dtmActualizacion         = COALESCE(GETDATE(),dtmActualizacion),
                strUsuarioActualizacion  = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)
            

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_Acompañamientos WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La Acompañamiento, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateAcompañamiento de la clase daoAcompañamientos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteAcompañamiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_Acompañamientos WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: "La Acompañamiento, fue eliminada con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteAcompañamiento de la clase daoAcompañamientos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteRutaAcompañamiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_RutasAcompañamientos WHERE intIdAcompañamiento = ${data.intIdAcompañamiento}`;

            let result = {
                error: false,
                msg: "La Acompañamiento, fue eliminada con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteAcompañamiento de la clase daoAcompañamientos",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoAcompañamientos;
