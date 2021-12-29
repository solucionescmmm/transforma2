//Librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const { conexion } = require("../../../../../../common/config/confSQL_connectionTransfroma");

class daoDiagnosticoProducto {
    async setDiagnosticoProducto(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_DiagnosticoProductos VALUES
            (
                ${data.intIdEmpresario},
                ${data.strCategoriaProductos},
                ${data.strProductos},
                ${data.strFuncionalidad},
                ${data.strFuncionalidadDetalle},
                ${data.strFuncionalidadNivel},
                ${data.strMetodologia},
                ${data.strMetodologiaDetalle},
                ${data.strMetodologiaNivel},
                ${data.strRenovacionPortafolio},
                ${data.strRenovacionPortafolioDetalle},
                ${data.strRenovacionPortafolioNivel},
                ${data.strSostenibilidad},
                ${data.strSostenibilidadDetalle},
                ${data.strSostenibilidadNivel},
                ${data.strAtributosValor},
                ${data.strAtributosValorDetalle},
                ${data.strAtributosValorNivel},
                ${data.strUsoMateriales},
                ${data.strUsoMaterialesDetalle},
                ${data.strUsoMaterialesNivel},
                ${data.strMenajoTecnicaAlim},
                ${data.strMenajoTecnicaAlimDetalle},
                ${data.strMenajoTecnicaAlimNivel},
                ${data.strProcesosPreparacion},
                ${data.strProcesosPreparacionDetalle},
                ${data.strProcesosPreparacionNivel},
                ${data.strPresentacionApariencia},
                ${data.strPresentacionAparienciaDetalle},
                ${data.strPresentacionAparienciaNivel},
                ${data.strProporcionAlim},
                ${data.strProporcionAlimDetalle},
                ${data.strProporcionAlimNivel},
                ${data.strConservacion},
                ${data.strConservacionDetalle},
                ${data.strConservacionNivel},
                ${data.strInocuidad},
                ${data.strInocuidadDetalle},
                ${data.strInocuidadNivel},
                ${data.strEmpaqueEtiquetaAlim},
                ${data.strEmpaqueEtiquetaAlimDetalle},
                ${data.strMenajoTecnica},
                ${data.strMenajoTecnicaDetalle},
                ${data.strMenajoTecnicaNivel},
                ${data.strAcabadosFactura},
                ${data.strAcabadosFacturaDetalle},
                ${data.strAcabadosFacturaNivel},
                ${data.strDurabilidad},
                ${data.strDurabilidadDetalle},
                ${data.strDurabilidadNivel},
                ${data.strUsoColores},
                ${data.strUsoColoresDetalle},
                ${data.strUsoColoresNivel},
                ${data.strProporcion},
                ${data.strProporcionDetalle},
                ${data.strProporcionNivel},
                ${data.strRiesgoUso},
                ${data.strRiesgoUsoDetalle},
                ${data.strRiesgoUsoNivel},
                ${data.strEmpaqueEtiqueta},
                ${data.strEmpaqueEtiquetaDetalle},
                ${data.strEmpaqueEtiquetaNivel},
                ${data.strUsabilidad},
                ${data.strUsabilidadDetalle},
                ${data.strUsabilidadNivel},
                ${data.strDiseñoExperiencia},
                ${data.strDiseñoExperienciaDetalle},
                ${data.strDiseñoExperienciaNivel},
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
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_DiagnosticoProductos WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El diagnostico de producto, fue registrado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            console.log(error)
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setDiagnosticoProductos de la clase daoDiagnosticoProductos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateDiagnosticoProducto(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_DiagnosticoProductos

            SET strUbicacionVivienda                           = COALESCE(${data.strUbicacionVivienda}, strUbicacionVivienda),
                intNumPersonasCargo                            = COALESCE(${data.intNumPersonasCargo}, intNumPersonasCargo),
                intHijos                                       = COALESCE(${data.intHijos}, intHijos),
                intHijosEstudiando                             = COALESCE(${data.intHijosEstudiando}, intHijosEstudiando),
                strMaxNivelEducativoHijos                      = COALESCE(${data.strMaxNivelEducativoHijos}, strMaxNivelEducativoHijos),
                strEstadoCivil                                 = COALESCE(${data.strEstadoCivil}, strEstadoCivil),
                strSituacionVivienda                           = COALESCE(${data.strSituacionVivienda}, strSituacionVivienda),
                strGrupoVulnerable                             = COALESCE(${data.strGrupoVulnerable}, strGrupoVulnerable),
                strPoblacionEtnica                             = COALESCE(${data.strPoblacionEtnica}, strPoblacionEtnica),
                strComoNaceEmpresa                             = COALESCE(${data.strComoNaceEmpresa}, strComoNaceEmpresa),
                strComoSueñaEmpresa                            = COALESCE(${data.strComoSueñaEmpresa}, strComoSueñaEmpresa),
                btAprendizajeEmprendimiento                    = COALESCE(${data.btAprendizajeEmprendimiento}, btAprendizajeEmprendimiento),
                btExperienciaTipoEmprendimiento                = COALESCE(${data.btExperienciaTipoEmprendimiento}, btExperienciaTipoEmprendimiento),
                strTipoContribuyente                           = COALESCE(${data.strTipoContribuyente}, strTipoContribuyente),
                strNumRut_Nit                                  = COALESCE(${data.strNumRut_Nit}, strNumRut_Nit),
                btIngresosPresupuestoFamiliar                  = COALESCE(${data.btIngresosPresupuestoFamiliar}, btIngresosPresupuestoFamiliar),
                strNucleoFamiliarOtrosIngresos                 = COALESCE(${data.strNucleoFamiliarOtrosIngresos}, strNucleoFamiliarOtrosIngresos),
                btProduccionVentas6meses                       = COALESCE(${data.btProduccionVentas6meses}, btProduccionVentas6meses),
                ValorVentasMes                                 = COALESCE(${data.ValorVentasMes}, ValorVentasMes),
                strRangoVentas                                 = COALESCE(${data.strRangoVentas}, strRangoVentas),
                intNumEmpleosGenerados                         = COALESCE(${data.intNumEmpleosGenerados}, intNumEmpleosGenerados),
                strRangoEmpleados                              = COALESCE(${data.strRangoEmpleados}, strRangoEmpleados),
                strTipoEmpleo                                  = COALESCE(${data.strTipoEmpleo}, strTipoEmpleo),
                strActividadesEmpleados                        = COALESCE(${data.strActividadesEmpleados}, strActividadesEmpleados),
                strTiempoEmpresarioEmprendimientoDia           = COALESCE(${data.strTiempoEmpresarioEmprendimientoDia}, strTiempoEmpresarioEmprendimientoDia),
                strRolesEmpresarioEmprendimiento               = COALESCE(${data.strRolesEmpresarioEmprendimiento}, strRolesEmpresarioEmprendimiento),
                strHorasEmpresarioProduccionDia                = COALESCE(${data.strHorasEmpresarioProduccionDia}, strHorasEmpresarioProduccionDia),
                strGeneraEmpleoPersonasPobreza_ExclusionSocial = COALESCE(${data.strGeneraEmpleoPersonasPobreza_ExclusionSocial}, strGeneraEmpleoPersonasPobreza_ExclusionSocial),
                ValorGananciasMes                              = COALESCE(${data.ValorGananciasMes}, ValorGananciasMes),
                strActivos                                     = COALESCE(${data.strActivos}, strActivos),
                strEtapaDllo                                   = COALESCE(${data.strEtapaDllo}, strEtapaDllo),
                strConclusiones                                = COALESCE(${data.strConclusiones}, strConclusiones),
                strUrlFileRegistroFotoProducto                 = COALESCE(${data.strUrlFileRegistroFotoProducto}, strUrlFileRegistroFotoProducto),
                strLugarSesion                                 = COALESCE(${data.strLugarSesion}, strLugarSesion),
                strUsuarioActualizacion                        = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                dtmActualizacion                               = COALESCE(GETDATE(), dtmActualizacion)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_DiagnosticoProductos WHERE intId = ${data.intId}`;

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
                    "Error en el metodo updateDiagnosticoProductos de la clase daoDiagnosticoProductos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteDiagnosticoProducto(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_DiagnosticoProductos WHERE intIdEmpresario = ${data.intId}`;

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
                    "Error en el metodo deleteDiagnosticoProductos de la clase daoDiagnosticoProductos",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getDiagnosticoProducto(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            FROM tbl_DiagnosticoProductos

            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)
            AND   (intIdEmpresario = ${data.intIdEmpresario} OR ${data.intIdEmpresario} IS NULL) `;

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
                    "Error en el metodo getDiagnosticoProductos de la clase daoDiagnosticoProductos",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoDiagnosticoProducto;
