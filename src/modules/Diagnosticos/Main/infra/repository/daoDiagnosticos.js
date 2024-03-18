//librerias
const sql = require("mssql");
const validator = require("validator").default

//Conexion
const {
    conexion,
} = require("../../../../../common/config/confSQL_connectionTransfroma");
class daoDiagnosticos {
    async setDiagnosticos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Diagnostico VALUES
            (
                ${data.intIdIdea},
                ${data.intIdTipoDiagnostico},
                ${data.intIdEstadoDiagnostico},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Diagnostico WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El diagnostico, fue creado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setDiagnosticos de la clase daoDiagnosticos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getDiagnosticos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            
            SELECT 

            Diagnostico.intId,
            Diagnostico.intIdIdea,
            Diagnostico.intIdTipoDiagnostico,
            Diagnostico.intIdEstadoDiagnostico,
            Diagnostico.dtmCreacion,
            Diagnostico.strUsuarioCreacion,
            Diagnostico.dtmActualizacion,
            Diagnostico.strUsuarioActualizacion,
            Tipo.strNombre as strTipoDiagnostico,
            Estado.strNombre as strEstadoDiagnostico
            
            FROM tbl_Diagnostico Diagnostico

            INNER JOIN tbl_TipoDiagnostico Tipo ON Tipo.intId = Diagnostico.intIdTipoDiagnostico
            INNER JOIN tbl_EstadoDiagnostico Estado ON Estado.intId = Diagnostico.intIdEstadoDiagnostico

            WHERE (Diagnostico.intId = ${data.intId} OR ${data.intId} IS NULL)
            AND   (Diagnostico.intIdIdea = ${data.intIdIdea} OR ${data.intIdIdea} IS NULL)
            AND   (Diagnostico.intIdTipoDiagnostico = ${data.intIdTipoDiagnostico} OR ${data.intIdTipoDiagnostico} IS NULL)
            AND   (Diagnostico.intIdEstadoDiagnostico = ${data.intIdEstadoDiagnostico} OR ${data.intIdEstadoDiagnostico} IS NULL) `;

            let arrNewData = response.recordsets[0];

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
                    "Error en el metodo getDiagnosticos de la clase daoDiagnosticos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getDiagnosticosHijos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            
            SELECT 

            (
                SELECT *
                FROM tbl_DiagnosticoGeneral
                WHERE intIdDiagnostico = Diagnostico.intId AND btFinalizado = 0
                FOR JSON PATH
            )AS objDiagnosticoGeneral,
            (
                SELECT *
                FROM tbl_DiagnosticoHumanoSocial
                WHERE intIdDiagnostico = Diagnostico.intId AND btFinalizado = 0
                FOR JSON PATH
            )AS objDiagnosticoHumanoSocial,
            (
                SELECT *
                FROM tbl_DiagnosticoCompetenciasTecnicas
                WHERE intIdDiagnostico = Diagnostico.intId AND btFinalizado = 0
                FOR JSON PATH
            )AS objDiagnosticoCompetenciasTecnicas,
            (
                SELECT *
                FROM tbl_DiagnosticoProductos
                WHERE intIdDiagnostico = Diagnostico.intId AND btFinalizado = 0
                FOR JSON PATH
            )AS objDiagnosticoProductos,
            (
                SELECT *
                FROM tbl_DiagnosticoServicios
                WHERE intIdDiagnostico = Diagnostico.intId AND btFinalizado = 0
                FOR JSON PATH
            )AS objDiagnosticoServicios
            
            FROM tbl_Diagnostico Diagnostico

            WHERE (Diagnostico.intId = ${data.intId}) `;

            let arrNewData = response.recordsets[0];

            for (let i = 0; i < arrNewData.length; i++) {
                if (arrNewData[i].objDiagnosticoGeneral) {
                    let { objDiagnosticoGeneral } = arrNewData[i];

                    if (validator.isJSON(objDiagnosticoGeneral)) {
                        objDiagnosticoGeneral = JSON.parse(
                            objDiagnosticoGeneral
                        );
                        arrNewData[i].objDiagnosticoGeneral =
                        objDiagnosticoGeneral;
                    }
                }
                if (arrNewData[i].objDiagnosticoHumanoSocial) {
                    let { objDiagnosticoHumanoSocial } = arrNewData[i];

                    if (validator.isJSON(objDiagnosticoHumanoSocial)) {
                        objDiagnosticoHumanoSocial = JSON.parse(objDiagnosticoHumanoSocial);
                        arrNewData[i].objDiagnosticoHumanoSocial = objDiagnosticoHumanoSocial;
                    }
                }
                if (arrNewData[i].objDiagnosticoCompetenciasTecnicas) {
                    let { objDiagnosticoCompetenciasTecnicas } = arrNewData[i];

                    if (validator.isJSON(objDiagnosticoCompetenciasTecnicas)) {
                        objDiagnosticoCompetenciasTecnicas = JSON.parse(objDiagnosticoCompetenciasTecnicas);
                        arrNewData[i].objDiagnosticoCompetenciasTecnicas = objDiagnosticoCompetenciasTecnicas;
                    }
                }
                if (arrNewData[i].objDiagnosticoProductos) {
                    let { objDiagnosticoProductos } = arrNewData[i];

                    if (validator.isJSON(objDiagnosticoProductos)) {
                        objDiagnosticoProductos = JSON.parse(objDiagnosticoProductos);
                        arrNewData[i].objDiagnosticoProductos = objDiagnosticoProductos;
                    }
                }

                if (arrNewData[i].objDiagnosticoServicios) {
                    let { objDiagnosticoServicios } = arrNewData[i];

                    if (validator.isJSON(objDiagnosticoServicios)) {
                        objDiagnosticoServicios = JSON.parse(objDiagnosticoServicios);
                        arrNewData[i].objDiagnosticoServicios = objDiagnosticoServicios;
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
                    "Error en el metodo getDiagnosticos de la clase daoDiagnosticos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getTipoDiagnosticos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT * FROM tbl_TipoDiagnostico 
                WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)
                AND   (strNombre = ${data.strNombre} OR ${data.strNombre} IS NULL)`;

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
                    "Error en el metodo getTipoDiagnosticos de la clase daoDiagnosticos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getEstadoDiagnosticos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT * FROM tbl_EstadoDiagnostico
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
                    "Error en el metodo getEstadoDiagnosticos de la clase daoDiagnosticos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getIdEstadoDiagnosticos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT intId FROM tbl_EstadoDiagnostico
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
                    "Error en el metodo getEstadoDiagnosticos de la clase daoDiagnosticos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateDiagnosticos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                UPDATE tbl_Diagnostico

                SET intIdEstadoDiagnostico  = COALESCE(${data.intIdEstadoDiagnostico}, intIdEstadoDiagnostico),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

                WHERE intId = ${data.intIdDiagnostico}
                
                
                SELECT * FROM tbl_Diagnostico WHERE intId = ${data.intIdDiagnostico}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El diagnóstico, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateDiagnosticos de la clase daoDiagnosticos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteDiagnosticos(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`DELETE FROM tbl_Diagnosticos WHERE intId = ${data.intId}`;

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
                    "Error en el metodo deleteDiagnosticos de la clase daoDiagnosticos",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoDiagnosticos;
