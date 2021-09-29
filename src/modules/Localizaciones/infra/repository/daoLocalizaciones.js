//librerias
const sql = require("mssql");

//Conexion
const {conexion} = require("../../../../common/config/confSQL_connectionTransfroma");

class daoLocalizaciones{
    async getDepartamento() {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .execute("sp_getDepartamentos");
            
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
                    "Error en el metodo getDepartamento de la clase daoLocalizaciones",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoLocalizaciones