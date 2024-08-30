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

    async getRolesUsuario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexionSecury).connect();
            let response = await conn
                .request()
                .input("pstrApp", sql.VarChar, data.strApp)
                .input("pstrEmail", sql.VarChar, data.strEmail)
                .output("P_bitError", sql.Bit)
                .output("P_strMsg", sql.VarChar)
                .execute("usp_ConsultarRolesApps");

            console.log(response)

            if (response.output.P_bitError) {
                throw new Error(response.output.P_strMsg)
            }

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
                    "Error en el metodo getRolesUsuario de la clase daoUsuarios",
            };

            sql.close(conexionSecury);

            return result;
        }
    }

}
module.exports = daoUsuarios;
