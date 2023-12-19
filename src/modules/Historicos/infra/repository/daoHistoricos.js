//Librerias
const validator = require("validator").default;
const sql = require("mssql");

//Conexion
const { conexion } = require("../../../../common/config/confSQL_connectionTransfroma");

class daoHistoricos {
    async setHistorico(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Historicos VALUES
            (
                ${data.intIdIdea},
                ${data.intNumeroEmpleados},
                ${data.ValorVentas},
                ${data.strTiempoDedicacionAdmin},
                ${data.intIdFuenteHistorico},
                NULL,
                NULL,
                NULL,
                ${data.intIdFuenteDato},
                GETDATE()
            )
            SET @intId = SCOPE_IDENTITY();

            SELECT * FROM tbl_Historicos WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0]
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setHistorico de la clase daoHistoricos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateHistorico(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`

            UPDATE tbl_Historicos

            SET intNumeroEmpleados       = COALESCE(${data.intNumeroEmpleados}, intNumeroEmpleados),
                ValorVentas              = COALESCE(${data.ValorVentas}, ValorVentas),
                strTiempoDedicacionAdmin = COALESCE(${data.strTiempoDedicacionAdmin}, strTiempoDedicacionAdmin)

            WHERE (intIdIdea = ${data.intIdIdea} AND intIdFuenteDato = ${data.intIdFuenteDato})`;

            let result = {
                error: false,
                msg:"Se actualizo correctamente el historico",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateInfoAdicional de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getHistorico(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT

            Historico.intIdIdea,
            Historico.intNumeroEmpleados,
            Historico.ValorVentas,
            Historico.strTiempoDedicacionAdmin,
            Historico.intIdFuenteHistorico,
            Historico.intIdEtapaDlloAuto,
            Historico.intEtapaDlloFecha,
            Historico.strClasificacionFecha,
            Historico.intIdFuenteDato,
            Historico.dtmCreacion,
            DesarrolloEtapa.intPuntaje as intPuntaje,
            FuenteHistorico.strNombre as strFuenteHistorico

            FROM tbl_Historicos Historico

            LEFT JOIN tbl_EtapaDllo DesarrolloEtapa ON DesarrolloEtapa.intId = Historico.intEtapaDlloFecha
            LEFT JOIN tbl_FuentesHistorico FuenteHistorico ON FuenteHistorico.intId = Historico.intIdFuenteHistorico

            WHERE (Historico.intIdIdea = ${data.intIdIdea} OR ${data.intIdIdea} IS NULL)`;

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
                    "Error en el metodo getHistorico de la clase daoHistoricos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getHistoricoByFuente(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT 

            Historico.intId,
            Historico.intIdIdea,
            Historico.intNumeroEmpleados,
            Historico.ValorVentas,
            Historico.strTiempoDedicacionAdmin,
            Historico.intIdFuenteHistorico,
            Historico.intIdEtapaDlloAuto,
            Historico.intEtapaDlloFecha,
            Historico.strClasificacionFecha,
            Historico.intIdFuenteDato,
            Historico.dtmCreacion
            
            FROM tbl_Historicos Historico

            LEFT JOIN tbl_FuentesHistorico FuenteHistorico ON FuenteHistorico.intId = Historico.intIdFuenteHistorico

            WHERE (Historico.intIdIdea = ${data.intIdIdea})
            AND (FuenteHistorico.strNombre = 'Prediagnóstico')`;

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
                    "Error en el metodo getHistorico de la clase daoHistoricos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getIdFuenteHistorico(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT intId FROM tbl_FuentesHistorico 
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
                    "Error en el metodo getIdFuenteHistorico de la clase daoHistoricos",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoHistoricos;