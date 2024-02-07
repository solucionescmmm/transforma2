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
                NULL,
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
            Acompañamientos.intIdTipoAcompañamiento,
            Acompañamientos.btFinalizado,
            Acompañamientos.dtmCreacion,
            Acompañamientos.strUsuarioCreacion,
            Acompañamientos.dtmActualizacion,
            Acompañamientos.strUsuarioActualizacion,
            TipoAcompañamiento.strNombre as strTipoAcompañamiento,
            (
                SELECT 

                SesionesAcompañamientos.intId,
                SesionesAcompañamientos.intIdAcompañamiento,
                SesionesAcompañamientos.intIdEmpresario,
                SesionesAcompañamientos.dtmFechaInicial,
                SesionesAcompañamientos.dtmFechaFinal,
                SesionesAcompañamientos.strUbicacion,
                SesionesAcompañamientos.intIdTipoActividad,
                SesionesAcompañamientos.intIdEvento,
                SesionesAcompañamientos.intIdRuta,
                SesionesAcompañamientos.intIdFase,
                SesionesAcompañamientos.intIdServicio,
                SesionesAcompañamientos.intIdPaquete,
                SesionesAcompañamientos.btFinalizarServicio,
                SesionesAcompañamientos.strResponsables,
                SesionesAcompañamientos.strObjetivoActividad,
                SesionesAcompañamientos.strTemasActividades,
                SesionesAcompañamientos.strLogrosAvances,
                SesionesAcompañamientos.strObservaciones,
                SesionesAcompañamientos.intIdTarea,
                SesionesAcompañamientos.dtmProximaActividad,
                SesionesAcompañamientos.intIdDocumento,
                SesionesAcompañamientos.dtmCreacion,
                SesionesAcompañamientos.strUsuarioCreacion,
                SesionesAcompañamientos.dtmActualizacion,
                SesionesAcompañamientos.strUsuarioActualizacion,
                SesionesAcompañamientos.btFinalizado,
                Servicios.strNombre as strNombreServicio,
                Paquetes.strNombre as strNombrePaquete,
                Actividad.strNombre as strTipoActividad,
                Eventos.strNombre as strNombreEventos,
                Rutas.strNombre as strNombreRuta

                FROM tbl_Sesiones_Acompañamientos SesionesAcompañamientos

                LEFT JOIN tbl_servicios Servicios ON Servicios.intId = SesionesAcompañamientos.intIdServicio
                LEFT JOIN tbl_Paquetes Paquetes ON Paquetes.intId = SesionesAcompañamientos.intIdPaquete
                LEFT JOIN tbl_EventosGrupales Eventos ON Eventos.intId = SesionesAcompañamientos.intIdEvento
                LEFT JOIN tbl_Rutas Rutas ON Rutas.intId = SesionesAcompañamientos.intIdRuta
                LEFT JOIN tbl_TipoActividad Actividad ON Actividad.intId = SesionesAcompañamientos.intIdTipoActividad

                WHERE SesionesAcompañamientos.intIdAcompañamiento = Acompañamientos.intId

                FOR JSON PATH
            )as arrSesionAcompañamiento

            FROM tbl_Acompañamientos Acompañamientos

            LEFT JOIN tbl_tipoAcompañamiento TipoAcompañamiento ON TipoAcompañamiento.intId = Acompañamientos.intIdTipoAcompañamiento

            WHERE (Acompañamientos.intIdIdea = ${data.intIdIdea})
            AND   (Acompañamientos.intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let arrNewData = response.recordsets[0];

            for (let i = 0; i < arrNewData.length; i++) {
                let { arrSesionAcompañamiento } = arrNewData[i];

                if (validator.isJSON(arrSesionAcompañamiento)) {
                    arrSesionAcompañamiento = JSON.parse(arrSesionAcompañamiento);
                    arrNewData[i].arrSesionAcompañamiento = arrSesionAcompañamiento;
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

            SET intIdTipoAcompañamiento  = COALESCE(${data.intIdTipoAcompañamiento},intIdTipoAcompañamiento),
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

    async updateSesionAcompañamiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_Sesiones_Acompañamientos

            SET intIdEmpresario          = COALESCE(${data.intIdEmpresario},intIdEmpresario),
                dtmFechaInicial          = COALESCE(${data.dtmFechaInicial},dtmFechaInicial),
                dtmFechaFinal            = COALESCE(${data.dtmFechaFinal},dtmFechaFinal),
                strUbicacion             = COALESCE(${data.strUbicacion},strUbicacion),
                intIdTipoActividad       = COALESCE(${data.intIdTipoActividad},intIdTipoActividad),
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

            SELECT * FROM tbl_Sesiones_Acompañamientos WHERE intId = ${data.intId}`;

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

    async updateFinalizarSesionAcompañamiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_Sesiones_Acompañamientos

            SET btFinalizado            = COALESCE(${data.btFinalizado},btFinalizado),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_Sesiones_Acompañamientos WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La sesión, fue finalizada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateDiagnosticoTecnicas de la clase daoDiagnosticoTecnicas",
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

    async sp_setFlujoAcompañamiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn
                .request()
                .input("P_intIdIdea", sql.Int, data.intIdIdea)
                .input("p_intIdEvento", sql.Int, data.intIdEvento)
                .input("p_intIdEmpresario", sql.Int, data.intIdEmpresario)
                .input("intIdSedeTarifaServicio", sql.Int, data.intIdSedeTarifaServicio)
                .execute("sp_setFlujoAcompañamiento");
            
            let result = {
                error: false,
                data: response.recordsets[0]
            };
            sql.close(conexion);
            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo sp_setFlujoAcompañamiento de la clase daoAcompañamientos",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoAcompañamientos;
