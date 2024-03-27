//Librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");

class daoDiagnosticoGeneral {
    async setDiagnosticoGeneral(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_DiagnosticoGeneral VALUES
            (
                ${data.intIdDiagnostico},
                ${data.intIdEmpresario},
                ${data.intIdTipoEmpresario},
                ${data.btFinalizado},
                ${data.strUbicacionVivienda},
                ${data.strTrabajanFamiliares},
                ${data.strCabezaHogar},
                ${data.intNumPersonasCargo},
                ${data.intHijos},
                ${data.intHijosEstudiando},
                ${data.strMaxNivelEducativoHijos},
                ${data.strEstadoCivil},
                ${data.strSituacionVivienda},
                ${data.strGrupoVulnerable},
                ${data.strPoblacionEtnica},
                ${data.intAñoInicioOperacion},
                ${data.strUbicacionUP},
                ${data.strRegistroCamaraComercio},
                ${data.strDefinineLineasProductoServicios},
                ${data.strLineaProductoServicioDestacada},
                ${data.strProductoServiciosNuevosUltimoAño},
                ${data.strListadoProdServ},
                ${data.strHistoriaEmpresa},
                ${data.strSuenioEmpresa},
                ${data.strEstudioEmprendimiento},
                ${data.strExperienciaEmprendimiento},
                ${data.strTipoContribuyente},
                ${data.strRut},
                ${data.strPresupuestoFamiliar},
                ${data.strIngresosDistintos},
                ${data.strOperacionesVentas6Meses},
                ${data.strEtapaValidacion},
                ${data.strProductoServiciosEnValidacion},
                ${data.strNivelDlloProductoServicios},
                ${data.strEtapaValidProductoServicios},
                ${data.PromedioVentas6Meses},
                ${data.strRangoVentas},
                ${data.strRangoEmpleados},
                ${data.MinimoValorProducto},
                ${data.MaximoValorProducto},
                ${data.intCantidadUnidadesProducidasMes},
                ${data.strEscojaProductoServicio},
                ${data.ValorVentaProductoEscogido},
                ${data.strConoceMargenRentaProductoEscogido},
                ${data.intPorcentajeMargenRentaProductoEscogido},
                ${data.strConoceCostosProductoEscogido},
                ${data.CostoProduccionProductoEscogido},
                ${data.strPorcentajeIntermediacionVentas},
                ${data.strDefinePorcentajesCanal},
                ${data.intRangoPorcentajeIntermediacionVentas},
                ${data.strTipoEmpleoGenerado},
                ${data.strDlloAcitividadesContratados},
                ${data.strPromedioTiempoInvertido},
                ${data.strRolesEmprendimiento},
                ${data.strDiasProduccion},
                ${data.strGeneraEmpleoRiesgoPobreza},
                ${data.valorGananciasMes},
                ${data.strActivos},
                ${data.ValorActivos},
                ${data.strEtapaDllo},
                NULL,
                NULL,
                ${data.strRedesSociales},
                ${data.strConclusiones},
                ${data.strURLSFotosProducto},
                ${data.strLugarSesion},
                ${data.dtmFechaSesion},
                ${data.strUsuarioCreacion},
                GETDATE(),
                ${data.strUsuarioActualizacion}
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_DiagnosticoGeneral WHERE intId = @intId`;

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
                    "Error en el metodo setDiagnosticoGeneral de la clase daoDiagnosticoGeneral",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateDiagnosticoGeneral(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_DiagnosticoGeneral

            SET strUbicacionVivienda                      = COALESCE(${data.strUbicacionVivienda}, strUbicacionVivienda),
                strTrabajanFamiliares                     = COALESCE(${data.strTrabajanFamiliares}, strTrabajanFamiliares),
                strCabezaHogar                            = COALESCE(${data.strCabezaHogar}, strCabezaHogar),
                intNumPersonasCargo                       = COALESCE(${data.intNumPersonasCargo}, intNumPersonasCargo),
                intHijos                                  = COALESCE(${data.intHijos}, intHijos),
                intHijosEstudiando                        = COALESCE(${data.intHijosEstudiando}, intHijosEstudiando),
                strmaxNivelEducativoHijos                 = COALESCE(${data.strMaxNivelEducativoHijos}, strmaxNivelEducativoHijos),
                strEstadoCivil                            = COALESCE(${data.strEstadoCivil}, strEstadoCivil),
                strSituacionVivienda                      = COALESCE(${data.strSituacionVivienda}, strSituacionVivienda),
                strGrupoVulnerable                        = COALESCE(${data.strGrupoVulnerable}, strGrupoVulnerable),
                strPoblacionEtnica                        = COALESCE(${data.strPoblacionEtnica}, strPoblacionEtnica),
                intAñoInicioOperacion                     = COALESCE(${data.intAñoInicioOperacion}, intAñoInicioOperacion),
                strUbicacionUP                            = COALESCE(${data.strUbicacionUP}, strUbicacionUP),
                strRegistroCamaraComercio                 = COALESCE(${data.strRegistroCamaraComercio}, strRegistroCamaraComercio),
                strDefinineLineasProductoServicios        = COALESCE(${data.strDefinineLineasProductoServicios}, strDefinineLineasProductoServicios),
                strLineaProductoServicioDestacada         = COALESCE(${data.strLineaProductoServicioDestacada}, strLineaProductoServicioDestacada),
                strListaProductoServiciosNuevosUltimoAño  = COALESCE(${data.strListadoProdServ}, strListaProductoServiciosNuevosUltimoAño),
                strHistoriaEmpresa                        = COALESCE(${data.strHistoriaEmpresa}, strHistoriaEmpresa),
                strSuenioEmpresa                          = COALESCE(${data.strSuenioEmpresa}, strSuenioEmpresa),
                strEstudioEmprendimiento                  = COALESCE(${data.strEstudioEmprendimiento}, strEstudioEmprendimiento),
                strExperienciaEmprendimiento              = COALESCE(${data.strExperienciaEmprendimiento}, strExperienciaEmprendimiento),
                strTipoContribuyente                      = COALESCE(${data.strTipoContribuyente}, strTipoContribuyente),
                strRut                                    = COALESCE(${data.strRut}, strRut),
                strPresupuestoFamiliar                    = COALESCE(${data.strPresupuestoFamiliar}, strPresupuestoFamiliar),
                strIngresosDistintos                      = COALESCE(${data.strIngresosDistintos}, strIngresosDistintos),
                strOperacionesVentas6Meses                = COALESCE(${data.strOperacionesVentas6Meses}, strOperacionesVentas6Meses),
                strEtapaValidacion                        = COALESCE(${data.strEtapaValidacion}, strEtapaValidacion),
                strProductoServiciosEnValidacion          = COALESCE(${data.strProductoServiciosEnValidacion}, strProductoServiciosEnValidacion),
                strNivelDlloProductoServicios             = COALESCE(${data.strNivelDlloProductoServicios}, strNivelDlloProductoServicios),
                strEtapaValidProductoServicios            = COALESCE(${data.strEtapaValidProductoServicios}, strEtapaValidProductoServicios),
                PromedioVentas6Meses                   = COALESCE(${data.PromedioVentas6Meses}, PromedioVentas6Meses),
                strRangoVentas                            = COALESCE(${data.strRangoVentas}, strRangoVentas),
                strRangoEmpleados                         = COALESCE(${data.strRangoEmpleados}, strRangoEmpleados),
                MinimoValorProducto                       = COALESCE(${data.MinimoValorProducto}, MinimoValorProducto),
                MaximoValorProducto                       = COALESCE(${data.MaximoValorProducto}, MaximoValorProducto),
                intCantidadUnidadesProducidasMes          = COALESCE(${data.intCantidadUnidadesProducidasMes}, intCantidadUnidadesProducidasMes),
                strEscojaProductoServicio                 = COALESCE(${data.strEscojaProductoServicio}, strEscojaProductoServicio),
                ValorVentaProductoEscogido                = COALESCE(${data.ValorVentaProductoEscogido}, ValorVentaProductoEscogido),
                strConoceMargenRentaProductoEscogido      = COALESCE(${data.strConoceMargenRentaProductoEscogido}, strConoceMargenRentaProductoEscogido),
                intPorcentajeMargenRentaProductoEscogido  = COALESCE(${data.intPorcentajeMargenRentaProductoEscogido}, intPorcentajeMargenRentaProductoEscogido),
                strConoceCostosProduccionProductoEscogido = COALESCE(${data.strConoceCostosProductoEscogido}, strConoceCostosProduccionProductoEscogido),
                CostoProduccionProductoEscogido           = COALESCE(${data.CostoProduccionProductoEscogido}, CostoProduccionProductoEscogido),
                strPorcentajeIntermediacionVentas         = COALESCE(${data.strPorcentajeIntermediacionVentas}, strPorcentajeIntermediacionVentas),
                strDefinePorcentajesCanal                 = COALESCE(${data.strDefinePorcentajesCanal}, strDefinePorcentajesCanal),
                intRangoPorcentajeIntermediacionVentas    = COALESCE(${data.intRangoPorcentajeIntermediacionVentas}, intRangoPorcentajeIntermediacionVentas),
                strTipoEmpleoGenerado                     = COALESCE(${data.strTipoEmpleoGenerado}, strTipoEmpleoGenerado),
                strDlloAcitividadesContratados            = COALESCE(${data.strDlloAcitividadesContratados}, strDlloAcitividadesContratados),
                strPromedioTiempoInvertido                = COALESCE(${data.strPromedioTiempoInvertido}, strPromedioTiempoInvertido),
                strRolesEmprendimiento                    = COALESCE(${data.strRolesEmprendimiento}, strRolesEmprendimiento),
                strDiasProduccion                         = COALESCE(${data.strDiasProduccion}, strDiasProduccion),
                strGeneraEmpleoRiesgoPobreza              = COALESCE(${data.strGeneraEmpleoRiesgoPobreza}, strGeneraEmpleoRiesgoPobreza),
                ValorGananciasMes                         = COALESCE(${data.valorGananciasMes}, ValorGananciasMes),
                strActivos                                = COALESCE(${data.strActivos}, strActivos),
                strMediosDigitales                        = COALESCE(${data.strRedesSociales}, strMediosDigitales),
                ValorActivos                              = COALESCE(${data.ValorActivos}, ValorActivos),
                strEtapaDllo                              = COALESCE(${data.strEtapaDllo}, strEtapaDllo),
                strConclusiones                           = COALESCE(${data.strConclusiones}, strConclusiones),
                strURLSFotosProducto                      = COALESCE(${data.strURLSFotosProducto}, strURLSFotosProducto),
                strLugarSesion                            = COALESCE(${data.strLugarSesion}, strLugarSesion),
                dtmFechaSesion                            = COALESCE(${data.dtmFechaSesion}, dtmFechaSesion),
                dtmActualizacion                          = COALESCE(GETDATE(), dtmActualizacion),
                strUsuarioActualizacion                   = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion)

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
                    "Error en el metodo updateDiagnosticoGeneral de la clase daoDiagnosticoGeneral",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateFinalizarDiagnosticoGeneral(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_DiagnosticoGeneral

            SET btFinalizado            = COALESCE(${data.btFinalizado}, btFinalizado),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion)

            WHERE intIdDiagnostico = ${data.intIdDiagnostico}

            SELECT * FROM tbl_DiagnosticoGeneral WHERE intIdDiagnostico = ${data.intIdDiagnostico}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El diagnostico general, fue finalizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateDiagnosticoGeneral de la clase daoDiagnosticoGeneral",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateEmpresarioDiagnosticoGeneral(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_Empresario

            SET strNombres               = COALESCE(${data.strNombres}, strNombres),
                strApellidos             = COALESCE(${data.strApellidos}, strApellidos),
                strTipoDocto             = COALESCE(${data.strTipoDocto}, strTipoDocto),
                strNroDocto              = COALESCE(${data.strNroDocto}, strNroDocto),
                strLugarExpedicionDocto  = COALESCE(${data.strLugarExpedicionDocto}, strLugarExpedicionDocto),
                dtFechaExpedicionDocto   = COALESCE(${data.dtFechaExpedicionDocto}, dtFechaExpedicionDocto),
                dtFechaNacimiento        = COALESCE(${data.dtFechaNacimiento}, dtFechaNacimiento),
                strGenero                = COALESCE(${data.strGenero}, strGenero),
                strCelular1              = COALESCE(${data.strCelular1}, strCelular1),
                strCelular2              = COALESCE(${data.strCelular2}, strCelular2),
                strCorreoElectronico1    = COALESCE(${data.strCorreoElectronico1}, strCorreoElectronico1),
                strCorreoElectronico2    = COALESCE(${data.strCorreoElectronico2}, strCorreoElectronico2),
                strNivelEducativo        = COALESCE(${data.strNivelEducativo}, strNivelEducativo),
                strTitulos               = COALESCE(${data.strTitulos}, strTitulos),
                strEstrato               = COALESCE(${data.strEstrato}, strEstrato),
                strPais                  = COALESCE(${data.arrPais}, strPais),
                strDepartamento          = COALESCE(${data.arrDepartamento}, strDepartamento),
                strCiudad                = COALESCE(${data.arrCiudad}, strCiudad),
                strBarrio                = COALESCE(${data.strBarrio}, strBarrio),
                strDireccionResidencia   = COALESCE(${data.strDireccionResidencia}, strDireccionResidencia),
                strUrlFileFoto           = COALESCE(${data.strURLFileFoto}, strUrlFileFoto),
                dtmActualizacion         = COALESCE(GETDATE(), dtmActualizacion),
                strUsuario               = COALESCE(${data.strUsuarioActualizacion}, strUsuario)

            WHERE intId = ${data.intIdEmpresario}

            SELECT * FROM tbl_Empresario WHERE intId = ${data.intIdEmpresario}`;

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
                    "Error en el metodo updateEmpresario de la clase daoDiagnosticoGeneral",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateEmpresaDiagnosticoGeneral(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_InfoEmpresa

            SET strNombreMarca                    = COALESCE(${data.strUnidadProductiva}, strNombreMarca),
                strLugarOperacion                 = COALESCE(${data.strLugarOperacion}, strLugarOperacion),
                strPais                           = COALESCE(${data.arrPais}, strPais),
                strDepartamento                   = COALESCE(${data.arrDepartamento}, strDepartamento),
                strCiudad                         = COALESCE(${data.arrCiudad}, strCiudad),
                strBarrio                         = COALESCE(${data.strBarrio}, strBarrio),
                strDireccionResidencia            = COALESCE(${data.strDireccionResidencia}, strDireccionResidencia),
                strSectorEconomico                = COALESCE(${data.strSectorEconomico}, strSectorEconomico),
                strCategoriaProducto              = COALESCE(${data.strCategoriaProducto}, strCategoriaProducto),
                strCategoriaServicio              = COALESCE(${data.strCategoriaServicio}, strCategoriaServicio),
                strCategoriasSecundarias          = COALESCE(${data.strCategoriasSecundarias}, strCategoriasSecundarias),
                strOtraCategoria                  = COALESCE(${data.strOtraCategoria}, strOtraCategoria),
                strDescProductosServicios         = COALESCE(${data.strDescProductosServicios}, strDescProductosServicios),
                strTiempoDedicacion               = COALESCE(${data.strTiempoDedicacion}, strTiempoDedicacion),
                btGeneraEmpleo                    = COALESCE(${data.btGeneraEmpleo}, btGeneraEmpleo),
                intNumeroEmpleados                = COALESCE(${data.intNumeroEmpleados}, intNumeroEmpleados),
                valorVentasMes                    = COALESCE(${data.dblValorVentasMes}, valorVentasMes),
                strMediosDigitales                = COALESCE(${data.strMediosDigitales}, strMediosDigitales),
                dtmActualizacion                  = COALESCE(GETDATE(), dtmActualizacion),
                strUsuarioActualizacion           = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion)

            WHERE intIdIdea = ${data.intIdIdea}

            SELECT * FROM tbl_InfoEmpresa WHERE intIdIdea = ${data.intIdIdea}`;

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
                    "Error en el metodo updateEmpresa de la clase daoDiagnosticoGeneral",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteDiagnosticoGeneral(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_DiagnosticoGeneral WHERE intIdDiagnostico = ${data.intId}`;

            let result = {
                error: false,
                msg: "El diagnóstico general fue eliminado con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteDiagnosticoGeneral de la clase daoDiagnosticoGeneral",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getDiagnosticoGeneral(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            FROM tbl_DiagnosticoGeneral

            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)
            AND   (intIdDiagnostico = ${data.intIdDiagnostico} OR ${data.intIdDiagnostico} IS NULL)`;

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
                    "Error en el metodo getComentario de la clase daoDiagnosticoGeneral",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoDiagnosticoGeneral;
