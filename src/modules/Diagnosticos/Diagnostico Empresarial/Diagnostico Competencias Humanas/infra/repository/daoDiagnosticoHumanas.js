//Librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");

class daoDiagnosticoHumanas {
    async setDiagnosticoHumana(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_DiagnosticoHumanoSocial VALUES
            (
                ${data.intIdEmpresario},
                ${data.strTomaDesiciones},
                ${data.strMotivaciones},
                ${data.strNivelVida},
                ${data.strRedesApoyoOtros},
                ${data.strProyectoVidaEmpresa},
                ${data.strHabilidadesAutonomia},
                ${data.strHabilidadesCapacidad},
                ${data.strHabilidadesComuniacion},
                ${data.strProyectoVidaEmprendimiento},
                ${data.strHabilidadesCreatividad},
                ${data.strConfianza},
                ${data.strEquilibrioVida},
                ${data.strRedesApoyoPropia},
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
                msg: `El diagnostico general, fue registrado con éxito.`,
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

            SET strTomaDesiciones           = COALESCE(${data.strTomaDesiciones}, strTomaDesiciones),
                strMotivaciones                 = COALESCE(${data.strMotivaciones}, strMotivaciones),
                strNivelVida            = COALESCE(${data.strNivelVida}, strNivelVida),
                strRedesApoyoOtros                       = COALESCE(${data.strRedesApoyoOtros}, strRedesApoyoOtros),
                strProyectoVidaEmpresa             = COALESCE(${data.strProyectoVidaEmpresa}, strProyectoVidaEmpresa),
                strHabilidadesAutonomia      = COALESCE(${data.strHabilidadesAutonomia}, strHabilidadesAutonomia),
                strHabilidadesCapacidad                 = COALESCE(${data.strHabilidadesCapacidad}, strHabilidadesCapacidad),
                strHabilidadesComuniacion           = COALESCE(${data.strHabilidadesComuniacion}, strHabilidadesComuniacion),
                strProyectoVidaEmprendimiento             = COALESCE(${data.strProyectoVidaEmprendimiento}, strProyectoVidaEmprendimiento),
                strHabilidadesCreatividad             = COALESCE(${data.strHabilidadesCreatividad}, strHabilidadesCreatividad),
                strConfianza          = COALESCE(${data.strConfianza}, strConfianza),
                strEquilibrioVida                 = COALESCE(${data.strEquilibrioVida}, strEquilibrioVida),
                strRedesApoyoPropia      = COALESCE(${data.strRedesApoyoPropia}, strRedesApoyoPropia),
                strLugarSesion                 = COALESCE(${data.strLugarSesion}, strLugarSesion),
                strUsuarioActualizacion        = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                dtmActualizacion               = COALESCE(GETDATE(), dtmActualizacion)

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

    async deleteDiagnosticoHumanas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_DiagnosticoHumanoSocial WHERE intIdEmpresario = ${data.intId}`;

            let result = {
                error: false,
                msg: "El diagnostico fue eliminado con éxito.",
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
            AND   (intIdEmpresario = ${data.intIdEmpresario} OR ${data.intIdEmpresario} IS NULL) `;

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
}
module.exports = daoDiagnosticoHumanas;