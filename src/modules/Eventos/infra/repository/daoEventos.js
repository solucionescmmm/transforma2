//Librerias
const validator = require("validator").default;
const sql = require("mssql");

//Conexion
const { conexion } = require("../../../../common/config/confSQL_connectionTransfroma");

class daoEventos {
    async setEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_EventosGrupales VALUES
            (
                ${data.strNombre},
                ${data.intIdTipoEvento},
                ${data.dtFechaInicio},
                ${data.dtFechaFin},
                ${data.intIdSede},
                ${data.intIdServicio},
                ${data.strResponsable},
                ${data.strInvolucrados},
                ${data.intNumSesiones},
                ${data.btPago},
                ${data.intEstadoEvento}
            )
            SET @intId = SCOPE_IDENTITY();

            SELECT * FROM tbl_EventosGrupales WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El evento ${data.strNombre}, fue creado con exito.`
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setSesionesEventos(data) {

        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_SesionesEventos VALUES
            (
                ${data.intIdEvento},
                ${data.strNombreModulo},
                ${data.intAreaResponsable},
                ${data.strResponsables},
                ${data.dtFechaInicio},
                ${data.dtFechaFin},
                ${data.btFinalizado}
            )
            SET @intId = SCOPE_IDENTITY();
            
            SELECT * FROM tbl_SesionesEventos WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El evento ${data.strNombreModulo}, fue creado con exito.`
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setSesionesEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setObjetivosEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_ObjetivosEventos VALUES
            (
                ${data.intIdEvento},
                ${data.strNombre}
            )
            SET @intId = SCOPE_IDENTITY();`;

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
                    "Error en el metodo setObjetivosEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setAsistentesEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_AsistentesEventos VALUES
            (
                ${data.intIdEvento},
                ${data.intIdIdea},
                ${data.intIdEmpresario},
                ${data.intIdTercero},
                ${data.intTipoEmpresario},
                ${data.btFinalizoEvento}
            )
            SET @intId = SCOPE_IDENTITY();`;

            let result = {
                error: false,
                msg: `Los asistentes, fueron matriculados con exito.`
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setObjetivosEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setAsistentesSesionesEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            
            INSERT INTO tbl_AsistentesSesionesEventos VALUES
            (
                ${data.intIdEvento},
                ${data.intIdAsistenteEvento}
            )`;

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
                    "Error en el metodo setObjetivosEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setAreasEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_AreasEventos VALUES
            (
                ${data.intIdEvento},
                ${data.intIdArea}
            )
            SET @intId = SCOPE_IDENTITY();
            
            SELECT * FROM tbl_AreasEventos WHERE intId = @intId`;

            let result = {
                error: false,
                data:response?.recordset[0],
                msg:"El area se guardo correctamente"
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setObjetivosEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`

            UPDATE tbl_EventosGrupales

            SET strNombre       = COALESCE(${data.strNombre}, strNombre),
                intIdTipoEvento = COALESCE(${data.intIdTipoEvento}, intIdTipoEvento),
                dtFechaIni      = COALESCE(${data.dtFechaInicio}, dtFechaIni),
                dtFechaFin      = COALESCE(${data.dtFechaFin}, dtFechaFin),
                intIdSede       = COALESCE(${data.intIdSede}, intIdSede),
                intIdServicio   = COALESCE(${data.intIdServicio}, intIdServicio),
                strResponsable  = COALESCE(${data.strResponsable}, strResponsable),
                strInvolucrados = COALESCE(${data.strInvolucrados}, strInvolucrados),
                intNumSesiones  = COALESCE(${data.intNumSesiones}, intNumSesiones),
                btPago          = COALESCE(${data.btPago}, btPago),
                intEstadoEvento = COALESCE(${data.intEstadoEvento}, intEstadoEvento)

            WHERE (intId = ${data.intId})`;

            let result = {
                error: false,
                msg: "Se actualizo correctamente el evento",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateEventos de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateSesionesEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`

            UPDATE tbl_SesionesEventos

            SET strNombreModulo    = COALESCE(${data.strNombreModulo}, strNombreModulo),
                intAreaResponsable = COALESCE(${data.intAreaResponsable}, intAreaResponsable),
                strResponsables    = COALESCE(${data.strResponsables}, strResponsables),
                dtFechaIni         = COALESCE(${data.dtFechaIni}, dtFechaIni),
                dtFechaFin         = COALESCE(${data.dtFechaFin}, dtFechaFin),
                btFinalizado       = COALESCE(${data.btFinalizado}, btFinalizado)

            WHERE (intId = ${data.intId})`;

            let result = {
                error: false,
                msg: "Se actualizo correctamente la sesión del evento",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateSesionesEventos de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateObjetivosEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`

            UPDATE tbl_ObjetivosEventos

            SET strNombre = COALESCE(${data.strNombre}, strNombre),

            WHERE (intId = ${data.intId})`;

            let result = {
                error: false,
                msg: "Se actualizo correctamente el objetivo del evento"
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateObjetivosEventos de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT

            Eventos.intId,
            Eventos.strNombre,
            Eventos.intIdTipoEvento,
            Eventos.dtFechaIni,
            Eventos.dtFechaFin,
            Eventos.intIdSede,
            Eventos.intIdServicio,
            Eventos.strResponsable,
            Eventos.strInvolucrados,
            Eventos.intNumSesiones,
            Eventos.btPago,
            Eventos.intEstadoEvento,
            Estados.strNombre as strNombreEstado,
            Servicios.strNombre as strNombreServicio,
            Tipos.strNombre as strNombreTipo,
            (
                SELECT

                AreasEventos.intId,
                AreasEventos.intIdEvento,
                AreasEventos.intIdArea

                FROM tbl_AreasEventos AreasEventos

                WHERE AreasEventos.intIdEvento = Eventos.intId
                FOR JSON PATH
            )as arrAreasEventos
            
            FROM tbl_EventosGrupales Eventos

            INNER JOIN tbl_EstadosEventos Estados on Estados.intId = Eventos.intEstadoEvento
            INNER JOIN tbl_tipoEvento Tipos on Tipos.intId = Eventos.intIdTipoEvento
            INNER JOIN tbl_Servicios Servicios on Servicios.intId = Eventos.intIdServicio

            WHERE (Eventos.intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let arrNewData = response.recordsets[0];

            for (let i = 0; i < arrNewData.length; i++) {
                if (arrNewData[i].arrAreasEventos) {
                    let { arrAreasEventos } = arrNewData[i];

                    if (validator.isJSON(arrAreasEventos)) {
                        arrAreasEventos = JSON.parse(arrAreasEventos);
                        arrNewData[i].arrAreasEventos = arrAreasEventos;
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
                    "Error en el metodo getEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getSesionesEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT

            SesionesEventos.intId,
            SesionesEventos.intIdEvento,
            SesionesEventos.strNombreModulo,
            SesionesEventos.intAreaResponsable,
            SesionesEventos.strResponsables,
            SesionesEventos.dtFechaIni,
            SesionesEventos.dtFechaFin,
            SesionesEventos.btFinalizado
            
            FROM tbl_SesionesEventos SesionesEventos

            WHERE (SesionesEventos.intId = ${data.intId} OR ${data.intId} IS NULL)AND (SesionesEventos.intIdEvento = ${data.intIdEvento})`;

            let arrNewData = response.recordsets[0];

            // for (let i = 0; i < arrNewData.length; i++) {
            //     if (arrNewData[i].arrAreasEventos) {
            //         let { arrAreasEventos } = arrNewData[i];

            //         if (validator.isJSON(arrAreasEventos)) {
            //             arrAreasEventos = JSON.parse(arrAreasEventos);
            //             arrNewData[i].arrAreasEventos = arrAreasEventos;
            //         }
            //     }
            // }

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
                    "Error en el metodo getEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getTiposEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            
            FROM tbl_tipoEvento 

            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL) `;

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
                    "Error en el metodo getTiposEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getEstadosEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            
            FROM tbl_EstadosEventos 

            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL) `;

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
                    "Error en el metodo getEstadosEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getIdEstadoEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT intId FROM tbl_EstadosEventos 
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

    async getIntNumSesiones(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT intNumSesiones
            
            FROM tbl_EventosGrupales 

            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let arrNewData = response.recordsets[0];

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
                    "Error en el metodo getEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getAsistentesEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            
            FROM tbl_AsistentesEventos 

            WHERE (intIdEvento = ${data.intIdEvento})`;

            let arrNewData = response.recordsets[0];

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
                    "Error en el metodo getEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getAsistentesSesionesEventos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            
            FROM tbl_AsistentesSesionesEventos 

            WHERE (intIdSesion = ${data.intIdSesion})`;

            let arrNewData = response.recordsets[0];

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
                    "Error en el metodo getEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteEventos(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`
                       
            DELETE tbl_EventosGrupales
            WHERE intId = ${data.intIdEvento}`;

            let result = {
                error: false,
                msg:"El evento se elimino correctamente"
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteAreasEventos(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`
                       
            DELETE tbl_AreasEventos
            WHERE intIdEvento = ${data.intIdEvento}`;

            let result = {
                error: false,
                msg:"El area se elimino correctamente"
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteAreasEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteSesionesEventos(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`
                       
            DELETE tbl_SesionesEventos
            WHERE intId = ${data.intIdSesionesEvento}`;

            let result = {
                error: false,
                msg:"La sesión se elimino correctamente"
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteSesionesEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteAsistentesEventos(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`
                       
            DELETE tbl_AsistentesEventos
            WHERE intId = ${data.intIdAsistentesEvento}`;

            let result = {
                error: false,
                msg:"El asistente se elimino correctamente"
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteSesionesEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteAsistentesSesionesEventos(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`
                       
            DELETE tbl_AsistentesSesionesEventos
            WHERE (intIdSesion = ${data.intIdSesion} AND intIdAsistenteEvento = ${data.intIdAsistenteEvento})`;

            let result = {
                error: false,
                msg:"La asistencia se elimino correctamente"
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteSesionesEventos de la clase daoEventos",
            };

            sql.close(conexion);

            return result;
        }
    }

}
module.exports = daoEventos;