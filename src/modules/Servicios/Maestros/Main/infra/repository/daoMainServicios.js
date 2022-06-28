//librerias
const sql = require("mssql");

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");
class daoMainServicios {
    async getServicios(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
            SELECT 
            
            Servicio.intId,
            Servicio.intIdTipoServicio,
            Servicio.strDescripcion,
            Servicio.btModulos,
            Servicio.intIdEstado,
            Estado.strNombre as strEstado,
            Servicio.dtmCreacion,
            Servicio.strUsuarioCreacion,
            Servicio.dtmActualizacion,
            Servicio.strUsuarioActualizacion,
            (
                SELECT * FROM tbl_modulos_Servicio ModuloServicio
                WHERE ModuloServicio.intIdServicio = Servicio.intId
                FOR JSON PATH
            ) as arrModulos,
            (
                SELECT * FROM tbl_Sede_TipoTarifa_Servicio SedeTipoTarifa
                WHERE SedeTipoTarifa.intIdServicio = Servicio.intId
                FOR JSON PATH
            ) as arrSedesTarifas,
            (
                SELECT * FROM tbl_Area_Servicios AreaServicio
                WHERE AreaServicio.intIdServicio = Servicio.intId
                FOR JSON PATH
            ) as arrResponsables
            FROM tbl_Servicios Servicio

            INNER JOIN tbl_Estados Estado on Estado.intId = Servicio.intIdEstado

            WHERE (Servicio.intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let arrNewData = response.recordsets[0];

            for (let i = 0; i < arrNewData.length; i++) {
                if (arrNewData[i].arrModulos) {
                    let { arrModulos } = arrNewData[i];

                    if (validator.isJSON(arrModulos)) {
                        arrModulos = JSON.parse(arrModulos);
                        arrNewData[i].arrModulos = arrModulos;
                    }
                }
                if (arrNewData[i].arrSedesTarifas) {
                    let { arrSedesTarifas } = arrNewData[i];

                    if (validator.isJSON(arrSedesTarifas)) {
                        arrSedesTarifas = JSON.parse(arrSedesTarifas);
                        arrNewData[i].arrSedesTarifas = arrSedesTarifas;
                    }
                }
                if (arrNewData[i].arrResponsables) {
                    let { arrResponsables } = arrNewData[i];

                    if (validator.isJSON(arrResponsables)) {
                        arrResponsables = JSON.parse(arrResponsables);
                        arrNewData[i].arrResponsables = arrResponsables;
                    }
                }
            }

            let result = {
                error: false,
                data: arrNewData
                    ? arrNewData.length > 0
                        ? arrNewData
                        : null
                    : null,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getServicios de la clase daoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoMainServicios;