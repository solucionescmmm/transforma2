//Librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");

class daoDiagnosticoHumanas {
    async setDiagnosticoHumanas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_DiagnosticoHumanoSocial VALUES
            (
                ${data.intIdDiagnostico},
                ${data.intIdEmpresario},
                ${data.intIdTipoEmpresario},
                ${data.btFinalizado},
                ${data.strTomaDesiciones},
                ${data.strMotivaciones},
                ${data.strNivelVida},
                ${data.strRedesApoyoOtros},
                ${data.strProyectoVidaEmpresa},
                ${data.strHabilidadesAutonomia},
                ${data.strHabilidadesCapacidad},
                ${data.strHabilidadesComunicacion},
                ${data.strProyectoVidaEmprendimiento},
                ${data.strHabilidadesCreatividad},
                ${data.strConfianza},
                ${data.strActividadesDisminuyenActProductiva},
                ${data.strSituacionesDesistirEmprendimiento},
                ${data.strEquilibrioVida},
                ${data.strRedesApoyoPropia},
                ${data.strObservaciones},
                ${data.strLugarSesion},
                ${data.dtmFechaSesion},
                ${data.strUsuarioCreacion},
                GETDATE(),
                ${data.strUsuarioActualizacion}
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_DiagnosticoHumanoSocial WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El diagnostico de competencias humanas, fue registrado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setDiagnosticoHumanas de la clase daoDiagnosticoHumanas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateDiagnosticoHumanas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_DiagnosticoHumanoSocial

            SET strTomaDesiciones                     = COALESCE(${data.strTomaDesiciones}, strTomaDesiciones),
                strMotivaciones                       = COALESCE(${data.strMotivaciones}, strMotivaciones),
                strNivelVida                          = COALESCE(${data.strNivelVida}, strNivelVida),
                strRedesApoyoOtros                    = COALESCE(${data.strRedesApoyoOtros}, strRedesApoyoOtros),
                strProyectoVidaEmpresa                = COALESCE(${data.strProyectoVidaEmpresa}, strProyectoVidaEmpresa),
                strHabilidadesAutonomia               = COALESCE(${data.strHabilidadesAutonomia}, strHabilidadesAutonomia),
                strHabilidadesCapacidad               = COALESCE(${data.strHabilidadesCapacidad}, strHabilidadesCapacidad),
                strHabilidadesComunicacion             = COALESCE(${data.strHabilidadesComunicacion}, strHabilidadesComunicacion),
                strProyectoVidaEmprendimiento         = COALESCE(${data.strProyectoVidaEmprendimiento}, strProyectoVidaEmprendimiento),
                strHabilidadesCreatividad             = COALESCE(${data.strHabilidadesCreatividad}, strHabilidadesCreatividad),
                strConfianza                          = COALESCE(${data.strConfianza}, strConfianza),
                strActividadesDisminuyenActProductiva = COALESCE(${data.strActividadesDisminuyenActProductiva}, strActividadesDisminuyenActProductiva),
                strSituacionesDesistirEmprendimiento  = COALESCE(${data.strSituacionesDesistirEmprendimiento}, strSituacionesDesistirEmprendimiento),
                strEquilibrioVida                     = COALESCE(${data.strEquilibrioVida}, strEquilibrioVida),
                strRedesApoyoPropia                   = COALESCE(${data.strRedesApoyoPropia}, strRedesApoyoPropia),
                strObservaciones                      = COALESCE(${data.strObservaciones}, strObservaciones),
                strLugarSesion                        = COALESCE(${data.strLugarSesion}, strLugarSesion),
                dtmActualizacion                      = COALESCE(GETDATE(), dtmActualizacion),
                strUsuarioActualizacion               = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_DiagnosticoHumanoSocial WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El diagnostico de competencias humanas, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateDiagnosticoHumanas de la clase daoDiagnosticoHumanas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateFinalizarDiagnosticoHumanas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_DiagnosticoHumanoSocial

            SET btFinalizado            = COALESCE(${data.btFinalizado}, btFinalizado),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion)

            WHERE intIdDiagnostico = ${data.intIdDiagnostico}

            SELECT * FROM tbl_DiagnosticoHumanoSocial WHERE intIdDiagnostico = ${data.intIdDiagnostico}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El diagnostico de competencias humanas, fue finalizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateDiagnosticoHumanas de la clase daoDiagnosticoHumanas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteDiagnosticoHumanas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_DiagnosticoHumanoSocial WHERE intIdDiagnostico = ${data.intId}`;

            let result = {
                error: false,
                msg: "El diagnostico de competencias humanas fue eliminado con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteDiagnosticoHumanas de la clase daoDiagnosticoHumanas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getDiagnosticoHumanas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            FROM tbl_DiagnosticoHumanoSocial

            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)
            AND   (intIdDiagnostico = ${data.intIdDiagnostico} OR ${data.intIdDiagnostico} IS NULL) `;

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
                    "Error en el metodo getDiagnosticoHumanas de la clase daoDiagnosticoHumanas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setResultDiagnosticoHumanas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn
                .request()
                .input("intIdDiagnostico", sql.Int, data.intIdDiagnostico)
                .execute("sp_SetResultDiagnosticoHumano");

            let result = {
                error: false, 
            };

            sql.close(conexion);
            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setResultDiagnosticoHumanas de la clase daoDiagnosticoHumanas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getResultDiagnosticoHumanas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .input("intIdDiagnostico", sql.Int, data.intIdDiagnostico)
                .execute("sp_GetResultDiagnosticoHumano");
            let result = {
                error: false,
                data: response.recordset[0]
            };

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getResultDiagnosticoHumanas de la clase daoDiagnosticoHumanas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getIntIdEmpresario(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT intIdEmpresario
            FROM tbl_DiagnosticoHumanoSocial
 
            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let result = {
                error: false,
                data:  response.recordset[0]
            };
            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getIntIdEmpresario de la clase daoDiagnosticoHumanas",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoDiagnosticoHumanas;