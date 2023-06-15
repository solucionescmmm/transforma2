//Librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../../../common/config/confSQL_connectionTransfroma");

class daoDiagnosticoExpress {
    async setDiagnosticoExpress(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;

            -- Query que inserta en Diagnostico HumanoSocial

            INSERT INTO tbl_DiagnosticoHumanoSocial 
            ( 
                intId,
                intIdDiagnostico,
                strHabilidadesAutonomia,
                strHabilidadesCapacidad,
                strHabilidadesComunicacion,
                strHabilidadesCreatividad,
                strTomaDesiciones,
                strConfianza,
                dtmFechaSesion,
                strUsuarioCreacion,
                dtmActualizacion,
                strUsuarioActualizacion
            )
            VALUES 
            (
                ${data.intIdDiagnostico},
                ${data.strHabilidadesAutonomia},
                ${data.strHabilidadesCapacidad},
                ${data.strHabilidadesComunicacion},
                ${data.strHabilidadesCreatividad},
                ${data.strTomaDesiciones},
                ${data.strConfianza},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                ${data.strUsuarioActualizacion}
            )

            -- Query que inserta en Diagnostico Producto

            INSERT INTO tbl_DiagnosticoProductos 
            ( 
                intId,
                intIdDiagnostico,
                strPermisoFuncionamiento, 
                strCertificadosRequeridos,
                strCertificadosActuales,
                strPatentesUtilidad,
                strCualPatenteUtilidad,
                strRegistroMarca,
                strIdentidadMarca,
                strComunicacionMarca,
                dtmFechaSesion,
                strUsuarioCreacion,
                dtmActualizacion,
                strUsuarioActualizacion
            )
            VALUES 
            (
                ${data.intIdDiagnostico},
                ${data.strPermisoFuncionamiento}, 
                ${data.strCertificadosRequeridos},
                ${data.strCertificadosActuales},
                ${data.strPatentesUtilidad},
                ${data.strCualPatenteUtilidad},
                ${data.strRegistroMarca},
                ${data.strIdentidadMarca},
                ${data.strComunicacionMarca},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                ${data.strUsuarioActualizacion}
            )

            -- Query que inserta en Diagnostico CompTecnicas

            INSERT INTO tbl_DiagnosticoCompetenciasTecnicas 
            ( 
                intId,
                intIdDiagnostico,
                strUniProdSosFinan,
                strTieneBaseDatosClientes,
                strActivIncreVentClient,
                strPlanAtraccionRelacionamientoFidelizacionClientes,
                strEquipTrabEstruct,
                strEmprFormaAcuerNormLab,
                strPlaneaEstraEmpPlanPlani,
                dtmFechaSesion,
                strUsuarioCreacion,
                dtmActualizacion,
                strUsuarioActualizacion
            )
            VALUES 
            (
                ${data.intIdDiagnostico},
                ${data.strUniProdSosFinan},
                ${data.strTieneBaseDatosClientes},
                ${data.strActivIncreVentClient},
                ${data.strPlanAtraccionRelacionamientoFidelizacionClientes},
                ${data.strEquipTrabEstruct},
                ${data.strEmprFormaAcuerNormLab},
                ${data.strPlaneaEstraEmpPlanPlani},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                ${data.strUsuarioActualizacion}
            )

            -- Query que inserta en Diagnostico General

            INSERT INTO tbl_DiagnosticoCompetenciasTecnicas 
            ( 
                intId,
                intIdDiagnostico,
                strRegistroCamaraComercio,
                strDefinineLineasProductoServicios,
                strLineaProductoServicioDestacada,
                strProductoServiciosNuevosUltimoAño,
                strListaProductoServiciosNuevosUltimoAño,
                strProductoServiciosEnValidacion,
                strNivelDlloProductoServicios,
                strEtapaValidProductoServicios,
                strPromedioVentas6Meses,
                strRangoVentas,
                strEscojaProductoServicio,
                ValorVentaProductoEscogido,
                strConoceMargenRentaProductoEscogido,
                strConoceCostosProduccionProductoEscogido,
                CostoProduccionProductoEscogido,
                intPorcentajeMargenRentaProductoEscogido,
                strRangoEmpleados,
                strEtapaDllo,
                dtmFechaSesion,
                strUsuarioCreacion,
                dtmActualizacion,
                strUsuarioActualizacion
            )
            VALUES 
            (
                ${data.intIdDiagnostico},
                ${data.strRegistroCamaraComercio},
                ${data.strDefinineLineasProductoServicios},
                ${data.strLineaProductoServicioDestacada},
                ${data.strProductoServiciosNuevosUltimoAño},
                ${data.strListaProductoServiciosNuevosUltimoAño},
                ${data.strProductoServiciosEnValidacion},
                ${data.strNivelDlloProductoServicios},
                ${data.strEtapaValidProductoServicios},
                ${data.strPromedioVentas6Meses},
                ${data.strRangoVentas},
                ${data.strEscojaProductoServicio},
                ${data.ValorVentaProductoEscogido},
                ${data.strConoceMargenRentaProductoEscogido},
                ${data.strConoceCostosProduccionProductoEscogido},
                ${data.CostoProduccionProductoEscogido},
                ${data.intPorcentajeMargenRentaProductoEscogido},
                ${data.strRangoEmpleados},
                ${data.strEtapaDllo},
                GETDATE(),
                ${data.strUsuarioCreacion},
                NULL,
                ${data.strUsuarioActualizacion}
            )
            
            SET @intId = SCOPE_IDENTITY();`;

            let result = {
                error: false,
                msg: `El diagnostico Express, fue registrado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setDiagnosticoExpress de la clase daoDiagnosticoExpress",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateDiagnosticoExpress(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_DiagnosticoExpress

            SET strUbicacionVivienda                      = COALESCE(${data.strUbicacionVivienda}, strUbicacionVivienda),
                strTrabajanFamiliares                     = COALESCE(${data.strTrabajanFamiliares}, strTrabajanFamiliares),
                strCabezaHogar                            = COALESCE(${data.strCabezaHogar}, strCabezaHogar),
                intNumPersonasCargo                       = COALESCE(${data.intNumPersonasCargo}, intNumPersonasCargo),
                intHijos                                  = COALESCE(${data.intHijos}, intHijos),
                intHijosEstudiando                        = COALESCE(${data.intHijosEstudiando}, intHijosEstudiando),
                strmaxNivelEducativoHijos                 = COALESCE(${data.strmaxNivelEducativoHijos}, strmaxNivelEducativoHijos),
                strEstadoCivil                            = COALESCE(${data.strEstadoCivil}, strEstadoCivil),
                strSituacionVivienda                      = COALESCE(${data.strSituacionVivienda}, strSituacionVivienda),
                strGrupoVulnerable                        = COALESCE(${data.strGrupoVulnerable}, strGrupoVulnerable),
                strPoblacionEtnica                        = COALESCE(${data.strPoblacionEtnica}, strPoblacionEtnica),
                intAñoInicioOperacion                     = COALESCE(${data.intAñoInicioOperacion}, intAñoInicioOperacion),
                strUbicacionUP                            = COALESCE(${data.strUbicacionUP}, strUbicacionUP),
                strRegistroCamaraComercio                 = COALESCE(${data.strRegistroCamaraComercio}, strRegistroCamaraComercio),
                strDefinineLineasProductoServicios        = COALESCE(${data.strDefinineLineasProductoServicios}, strDefinineLineasProductoServicios),
                strLineaProductoServicioDestacada         = COALESCE(${data.strLineaProductoServicioDestacada}, strLineaProductoServicioDestacada),
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
                strPromedioVentas6Meses                   = COALESCE(${data.strPromedioVentas6Meses}, strPromedioVentas6Meses),
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
                ValorGananciasMes                         = COALESCE(${data.ValorGananciasMes}, ValorGananciasMes),
                strActivos                                = COALESCE(${data.strActivos}, strActivos),
                ValorActivos                              = COALESCE(${data.ValorActivos}, ValorActivos),
                strEtapaDllo                              = COALESCE(${data.strEtapaDllo}, strEtapaDllo),
                strConclusiones                           = COALESCE(${data.strConclusiones}, strConclusiones),
                strURLSFotosProducto                      = COALESCE(${data.strURLSFotosProducto}, strURLSFotosProducto),
                strLugarSesion                            = COALESCE(${data.strLugarSesion}, strLugarSesion)
                strUsuarioActualizacion                   = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                dtmActualizacion                          = COALESCE(GETDATE(), dtmActualizacion)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_DiagnosticoExpress WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El diagnostico Express, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateDiagnosticoExpress de la clase daoDiagnosticoExpress",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateEmpresarioDiagnosticoExpress(data) {
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
                strDepartamento          = COALESCE(${data.arrDepartamento}, strDepartamento),
                strCiudad                = COALESCE(${data.arrCiudad}, strCiudad),
                strBarrio                = COALESCE(${data.strBarrio}, strBarrio),
                strDireccionResidencia   = COALESCE(${data.strDireccionResidencia}, strDireccionResidencia),
                strUrlFileFoto           = COALESCE(${data.strURLFileFoto}, strUrlFileFoto),
                dtmActualizacion         = COALESCE(GETDATE(), dtmActualizacion),
                strUsuario               = COALESCE(${data.strUsuario}, strUsuario)

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
                    "Error en el metodo updateEmpresario de la clase daoDiagnosticoExpress",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateEmpresaDiagnosticoExpress(data) {

        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_InfoEmpresa

            SET strNombreMarca                    = COALESCE(${data.strUnidadProductiva}, strNombreMarca),
                strLugarOperacion                 = COALESCE(${data.strLugarOperacion}, strLugarOperacion),
                strDepartamento                   = COALESCE(${data.arrDepartamento}, strDepartamento),
                strCiudad                         = COALESCE(${data.arrCiudad}, strCiudad),
                strBarrio                         = COALESCE(${data.strBarrio}, strBarrio),
                strDireccionResidencia            = COALESCE(${data.strDireccionResidencia}, strDireccionResidencia),
                strSectorEconomico                = COALESCE(${data.strSectorEconomico}, strSectorEconomico),
                strCategoriaProducto              = COALESCE(${data.strCategoriaProducto}, strCategoriaProducto),
                strCategoriaServicio              = COALESCE(${data.strCategoriaServicio}, strCategoriaServicio),
                strCategoriasSecundarias          = COALESCE(${data.arrCategoriasSecundarias}, strCategoriasSecundarias),
                strOtraCategoria                  = COALESCE(${data.strOtraCategoria}, strOtraCategoria),
                strDescProductosServicios         = COALESCE(${data.strDescProductosServicios}, strDescProductosServicios),
                strTiempoDedicacion               = COALESCE(${data.strTiempoDedicacion}, strTiempoDedicacion),
                btGeneraEmpleo                    = COALESCE(${data.btGeneraEmpleo}, btGeneraEmpleo),
                intNumeroEmpleados                = COALESCE(${data.intNumeroEmpleados}, intNumeroEmpleados),
                valorVentasMes                    = COALESCE(${data.dblValorVentasMes}, valorVentasMes),
                strMediosDigitales                = COALESCE(${data.arrMediosDigitales}, strMediosDigitales),
                dtmActualizacion                  = COALESCE(GETDATE(), dtmActualizacion),
                strUsuario                        = COALESCE(${data.strUsuario}, strUsuario)

            WHERE intIdEmpresario = ${data.intIdEmpresario}

            SELECT * FROM tbl_InfoEmpresa WHERE intIdEmpresario = ${data.intIdEmpresario}`;

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
                    "Error en el metodo updateEmpresa de la clase daoDiagnosticoExpress",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteDiagnosticoExpress(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_DiagnosticoExpress WHERE intIdEmpresario = ${data.intId}`;

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
                    "Error en el metodo deleteDiagnosticoExpress de la clase daoDiagnosticoExpress",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getDiagnosticoExpress(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            FROM tbl_DiagnosticoExpress

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
                    "Error en el metodo getComentario de la clase daoDiagnosticoExpress",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoDiagnosticoExpress;
