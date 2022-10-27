//Librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");

class daoDiagnosticoServicio {
    async setDiagnosticoServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_DiagnosticoServicios VALUES
            (
                ${data.intIdDiagnostico},
                ${data.intIdEmpresario},
                ${data.strServicio},
                ${data.strHerramientasServicio},
                ${data.strObjetivoProposito},
                ${data.strObjetivoPropositoDetalle},
                ${data.strObjetivoPropositoNivel},
                ${data.strRenovacionPortafolio},
                ${data.strRenovacionPortafolioDetalle},
                ${data.strRenovacionPortafolioNivel},
                ${data.strProcesoInteraccion},
                ${data.strProcesoInteraccionDetalle},
                ${data.strProcesoInteraccionNivel},
                ${data.strPuntosContacto},
                ${data.strPuntosContactoDetalle},
                ${data.strPuntosContactoNivel},
                ${data.strExperienciaDiseniada},
                ${data.strExperienciaDiseniadaDetalle},
                ${data.strExperienciaDiseniadaNivel},
                ${data.strRecursosServicio},
                ${data.strRecursosServicioDetalle},
                ${data.strRecursosServicioNivel},
                ${data.strPostVenta},
                ${data.strPostVentaDetalle},
                ${data.strPostVentaNivel},
                ${data.strLineaGrafica},
                ${data.strLineaGraficaDetalle},
                ${data.strLineaGraficaNivel},
                ${data.strIdentidadMarca},
                ${data.strIdentidadMarcaDetalle},
                ${data.strIdentidadMarcaNivel},
                ${data.strComunicacionMarca},
                ${data.strComunicacionMarcaDetalle},
                ${data.strComunicacionMarcaNivel},
                ${data.strPermisoFuncionamiento},
                ${data.strCertificadosRequeridos},
                ${data.strCertificadosActuales},
                ${data.strRegistroMarca},
                ${data.strPatentesUtilidad},
                ${data.strCualPatenteUtilidad},
                ${data.strConclusiones},
                ${data.strURLSFotos},
                ${data.strLugarSesion},
                ${data.dtmFechaSesion},
                ${data.strUsuarioCreacion},
                GETDATE(),
                ${data.strUsuarioActualizacion}
            )
            
            SET @intId = SCOPE_IDENTITY();`;

            let result = {
                error: false,
                msg: `El diagnostico de producto, fue registrado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setDiagnosticoServicios de la clase daoDiagnosticoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateDiagnosticoServicio(data) {
        console.log(data);
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn.query`

            UPDATE tbl_DiagnosticoServicios

            SET strServicio                    = COALESCE(${data.strServicio}, strServicio),
                strHerramientasServicio        = COALESCE(${data.strHerramientasServicio}, strHerramientasServicio),
                strObjetivoProposito           = COALESCE(${data.strObjetivoProposito}, strObjetivoProposito),
                strObjetivoPropositoDetalle    = COALESCE(${data.strObjetivoPropositoDetalle}, strObjetivoPropositoDetalle),
                strObjetivoPropositoNivel      = COALESCE(${data.strObjetivoPropositoNivel}, strObjetivoPropositoNivel),
                strRenovacionPortafolio        = COALESCE(${data.strRenovacionPortafolio}, strRenovacionPortafolio),
                strRenovacionPortafolioDetalle = COALESCE(${data.strRenovacionPortafolioDetalle}, strRenovacionPortafolioDetalle),
                strRenovacionPortafolioNivel   = COALESCE(${data.strRenovacionPortafolioNivel}, strRenovacionPortafolioNivel),
                strProcesoInteraccion          = COALESCE(${data.strProcesoInteraccion}, strProcesoInteraccion),
                strProcesoInteraccionDetalle   = COALESCE(${data.strProcesoInteraccionDetalle}, strProcesoInteraccionDetalle),
                strProcesoInteraccionNivel     = COALESCE(${data.strProcesoInteraccionNivel}, strProcesoInteraccionNivel),
                strPuntosContacto              = COALESCE(${data.strPuntosContacto}, strPuntosContacto),
                strPuntosContactoDetalle       = COALESCE(${data.strPuntosContactoDetalle}, strPuntosContactoDetalle),
                strPuntosContactoNivel         = COALESCE(${data.strPuntosContactoNivel}, strPuntosContactoNivel),
                strExperienciaDiseñada         = COALESCE(${data.strExperienciaDiseniada}, strExperienciaDiseñada),
                strExperienciaDiseñadaDetalle  = COALESCE(${data.strExperienciaDiseniadaDetalle}, strExperienciaDiseñadaDetalle),
                strExperienciaDiseñadaNivel    = COALESCE(${data.strExperienciaDiseniadaNivel}, strExperienciaDiseñadaNivel),
                strRecursosServicio            = COALESCE(${data.strRecursosServicio}, strRecursosServicio),
                strRecursosServicioDetalle     = COALESCE(${data.strRecursosServicioDetalle}, strRecursosServicioDetalle),
                strRecursosServicioNivel       = COALESCE(${data.strRecursosServicioNivel}, strRecursosServicioNivel),
                strPostVenta                   = COALESCE(${data.strPostVenta}, strPostVenta),
                strPostVentaDetalle            = COALESCE(${data.strPostVentaDetalle}, strPostVentaDetalle),
                strPostVentaNivel              = COALESCE(${data.strPostVentaNivel}, strPostVentaNivel),
                strLineaGrafica                = COALESCE(${data.strLineaGrafica}, strLineaGrafica),
                strLineaGraficaDetalle         = COALESCE(${data.strLineaGraficaDetalle}, strLineaGraficaDetalle),
                strLineaGraficaNivel           = COALESCE(${data.strLineaGraficaNivel}, strLineaGraficaNivel),
                strIdentidadMarca              = COALESCE(${data.strIdentidadMarca}, strIdentidadMarca),
                strIdentidadMarcaDetalle       = COALESCE(${data.strIdentidadMarcaDetalle}, strIdentidadMarcaDetalle),
                strIdentidadMarcaNivel         = COALESCE(${data.strIdentidadMarcaNivel}, strIdentidadMarcaNivel),
                strComunicacionMarca           = COALESCE(${data.strComunicacionMarca}, strComunicacionMarca),
                strComunicacionMarcaDetalle    = COALESCE(${data.strComunicacionMarcaDetalle}, strComunicacionMarcaDetalle),
                strComunicacionMarcaNivel      = COALESCE(${data.strComunicacionMarcaNivel}, strComunicacionMarcaNivel),
                strPermisoFuncionamiento       = COALESCE(${data.strPermisoFuncionamiento}, strPermisoFuncionamiento),
                strCertificadosRequeridos      = COALESCE(${data.strCertificadosRequeridos}, strCertificadosRequeridos),
                strCertificadosActuales        = COALESCE(${data.strCertificadosActuales}, strCertificadosActuales),
                strRegistroMarca               = COALESCE(${data.strRegistroMarca}, strRegistroMarca),
                strPatentesUtilidad            = COALESCE(${data.strPatentesUtilidad}, strPatentesUtilidad),
                strCualPatenteUtilidad         = COALESCE(${data.strCualPatenteUtilidad}, strCualPatenteUtilidad),
                strConclusiones                = COALESCE(${data.strConclusiones}, strConclusiones),
                strURLSFotos                   = COALESCE(${data.strURLSFotos}, strURLSFotos),
                strLugarSesion                 = COALESCE(${data.strLugarSesion}, strLugarSesion),
                strUsuarioActualizacion        = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                dtmActualizacion               = COALESCE(GETDATE(), dtmActualizacion)

                WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: `El diagnostico de servicio, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateDiagnosticoServicios de la clase daoDiagnosticoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteDiagnosticoServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_DiagnosticoServicios WHERE intIdEmpresario = ${data.intId}`;

            let result = {
                error: false,
                msg: "El diagnostico de servicio, fue eliminado con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteDiagnosticoServicios de la clase daoDiagnosticoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getDiagnosticoServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            FROM tbl_DiagnosticoServicios

            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)
            AND   (intIdEmpresario = ${data.intIdEmpresario} OR ${data.intIdEmpresario} IS NULL)
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
                    "Error en el metodo getDiagnosticoServicios de la clase daoDiagnosticoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setResultDiagnosticoServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            await conn
                .request()
                .input("intIdEmpresario", sql.Int, data.intIdEmpresario)
                .execute("sp_SetResultDiagnosticoServicios");

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
                    "Error en el metodo setResultDiagnosticoServicio de la clase daoDiagnosticoServicio",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getResultDiagnosticoServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .input("intIdEmpresario", sql.Int, data.intIdEmpresario)
                .execute("sp_GetResultDiagnosticoServicios");

            let result = {
                error: false,
                data: response.recordset[0]
            };
            console.log(response);
            sql.close(conexion);
            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getResultDiagnosticoServicio de la clase daoDiagnosticoServicio",
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
            FROM tbl_DiagnosticoServicios

            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)`;

            let result = {
                error: false,
                data:  response.recordset[0]
            };
            console.log(result);
            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getIntIdEmpresario de la clase daoDiagnosticoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoDiagnosticoServicio;
