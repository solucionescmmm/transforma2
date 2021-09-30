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

    async getMunicipos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .input("P_strDepartamento", sql.VarChar, data.strDepartamento)
                .execute("sp_getCiudades");
            
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

    async getLocalidades(data) {
        try {
            console.log(data)
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .input("P_strDepartamento", sql.VarChar, data.strDepartamento)
                .input("P_strCiudad", sql.VarChar, data.strCuidad)
                .execute("sp_getLocalidades");
            
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