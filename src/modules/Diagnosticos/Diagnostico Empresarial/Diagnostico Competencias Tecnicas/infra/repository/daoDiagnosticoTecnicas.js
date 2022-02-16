//Librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");

class daoDiagnosticoTecnicas {
    async setDiagnosticoTecnicas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_DiagnosticoServicios VALUES
            (
                ${data.intIdEmpresario},
                ${data.strCaractEmpresaComp},
                ${data.strCaractEmpresaCompDetalle},
                ${data.strAnalizoObjetivoEmpresa},
                ${data.strAnalizoObjetivoEmpresaDetalle},
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
                    "Error en el metodo setDiagnosticoTecnicas de la clase daoDiagnosticoTecnicas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateDiagnosticoTecnicas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_DiagnosticoGeneral

            SET strUbicacionVivienda           = COALESCE(${data.strUbicacionVivienda}, strUbicacionVivienda),
                strCabezaHogar                 = COALESCE(${data.strCabezaHogar}, strCabezaHogar),
                intNumPersonasCargo            = COALESCE(${data.intNumPersonasCargo}, intNumPersonasCargo),
                intHijos                       = COALESCE(${data.intHijos}, intHijos),
                intHijosEstudiando             = COALESCE(${data.intHijosEstudiando}, intHijosEstudiando),
                strMaxNivelEducativoHijos      = COALESCE(${data.strMaxNivelEducativoHijos}, strMaxNivelEducativoHijos),
                strEstadoCivil                 = COALESCE(${data.strEstadoCivil}, strEstadoCivil),
                strSituacionVivienda           = COALESCE(${data.strSituacionVivienda}, strSituacionVivienda),
                strGrupoVulnerable             = COALESCE(${data.strGrupoVulnerable}, strGrupoVulnerable),
                strPoblacionEtnica             = COALESCE(${data.strPoblacionEtnica}, strPoblacionEtnica),
                intAñoInicioOperacion          = COALESCE(${data.intAñoInicioOperacion}, intAñoInicioOperacion),
                strUbicacionUP                 = COALESCE(${data.strUbicacionUP}, strUbicacionUP),
                strRegistroCamaraComercio      = COALESCE(${data.strRegistroCamaraComercio}, strRegistroCamaraComercio),
                strHistoriaEmpresa             = COALESCE(${data.strHistoriaEmpresa}, strHistoriaEmpresa),
                strSuenioEmpresa               = COALESCE(${data.strSuenioEmpresa}, strSuenioEmpresa),
                strEstudioEmprendimiento       = COALESCE(${data.strEstudioEmprendimiento}, strEstudioEmprendimiento),
                strExperienciaEmprendimiento   = COALESCE(${data.strExperienciaEmprendimiento}, strExperienciaEmprendimiento),
                strTipoContribuyente           = COALESCE(${data.strTipoContribuyente}, strTipoContribuyente),
                strRut                         = COALESCE(${data.strRut}, strRut),
                strPresupuestoFamiliar         = COALESCE(${data.btIngresosPresupuestoFamiliar}, btIngresosPresupuestoFamiliar),
                strIngresosDistintos           = COALESCE(${data.strIngresosDistintos}, strIngresosDistintos),
                strOperacionesVentas6Meses     = COALESCE(${data.strOperacionesVentas6Meses}, strOperacionesVentas6Meses),
                strEtapaValidacion             = COALESCE(${data.strEtapaValidacion}, strEtapaValidacion),
                strPromedioVentas6Meses        = COALESCE(${data.strPromedioVentas6Meses}, strPromedioVentas6Meses),
                strRangoVentas                 = COALESCE(${data.strRangoVentas}, strRangoVentas),
                strRangoEmpleados              = COALESCE(${data.strRangoEmpleados}, strRangoEmpleados),
                strTipoEmpleoGenerado          = COALESCE(${data.strTipoEmpleoGenerado}, strTipoEmpleoGenerado),
                strDlloAcitividadesContratados = COALESCE(${data.strActividadesEmpleados}, strActividadesEmpleados),
                strPromedioTiempoInvertido     = COALESCE(${data.strTiempoEmpresarioEmprendimientoDia}, strTiempoEmpresarioEmprendimientoDia),
                strRolesEmprendimiento         = COALESCE(${data.strRolesEmpresarioEmprendimiento}, strRolesEmpresarioEmprendimiento),
                strDiasProduccion              = COALESCE(${data.strHorasEmpresarioProduccionDia}, strHorasEmpresarioProduccionDia),
                strGeneraEmpleoRiesgoPobreza   = COALESCE(${data.strGeneraEmpleoRiesgoPobreza}, strGeneraEmpleoRiesgoPobreza),
                ValorGananciasMes              = COALESCE(${data.ValorGananciasMes}, ValorGananciasMes),
                strActivos                     = COALESCE(${data.strActivos}, strActivos),
                strEtapaDllo                   = COALESCE(${data.strEtapaDllo}, strEtapaDllo),
                strConclusiones                = COALESCE(${data.strConclusiones}, strConclusiones),
                strUrlFileRegistroFotoProducto = COALESCE(${data.strUrlFileRegistroFotoProducto}, strUrlFileRegistroFotoProducto),
                strLugarSesion                 = COALESCE(${data.strLugarSesion}, strLugarSesion),
                strUsuarioActualizacion        = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                dtmActualizacion               = COALESCE(GETDATE(), dtmActualizacion)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_DiagnosticoGeneral WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El diagnostico general, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateDiagnosticoTecnicas de la clase daoDiagnosticoTecnicas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteDiagnosticoTecnicas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_DiagnosticoGeneral WHERE intIdEmpresario = ${data.intId}`;

            let result = {
                error: false,
                msg: "El comentario fue eliminado con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteDiagnosticoTecnicas de la clase daoDiagnosticoTecnicas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getDiagnosticoTecnicas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            FROM tbl_DiagnosticoGeneral

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
                    "Error en el metodo getDiagnosticoTecnicas de la clase daoDiagnosticoTecnicas",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoDiagnosticoTecnicas;