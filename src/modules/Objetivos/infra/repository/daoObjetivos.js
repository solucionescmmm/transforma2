//librerias
const sql = require("mssql");

//Conexion
const {
    conexion,
} = require("../../../../common/config/confSQL_connectionTransfroma");
class daoObjetivos {
    async setObjetivos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Objetivos VALUES
            (
                ${data.strNombre},
                ${data.intIdEstado},
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Objetivos WHERE intId = @intId`;

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
                    "Error en el metodo setObjetivos de la clase daoObjetivos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getObjetivos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT * FROM tbl_Objetivos 
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
                    "Error en el metodo getObjetivos de la clase daoObjetivos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateObjetivos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                UPDATE tbl_Objetivos

                SET strNombre               = COALESCE(${data.strNombre}, strNombre),
                    intIdEstado             = COALESCE(${data.intIdEstado}, intIdEstado),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intId}
                
                
                SELECT * FROM tbl_Objetivos WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El objetivo, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateObjetivos de la clase daoObjetivos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteObjetivos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_Objetivos WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: `Se eliminó exitosamente el área.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteObjetivos de la clase daoObjetivos",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoObjetivos;
