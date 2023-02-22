//Librerias
const validator = require("validator").default;
const sql = require("mssql");

//Conexion
const { conexion } = require("../../../../common/config/confSQL_connectionTransfroma");

class daoComentarios {
    async setComentario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Comentarios VALUES
            (
                ${data.intIdIdea},
                ${data.strMensaje},
                ${data.strURLImagenUsuario},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Comentarios WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El comentario, fue registrado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setComentario de la clase daoComentarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateComentario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_Comentarios

            SET strMensaje              = COALESCE(${data.strMensaje}, strMensaje),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_Comentarios WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El comentario, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateComentario de la clase daoComentarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteComentario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_Comentarios WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: "El comentario fue eliminado con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteComentario de la clase daoComentarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getComentario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT 

            Comentario.intId,
            Comentario.intIdIdea,
            Comentario.strMensaje,
            Comentario.strURLImagenUsuario,
            Comentario.dtmCreacion,
            Comentario.strUsuarioCreacion,
            Comentario.dtmActualizacion,
            Comentario.strUsuarioActualizacion,
            (
                SELECT * FROM tbl_RespuestaComentarios Respuesta
                WHERE Respuesta.intIdComentario = Comentario.intId
                FOR JSON PATH
            ) as objRespuesta
            
            FROM tbl_Comentarios Comentario

            WHERE (Comentario.intId = ${data.intId} OR ${data.intId} IS NULL)
            AND   (Comentario.intIdIdea = ${data.intIdIdea}) `;

            let arrNewData = response.recordsets[0];

            for (let i = 0; i < arrNewData.length; i++) {
                if (arrNewData[i].objRespuesta) {
                    let { objRespuesta } = arrNewData[i];

                    if (validator.isJSON(objRespuesta)) {
                        objRespuesta = JSON.parse(objRespuesta);
                        arrNewData[i].objRespuesta = objRespuesta;
                    }
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
                    "Error en el metodo getComentario de la clase daoComentarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setRespuesta(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_RespuestaComentarios VALUES
            (
                ${data.intIdComentario},
                ${data.strMensaje},
                ${data.strURLImagenUsuario},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_RespuestaComentarios WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La respuesta, fue registrada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setRespuesta de la clase daoComentarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateRespuesta(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_RespuestaComentarios

            SET strMensaje              = COALESCE(${data.strMensaje}, strMensaje),
                dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion)

            WHERE intId = ${data.intId}
    
            SELECT * FROM tbl_RespuestaComentarios WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La respuesta, fue actualizada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateRespuesta de la clase daoComentarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteRespuesta(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_RespuestaComentarios WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: "La respuesta, fue eliminada con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteRespuesta de la clase daoComentarios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoComentarios;
