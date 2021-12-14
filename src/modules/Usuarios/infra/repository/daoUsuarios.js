//librerias
const sql = require("mssql");

//Conexion
const {
    conexionSecury,
} = require("../../../../common/config/confSQL_connectionSecurityTransforma");
class daoUsuarios {
    async getUsuarios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexionSecury).connect();
            let response = await conn
                .request()
                .input("pstrApp", sql.VarChar, data.strApp)
                .execute("usp_ConsultarUsuarios");
            
            let result = {
                error: false,
                data: response.recordsets[0]
            };
            sql.close(conexionSecury);
            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getUsuarios de la clase daoUsuarios",
            };

            sql.close(conexionSecury);

            return result;
        }
    }
}
module.exports = daoUsuarios;
