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
                intIdEmpresario,
                intIdTipoEmpresario,
                btFinalizado,
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
                ${data.intIdEmpresario},
                ${data.intIdTipoEmpresario},
                ${data.btFinalizado},
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
                intIdEmpresario,
                intIdTipoEmpresario,
                btFinalizado,
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
                ${data.intIdEmpresario},
                ${data.intIdTipoEmpresario},
                ${data.btFinalizado},
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
                intIdEmpresario,
                intTipoEmpresario,
                btFinalizado,
                strUniProdSosFinan,
                strTieneBaseDatosClientes,
                strActivIncreVentClient,
                strPlanAtraccionRelacionamientoFidelizacionClientes,
                strEquipTrabEstruct,
                PrecProdServDef,
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
                ${data.intIdEmpresario},
                ${data.intIdTipoEmpresario},
                ${data.btFinalizado},
                ${data.strUniProdSosFinan},
                ${data.strTieneBaseDatosClientes},
                ${data.strActivIncreVentClient},
                ${data.strPlanAtraccionRelacionamientoFidelizacionClientes},
                ${data.strEquipTrabEstruct},
                ${data.strPrecProdServ},
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
                btFinalizado,
                strRegistroCamaraComercio,
                strOperacionesVentas6Meses,
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
                strOtrosCanalesCrecimiento,
                strCualesCanalesCrecimiento,
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
                ${data.btFinalizado},
                ${data.strRegistroCamaraComercio},
                ${data.strOperacionesVentas6Meses},
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
                ${data.strOtrosCanalesCrecimiento},
                ${data.strCualesCanalesCrecimiento},
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

            await conn.query`
            UPDATE tbl_DiagnosticoHumanoSocial
            
            SET 
                strHabilidadesAutonomia = COALESCE(${data.strHabilidadesAutonomia}, strHabilidadesAutonomia),
                strHabilidadesCapacidad = COALESCE(${data.strHabilidadesCapacidad}, strHabilidadesCapacidad),
                strHabilidadesComunicacion = COALESCE(${data.strHabilidadesComunicacion}, strHabilidadesComunicacion),
                strHabilidadesCreatividad = COALESCE(${data.strHabilidadesCreatividad}, strHabilidadesCreatividad),
                strTomaDesiciones = COALESCE(${data.strTomaDesiciones}, strTomaDesiciones),
                strConfianza = COALESCE(${data.strConfianza}, strConfianza),
                dtmActualizacion = COALESCE(GETDATE(), dtmActualizacion),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion)
            WHERE intIdDiagnostico = ${data.intIdDiagnostico}; 
            
            UPDATE tbl_DiagnosticoProductos
            SET 
                strPermisoFuncionamiento = COALESCE(${data.strPermisoFuncionamiento}, strPermisoFuncionamiento),
                strCertificadosRequeridos = COALESCE(${data.strCertificadosRequeridos}, strCertificadosRequeridos),
                strCertificadosActuales = COALESCE(${data.strCertificadosActuales}, strCertificadosActuales),
                strPatentesUtilidad = COALESCE(${data.strPatentesUtilidad}, strPatentesUtilidad),
                strCualPatenteUtilidad = COALESCE(${data.strCualPatenteUtilidad}, strCualPatenteUtilidad),
                strRegistroMarca = COALESCE(${data.strRegistroMarca}, strRegistroMarca),
                strIdentidadMarca = COALESCE(${data.strIdentidadMarca}, strIdentidadMarca),
                strComunicacionMarca = COALESCE(${data.strComunicacionMarca}, strComunicacionMarca),
                strUsuarioCreacion = COALESCE(${data.strUsuarioCreacion}, strUsuarioCreacion),
                dtmActualizacion = COALESCE(GETDATE(), dtmActualizacion),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion)
            WHERE intIdDiagnostico = ${data.intIdDiagnostico}; 
            

            UPDATE tbl_DiagnosticoCompetenciasTecnicas
            SET 
                strUniProdSosFinan = COALESCE(${data.strUniProdSosFinan}, strUniProdSosFinan),
                strTieneBaseDatosClientes = COALESCE(${data.strTieneBaseDatosClientes}, strTieneBaseDatosClientes),
                strActivIncreVentClient = COALESCE(${data.strActivIncreVentClient}, strActivIncreVentClient),
                strPlanAtraccionRelacionamientoFidelizacionClientes = COALESCE(${data.strPlanAtraccionRelacionamientoFidelizacionClientes}, strPlanAtraccionRelacionamientoFidelizacionClientes),
                strEquipTrabEstruct = COALESCE(${data.strEquipTrabEstruct}, strEquipTrabEstruct),
                PrecProdServDef = COALESCE(${data.strPrecProdServ}, PrecProdServDef),
                strEmprFormaAcuerNormLab = COALESCE(${data.strEmprFormaAcuerNormLab}, strEmprFormaAcuerNormLab),
                strPlaneaEstraEmpPlanPlani = COALESCE(${data.strPlaneaEstraEmpPlanPlani}, strPlaneaEstraEmpPlanPlani),
                dtmActualizacion = COALESCE(GETDATE(), dtmActualizacion),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion)
            WHERE intIdDiagnostico = ${data.intIdDiagnostico}; 
            
            UPDATE tbl_DiagnosticoGeneral
            SET 
                intIdDiagnostico = COALESCE(${data.intIdDiagnostico}, intIdDiagnostico),
                intIdEmpresario = COALESCE(${data.intIdEmpresario}, intIdEmpresario),
                intIdTipoEmpresario = COALESCE(${data.intIdTipoEmpresario}, intIdTipoEmpresario),
                strRegistroCamaraComercio = COALESCE(${data.strRegistroCamaraComercio}, strRegistroCamaraComercio),
                strOperacionesVentas6Meses = COALESCE(${data.strOperacionesVentas6Meses}, strOperacionesVentas6Meses),
                strDefinineLineasProductoServicios = COALESCE(${data.strDefinineLineasProductoServicios}, strDefinineLineasProductoServicios),
                strLineaProductoServicioDestacada = COALESCE(${data.strLineaProductoServicioDestacada}, strLineaProductoServicioDestacada),
                strProductoServiciosNuevosUltimoAño = COALESCE(${data.strProductoServiciosNuevosUltimoAño}, strProductoServiciosNuevosUltimoAño),
                strListaProductoServiciosNuevosUltimoAño = COALESCE(${data.strListaProductoServiciosNuevosUltimoAño}, strListaProductoServiciosNuevosUltimoAño),
                strProductoServiciosEnValidacion = COALESCE(${data.strProductoServiciosEnValidacion}, strProductoServiciosEnValidacion),
                strNivelDlloProductoServicios = COALESCE(${data.strNivelDlloProductoServicios}, strNivelDlloProductoServicios),
                strEtapaValidProductoServicios = COALESCE(${data.strEtapaValidProductoServicios}, strEtapaValidProductoServicios),
                PromedioVentas6Meses = COALESCE(${data.PromedioVentas6Meses}, PromedioVentas6Meses),
                strRangoVentas = COALESCE(${data.strRangoVentas}, strRangoVentas),
                strEscojaProductoServicio = COALESCE(${data.strEscojaProductoServicio}, strEscojaProductoServicio),
                ValorVentaProductoEscogido = COALESCE(${data.ValorVentaProductoEscogido}, ValorVentaProductoEscogido),
                strConoceMargenRentaProductoEscogido = COALESCE(${data.strConoceMargenRentaProductoEscogido}, strConoceMargenRentaProductoEscogido),
                strConoceCostosProduccionProductoEscogido = COALESCE(${data.strConoceCostosProductoEscogido}, strConoceCostosProduccionProductoEscogido),
                CostoProduccionProductoEscogido = COALESCE(${data.CostoProduccionProductoEscogido}, CostoProduccionProductoEscogido),
                intPorcentajeMargenRentaProductoEscogido = COALESCE(${data.intPorcentajeMargenRentaProductoEscogido}, intPorcentajeMargenRentaProductoEscogido),
                strRangoEmpleados = COALESCE(${data.strRangoEmpleados}, strRangoEmpleados),
                strOtrosCanalesCrecimiento = COALESCE(${data.strOtrosCanalesCrecimiento}, strOtrosCanalesCrecimiento),
                strCualesCanalesCrecimiento = COALESCE(${data.strCualesCanalesCrecimiento}, strCualesCanalesCrecimiento),
                strEtapaDllo = COALESCE(${data.strEtapaDllo}, strEtapaDllo),
                strLugarSesion = COALESCE(${data.strLugarSesion}, strLugarSesion),
                dtmActualizacion = COALESCE(GETDATE(), dtmActualizacion),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion)
            WHERE intIdDiagnostico = ${data.intIdDiagnostico}; 
                `;

            let result = {
                error: false,
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
                strCategoriasSecundarias  = COALESCE(${data.strCategoriasSecundarias}, strCategoriasSecundarias),
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

    async updateFinalizarDiagnosticoExpress(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            
            await conn.query`

                UPDATE tbl_DiagnosticoCompetenciasTecnicas

                SET btFinalizado            = COALESCE(${data.btFinalizado}, btFinalizado),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion)

                WHERE intIdDiagnostico = ${data.intIdDiagnostico}

                UPDATE tbl_DiagnosticoProductos

                SET btFinalizado            = COALESCE(${data.btFinalizado}, btFinalizado),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion)

                WHERE intIdDiagnostico = ${data.intIdDiagnostico}

                UPDATE tbl_DiagnosticoHumanoSocial

                SET btFinalizado            = COALESCE(${data.btFinalizado}, btFinalizado),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion)

                WHERE intIdDiagnostico = ${data.intIdDiagnostico}

                UPDATE tbl_DiagnosticoGeneral

                SET btFinalizado            = COALESCE(${data.btFinalizado}, btFinalizado),
                    strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                    dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion)

                WHERE intIdDiagnostico = ${data.intIdDiagnostico}
            
            `;

            let result = {
                error: false,
                msg: `El diagnostico Express, fue finalizado con éxito.`,
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

    async getDiagnosticoExpress(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT

            intIdDiagnostico,
            intIdEmpresario,
            intIdTipoEmpresario,
            btFinalizado,
            strRegistroCamaraComercio,
            strOperacionesVentas6Meses,
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
            intMargenRentabilidad,
            strOtrosCanalesCrecimiento,
            strCualesCanalesCrecimiento,
            strLugarSesion,
            dtmFechaSesion,
            strUsuarioCreacion,
            dtmActualizacion,
            strUsuarioActualizacion

            FROM tbl_DiagnosticoGeneral

            WHERE (intIdDiagnostico = ${data.intIdDiagnostico})
    

            SELECT 

            strUniProdSosFinan,
            strTieneBaseDatosClientes,
            strActivIncreVentClient,
            strPlanAtraccionRelacionamientoFidelizacionClientes,
            strEquipTrabEstruct,
            PrecProdServDef,
            strEmprFormaAcuerNormLab,
            strPlaneaEstraEmpPlanPlani

            FROM tbl_DiagnosticoCompetenciasTecnicas

            WHERE (intIdDiagnostico = ${data.intIdDiagnostico})
            

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

            WHERE (intIdDiagnostico = ${data.intIdDiagnostico})


            SELECT

            strHabilidadesAutonomia,
            strHabilidadesCapacidad,
            strHabilidadesComunicacion,
            strHabilidadesCreatividad,
            strTomaDesiciones,
            strConfianza

            FROM tbl_DiagnosticoHumanoSocial

            WHERE (intIdDiagnostico = ${data.intIdDiagnostico})`;

            let arrNewData = [{
                ...response.recordsets[0][0],
                ...response.recordsets[1][0],
                ...response.recordsets[2][0],
                ...response.recordsets[3][0]
            }];

            let result = {
                error: false,
                data: arrNewData
                    ? arrNewData[0]?.hasOwnProperty("intIdDiagnostico")
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
