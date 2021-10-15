//Conexion
const {conexion} = require("../../../../common/config/confSQL_connectionTransfroma");

class daoComentarios{
    async setComentario(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Comentarios VALUES
            (
                ${data.intIdEmpresario},
                ${data.strTipo},
                ${data.strMensaje},
                ${data.strUsuario},
                ${data.strUsuarioAsignado},
                ${data.strURLImagenUsuario},
                ${data.btResuelto},
                GETDATE()
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

     async updateComentario(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_Comentarios

            SET strTipo            = COALESCE(${data.strTipo}, strTipo),
                strMensaje         = COALESCE(${data.strMensaje}, strMensaje),
                strUsuarioAsignado = COALESCE(${data.strUsuarioAsignado}, strUsuarioAsignado),
                btResuelto         = COALESCE(${data.btResuelto}, btResuelto),
                dtmActualizacion   = COALESCE(GETDATE(), dtmActualizacion)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_Comentarios WHERE intId = ${data.intId}`;

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
                    "Error en el metodo updateComentario de la clase daoComentarios",
            };

            sql.close(conexion);

            return result;
        }
     }

     async deleteComentario(data){
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

     async getComentario(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`
            
            SELECT * FROM tbl_Comentarios 
            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)
            AND   (intIdEmpresario = ${data.intIdEmpresario} OR ${data.intIdEmpresario} IS NULL) `;

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
                    "Error en el metodo getComentario de la clase daoComentarios",
            };

            sql.close(conexion);

            return result;
        }
     }
}
module.exports = daoComentarios