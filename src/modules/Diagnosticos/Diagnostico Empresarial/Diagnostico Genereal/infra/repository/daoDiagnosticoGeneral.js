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
                ${data.btCabezaHogar},
                ${data.intNumPersonasCargo},
                ${data.intHijos},
                ${data.intHijosEstudiando},
                ${data.strMaxNivelEducativoHijos},
                ${data.strEstadoCivil},
                ${data.strSituacionVivienda},
                ${data.strGrupoVulnerable},
                ${data.strPoblacionEtnica},
                ${data.strComoNaceEmpresa},
                ${data.strComoSueñaEmpresa},
                ${data.btAprendizajeEmprendimiento},
                ${data.btExperienciaTipoEmprendimiento},
                ${data.strTipoContribuyente},
                ${data.strNumRut_Nit},
                ${data.btIngresosPresupuestoFamiliar},
                ${data.strNucleoFamiliarOtrosIngresos},
                ${data.btProduccionVentas6meses},
                ${data.strEtapaLaboracionProducto},
                ${data.strPromedioVenta6meses},
                ${data.ValorVentasMes},
                ${data.strRangoVentas},
                ${data.intNumEmpleosGenerados},
                ${data.strRangoEmpleados},
                ${data.strTipoEmpleo},
                ${data.strActividadesEmpleados},
                ${data.strTiempoEmpresarioEmprendimientoDia},
                ${data.strRolesEmpresarioEmprendimiento},
                ${data.strHorasEmpresarioProduccionDia},
                ${data.strGeneraEmpleoPersonasPobreza_ExclusionSocial},
                ${data.ValorGananciasMes},
                ${data.strActivos},
                ${data.strEtapaDllo},
                ${data.strConclusiones},
                ${data.strUrlFileRegistroFotoProducto},
                ${data.strLugarSesion},
                GETDATE(),
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

            SET btCabezaHogar                                  = COALESCE(${data.btCabezaHogar}, btCabezaHogar),
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
                    "Error en el metodo deleteComentario de la clase daoComentarios",
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
                    "Error en el metodo getComentario de la clase daoComentarios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoDiagnosticoGeneral;
