//librerias
const sql = require("mssql");

//Conexion
const {
    conexion,
} = require("../../../../common/config/confSQL_connectionTransfroma");
class daoListas {
    async getListas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .input("pstrGrupo", sql.VarChar, data.strGrupo)
                .input("pstrCodigo", sql.VarChar, data.strCodigo)
                .execute("usp_ConsultarListas");
            
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
                    "Error en el metodo getListas de la clase daoListas",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoListas;
