//Librerias
const sql = require("mssql");

//Conexion
const {
    conexion,
} = require("../../../../../common/config/confSQL_connectionTransfroma");

class daoDiagnosticoExpress {
    async setDiagnosticoExpress(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`
            DECLARE @intId INTEGER;

            -- Query que inserta en Diagnostico HumanoSocial

            INSERT INTO tbl_DiagnosticoHumanoSocial 
            ( 
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

            SET @intId = SCOPE_IDENTITY();`

            await conn.query`
            -- Query que inserta en Diagnostico Producto

            DECLARE @intId INTEGER;

            INSERT INTO tbl_DiagnosticoProductos 
            ( 
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
            
            SET @intId = SCOPE_IDENTITY();`

            await conn.query`
            -- Query que inserta en Diagnostico CompTecnicas

            DECLARE @intId INTEGER;

            INSERT INTO tbl_DiagnosticoCompetenciasTecnicas 
            ( 
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

            SET @intId = SCOPE_IDENTITY();`
            
            await conn.query`
            -- Query que inserta en Diagnostico General

            DECLARE @intId INTEGER;

            INSERT INTO tbl_DiagnosticoGeneral 
            ( 
                intIdDiagnostico,
                intIdEmpresario,
                intIdTipoEmpresario,
                strRegistroCamaraComercio,
                strDefinineLineasProductoServicios,
                strLineaProductoServicioDestacada,
                strProductoServiciosNuevosUltimoAño,
                strListaProductoServiciosNuevosUltimoAño,
                strProductoServiciosEnValidacion,
                strNivelDlloProductoServicios,
                strEtapaValidProductoServicios,
                PromedioVentas6Meses,
                strRangoVentas,
                strEscojaProductoServicio,
                ValorVentaProductoEscogido,
                strConoceMargenRentaProductoEscogido,
                strConoceCostosProduccionProductoEscogido,
                CostoProduccionProductoEscogido,
                intPorcentajeMargenRentaProductoEscogido,
                strRangoEmpleados,
                strEtapaDllo,
                strLugarSesion,
                dtmFechaSesion,
                strUsuarioCreacion,
                dtmActualizacion,
                strUsuarioActualizacion
            )
            VALUES 
            (
                ${data.intIdDiagnostico},
                ${data.intIdEmpresario},
                ${data.intIdTipoEmpresario},
                ${data.strRegistroCamaraComercio},
                ${data.strDefinineLineasProductoServicios},
                ${data.strLineaProductoServicioDestacada},
                ${data.strProductoServiciosNuevosUltimoAño},
                ${data.strListaProductoServiciosNuevosUltimoAño},
                ${data.strProductoServiciosEnValidacion},
                ${data.strNivelDlloProductoServicios},
                ${data.strEtapaValidProductoServicios},
                ${data.PromedioVentas6Meses},
                ${data.strRangoVentas},
                ${data.strEscojaProductoServicio},
                ${data.ValorVentaProductoEscogido},
                ${data.strConoceMargenRentaProductoEscogido},
                ${data.strConoceCostosProductoEscogido},
                ${data.CostoProduccionProductoEscogido},
                ${data.intPorcentajeMargenRentaProductoEscogido},
                ${data.strRangoEmpleados},
                ${data.strEtapaDllo},
                ${data.strLugarSesion},
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

    async updateEmpresaDiagnosticoExpress(data) {

        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_InfoEmpresa

            SET strNombreMarca            = COALESCE(${data.strUnidadProductiva}, strNombreMarca),
                strLugarOperacion         = COALESCE(${data.strLugarOperacion}, strLugarOperacion),
                strFormasComercializacion = COALESCE(${data.strFormasComercializacion}, strFormasComercializacion),
                strMediosDigitales        = COALESCE(${data.strMediosDigitales}, strMediosDigitales),
                strTiempoDedicacion       = COALESCE(${data.strTiempoDedicacion}, strTiempoDedicacion),
                strSectorEconomico        = COALESCE(${data.strSectorEconomico}, strSectorEconomico),
                strCategoriaProducto      = COALESCE(${data.strCategoriaProducto}, strCategoriaProducto),
                strCategoriaServicio      = COALESCE(${data.strCategoriaServicio}, strCategoriaServicio),
                strCategoriasSecundarias  = COALESCE(${data.arrCategoriasSecundarias}, strCategoriasSecundarias),
                strDescProductosServicios = COALESCE(${data.strDescProductosServicios}, strDescProductosServicios),
                btGeneraEmpleo            = COALESCE(${data.btGeneraEmpleo}, btGeneraEmpleo),
                valorVentasMes            = COALESCE(${data.dblValorVentasMes}, valorVentasMes),
                intNumeroEmpleados        = COALESCE(${data.intNumeroEmpleados}, intNumeroEmpleados),
                dtmActualizacion          = COALESCE(GETDATE(), dtmActualizacion),
                strUsuarioActualizacion   = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion)

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
                    "Error en el metodo updateEmpresa de la clase daoDiagnosticoExpress",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getDiagnosticoExpress(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT

            intIdDiagnostico,
            intIdEmpresario,
            intIdTipoEmpresario,
            strRegistroCamaraComercio,
            strDefinineLineasProductoServicios,
            strLineaProductoServicioDestacada,
            strProductoServiciosNuevosUltimoAño,
            strListaProductoServiciosNuevosUltimoAño,
            strProductoServiciosEnValidacion,
            strNivelDlloProductoServicios,
            strEtapaValidProductoServicios,
            PromedioVentas6Meses,
            strRangoVentas,
            strEscojaProductoServicio,
            ValorVentaProductoEscogido,
            strConoceMargenRentaProductoEscogido,
            strConoceCostosProduccionProductoEscogido,
            CostoProduccionProductoEscogido,
            intPorcentajeMargenRentaProductoEscogido,
            strRangoEmpleados,
            strEtapaDllo,
            strLugarSesion,
            dtmFechaSesion,
            strUsuarioCreacion,
            dtmActualizacion,
            strUsuarioActualizacion

            FROM tbl_DiagnosticoGeneral

            WHERE (intIdDiagnostico = ${data.intIdDiagnostico} OR ${data.intIdDiagnostico} IS NULL)
    

            SELECT 

            strUniProdSosFinan,
            strTieneBaseDatosClientes,
            strActivIncreVentClient,
            strPlanAtraccionRelacionamientoFidelizacionClientes,
            strEquipTrabEstruct,
            strEmprFormaAcuerNormLab,
            strPlaneaEstraEmpPlanPlani

            FROM tbl_DiagnosticoCompetenciasTecnicas

            WHERE (intIdDiagnostico = ${data.intIdDiagnostico} OR ${data.intIdDiagnostico} IS NULL)
            

            SELECT

            strPermisoFuncionamiento,
            strCertificadosRequeridos,
            strCertificadosActuales,
            strPatentesUtilidad,
            strCualPatenteUtilidad,
            strRegistroMarca,
            strIdentidadMarca,
            strComunicacionMarca

            FROM tbl_DiagnosticoProductos

            WHERE (intIdDiagnostico = ${data.intIdDiagnostico} OR ${data.intIdDiagnostico} IS NULL)


            SELECT

            strHabilidadesAutonomia,
            strHabilidadesCapacidad,
            strHabilidadesComunicacion,
            strHabilidadesCreatividad,
            strTomaDesiciones,
            strConfianza

            FROM tbl_DiagnosticoHumanoSocial

            WHERE (intIdDiagnostico = ${data.intIdDiagnostico} OR ${data.intIdDiagnostico} IS NULL)`;

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
                    "Error en el metodo getDiagnosticoExpress de la clase daoDiagnosticoExpress",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoDiagnosticoExpress;
