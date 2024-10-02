//Librerias
const validator = require("validator").default;
const sql = require("mssql");

//Conexion
const { conexion } = require("../../../../common/config/confSQL_connectionTransfroma");

class daoTareas {
    async setTarea(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Tareas VALUES
            (
                ${data.intIdIdea},
                ${data.intIdEstadoTarea},
                ${data.strTarea},
                ${data.strObservaciones},
                ${data.strAreaResponsable},
                ${data.strResponsable},
                ${data.dtFechaAtencion},
                ${data.dtFechaFinTentativa},
                ${data.btFinalizada},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Tareas WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La tarea, fue registrada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setTarea de la clase daoTareas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateTarea(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_Tareas

            SET strTarea                = COALESCE(${data.strTarea}, strTarea),
                btFinalizada            = COALESCE(${data.btFinalizada}, btFinalizada),
                strObservaciones        = COALESCE(${data.strObservaciones}, strObservaciones),
                strResponsable          = COALESCE(${data.strResponsable}, strResponsable),
                dtFechaFinTentativa     = COALESCE(${data.strRespondtFechaFinTentativasable}, dtFechaFinTentativa),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion ),
                dtmFechaActualizacion   = COALESCE(GETDATE(), dtmFechaActualizacion)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_Tareas WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La tarea, fue actualizada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateTarea de la clase daoTareas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteTarea(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_Tareas WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: "La tarea, fue eliminada con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteTarea de la clase daoTareas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getTarea(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT 

            *
            
            FROM tbl_Tareas Tarea

            WHERE (Tarea.intId = ${data.intId} OR ${data.intId} IS NULL)
            AND   (Tarea.intIdIdea = ${data.intIdIdea} OR ${data.intIdIdea} IS NULL) `;

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
                    "Error en el metodo getTarea de la clase daoTareas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getEstadoTarea(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT 

            *
            
            FROM tbl_EstadosTareas

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
                    "Error en el metodo getEstadoTarea de la clase daoTareas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getIdEstadoTarea(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT 

            intId
            
            FROM tbl_EstadosTareas

            WHERE (strNombre = ${data.strNombre})`;

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
                    "Error en el metodo getIdEstadoTarea de la clase daoTareas",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoTareas;
