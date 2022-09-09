//Librerias
const validator = require("validator").default;
const sql = require("mssql");

//Conexion
const { conexion } = require("../../../../common/config/confSQL_connectionTransfroma");

class daoDocumento {
    async setDocumento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Documentos VALUES
            (
                ${data.intIdIdea},
                ${data.strNombre},
                ${data.strObservaciones},
                ${data.strUrlDocumento},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Documentos WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El documento, fue registrado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setDocumento de la clase daoDocumento",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateDocumento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_Documentos

            SET strNombre               = COALESCE(${data.strNombre}, strNombre),
                strObservaciones        = COALESCE(${data.strObservaciones}, strObservaciones),
                strUrlDocumento         = COALESCE(${data.strUrlDocumento}, strUrlDocumento),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion ),
                dtmFechaActualizacion   = COALESCE(GETDATE(), dtmFechaActualizacion)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_Documentos WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El documento, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateDocumento de la clase daoDocumento",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteDocumento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_Documentos WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: "El Documento, fue eliminado con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteDocumento de la clase daoDocumento",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getDocumento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT 

            *
            
            FROM tbl_Documentos Documento

            WHERE (Documento.intId = ${data.intId} OR ${data.intId} IS NULL)
            AND   (Documento.intIdIdea = ${data.intIdIdea} OR ${data.intIdIdea} IS NULL) `;

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
                    "Error en el metodo getDocumento de la clase daoDocumento",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoDocumento;
