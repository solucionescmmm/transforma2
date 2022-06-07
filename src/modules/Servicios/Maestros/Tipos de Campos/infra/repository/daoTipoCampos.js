//librerias
const sql = require("mssql");

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");
class daoTipoCampos {
    async getTipoCampos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT * FROM tbl_TiposCampos 
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
                    "Error en el metodo getTipoCampos de la clase daoTipoCampos",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoTipoCampos;
