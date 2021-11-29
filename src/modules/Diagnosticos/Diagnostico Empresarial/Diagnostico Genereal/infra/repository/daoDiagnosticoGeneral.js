//Librerias
const validator = require("validator").default;
const sql = require("mssql");

//Conexion
const { conexion } = require("../../../../../../common/config/confSQL_connectionTransfroma");

class daoDiagnosticoGeneral {
    async setDiagnosticoGeneral(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_DiagnosticoGeneral VALUES
            (
                ${data.intIdEmpresario},
                ${data.strUbicacionVivienda},
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
                ${data.strPromedioVentas6Meses},
                ${data.strRangoVentas},
                ${data.strRangoEmpleados},
                ${data.strTipoEmpleoGenerado},
                ${data.strDlloAcitividadesContratados},
                ${data.strPromedioTiempoInvertido},
                ${data.strRolesEmprendimiento},
                ${data.strDiasProduccion},
                ${data.strGeneraEmpleoRiesgoPobreza},
                ${data.valorGananciasMes},
                ${data.strActivos},
                ${data.ValorActivos},
                null,
                ${data.strConclusiones},
                ${data.strURLSFotosProducto},
                ${data.strLugarSesion},
                ${data.dtmFechaSesion},
                ${data.strUsuarioCreacion},
                GETDATE(),
                ${data.strUsuarioActualizacion},
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
                strDepartamento          = COALESCE(${data.arrDepartamento}, strDepartamento),
                strCiudad                = COALESCE(${data.arrCiudad}, strCiudad),
                strBarrio                = COALESCE(${data.strBarrio}, strBarrio),
                strDireccionResidencia   = COALESCE(${data.strDireccionResidencia}, strDireccionResidencia),
                strUrlFileFoto           = COALESCE(${data.strURLFileFoto}, strUrlFileFoto),
                dtmActualizacion         = COALESCE(GETDATE(), dtmActualizacion),
                strUsuario               = COALESCE(${data.strUsuario}, strUsuario)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_Empresario WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La persona ${response.recordset[0].strNombres} ${response.recordset[0].strApellidos}, fue actualizada con éxito.`,
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

    async updateEmpresaDiagnosticoGeneral(data){
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
                data: response.recordset[0]
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

    async deleteComentario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_DiagnosticoGeneral WHERE intId = ${data.intId}`;

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
                    "Error en el metodo deleteComentario de la clase daoDiagnosticoGeneral",
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
            AND   (intIdEmpresario = ${data.intIdEmpresario} OR ${data.intIdEmpresario} IS NULL) `;

            let arrNewData = response.recordsets[0];

            for (let i = 0; i < arrNewData.length; i++) {
                if (arrNewData[i].objRespuesta) {
                    let { objRespuesta } = arrNewData[i];

                    if (validator.isJSON(objRespuesta)) {
                        objRespuesta = JSON.parse(objRespuesta);
                        arrNewData[i].objRespuesta = objRespuesta;
                    }
                }
            }

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
                    "Error en el metodo getComentario de la clase daoDiagnosticoGeneral",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoDiagnosticoGeneral;
