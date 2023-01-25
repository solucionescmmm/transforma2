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
                ${data.strAcompañamiento},
                ${data.strObservaciones},
                ${data.strResponsable},
                ${data.dtFechaFinTentativa},
                ${data.btFinalizada},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Acompañamientos WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La Acompañamiento, fue registrada con éxito.`,
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

    async getTipoAcompañamiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            FROM tbl_tipoAcompañamiento
            WHERE (intId = ${data.intId})`;

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
            WHERE (intId = ${data.intId})`;

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

            SET strAcompañamiento                = COALESCE(${data.strAcompañamiento}, strAcompañamiento),
                btFinalizada            = COALESCE(${data.btFinalizada}, btFinalizada),
                strObservaciones        = COALESCE(${data.strObservaciones}, strObservaciones),
                strResponsable          = COALESCE(${data.strResponsable}, strResponsable),
                dtFechaFinTentativa     = COALESCE(${data.strRespondtFechaFinTentativasable}, dtFechaFinTentativa),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion ),
                dtmFechaActualizacion   = COALESCE(GETDATE(), dtmFechaActualizacion)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_Acompañamientos WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La Acompañamiento, fue actualizada con éxito.`,
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
}
module.exports = daoAcompañamientos;
