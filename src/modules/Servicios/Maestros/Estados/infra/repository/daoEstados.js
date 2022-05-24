//librerias
const sql = require("mssql");

//Conexion
const {
    conexion,
} = require("../../../../common/config/confSQL_connectionSecurityTransforma");
class daoEstados {
    async getEstados(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT * FROM tbl_Estados 
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

    async getIdEstados(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT intId FROM tbl_Estados 
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
}
module.exports = daoEstados;
