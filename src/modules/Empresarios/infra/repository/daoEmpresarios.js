//librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../common/config/confSQL_connectionTransfroma");

class daoEmpresarios {
    async setEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Empresario VALUES
            (
                ${data.strNombres},
                ${data.strApellidos},
                ${data.dtFechaNacimiento},
                ${data.strTipoDocto},
                ${data.strNroDocto},
                ${data.strLugarExpedicionDocto},
                ${data.dtFechaExpedicionDocto},
                ${data.strSexo},
                ${data.strCelular1},
                ${data.strCorreoElectronico1},
                ${data.strNivelEducativo},
                ${data.strTitulos},
                ${data.strCondicionDiscapacidad},
                ${data.strSede},
                ${data.strTipoEmpresario},
                ${data.dtFechaVinculacion},
                ${data.strEstado},
                ${data.strUrlFoto},
                GETDATE(),
                ${data.strUsuario},
                ${data.strEspacioJornada}
            )
            
            SET @intId = SCOPE_IDENTITY();

            SELECT * FROM tbl_Empresario WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La persona ${response.recordset[0].strNombres} ${response.recordset[0].strApellidos}, fue registrado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setEmpresa(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_InfoEmpresa VALUES
            (
                ${data.intId}
                ${data.intIdEmpresario},
                ${data.strUrlLogo},
                ${data.dtFechaFundacion},
                ${data.strUnidadProdOperacion},
                ${data.strDireccion},
                ${data.strMunicipio},
                ${data.strBarrio},
                ${data.intIdSectorEconomico},
                ${data.intEstrato},
                ${data.intIdNombreCategoriaProducto}
                ${data.intIdNombreCategoriaServicio},
                ${data.strOtraCategoria},
                ${data.btGeneraEmpleo},
                ${data.intNumeroEmpleados},
                ${data.valorVentasMes},
                ${data.strMediosUtilizadosVentas},
                ${data.btNombreMarca},
                ${data.btLogotipo},
                ${data.btEtiquetaEmpaque},
                ${data.btMejorarEtiquetaEmpaque},
                ${data.strPrincipalesNecesidades},
                ${data.strRequisitoLey},
                ${data.strOtrosRequisitos},
                ${data.btInteresadoProcesoCMM},
                ${data.strTemasCapacitacion},
                ${data.strComoSeEntero},
                ${data.strOtrosMediosEntero},
                ${data.strMedioDeComunicacion},
                ${data.strOtroMedioComunicacion},
                ${data.btRecibirInfoCMM},
                ${data.strRecomendaciones},
                ${data.strUsuario}

                objInfoEmpresa: {
                    strUrlLogo: null,
                    dtFechaFundacion: '2017-08-16T05:00:00.000Z',
                    strUnidadProdOperacion: 'Local independiente desde la vivienda',
                    strDireccion: 'calle 43A #4322',
                    strMunicipio: 'Bello',
                    strBarrio: 'Niquia',
                    intEstrato: '4',
                    strCategoriaProducto: 'Alimentos y bebidas',
                    strOtraCategoriaProducto: '',
                    arrCategoriaServicio: [],
                    btGeneraEmpleo: true,
                    intNumeroEmpleados: '4',
                    valorVentasMes: '$1,232,222',
                    strMediosUtilizadosVentas: [ [Object] ],
                    btNombreMarca: false,
                    btLogotipo: false,
                    btEtiquetaEmpaque: false,
                    btMejorarEtiquetaEmpaque: true,
                    strPrincipalesNecesidades: '',
                    strRequisitoLey: [ [Object] ],
                    strOtrosRequisitos: '',
                    btInteresadoProcesoCMM: false,
                    strComoSeEntero: [ [Object] ],
                    strOtrosMediosEntero: '',
                    strMedioDeComunicacion: [],
                    btRecibirInfoCMM: false,
                    strRecomendaciones: ''
                  }
            )

            SET @intId = SCOPE_IDENTITY();

            SELECT * FROM tbl_InfoEmpresa WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La empresa #${response.recordset[0].intId} fue registrada con éxito, para el empresario #${response.recordset[0].intIdEmpresario}.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setEmpresa de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setEmprendimiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_InfoEmprendimiento VALUES
            (
                ${data.intIdEmpresario},
                ${data.btTieneSoloIdea},
                ${data.strPlaneaComenzar},
                ${data.strTiempoDedicacion},
                ${data.btGrupoAsociativo},
                ${data.btAsociacionUnidadProdIndividual},
                ${data.strProductosServicios},
                ${data.strMateriaPrima},
                ${data.strNombreTecnica},
                GETDATE(),
                ${data.strUsuario}
            )
            SET @intId = SCOPE_IDENTITY();

            SELECT * FROM tbl_InfoEmprendimiento WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El emprendimiento #${response.recordset[0].intId} fue registrado con éxito, para el empresario #${response.recordset[0].intIdEmpresario}.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setEmprendimiento de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setEmpresarioSecundrio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_EmpresarioSecundario VALUES
            (
                ${data.intIdEmpresarioPrincipal},
                ${data.strNombresApellidos},
                ${data.strSexo},
                ${data.dtFechaNacimiento},
                ${data.strTipoDocto},
                ${data.strNroDocto},
                ${data.strLugarExpedicionDocto},
                ${data.dtFechaExpedicionDocto},
                ${data.strCelular},
                ${data.strCorreoElectronico},
                GETDATE(),
                ${data.strUsuario}
            )
            SET @intId = SCOPE_IDENTITY();

            SELECT * FROM tbl_EmpresarioSecundario WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                //msg: `El emprendimiento #${response.recordset[0].intId} fue registrado con éxito, para el empresario #${response.recordset[0].intIdEmpresario}.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setEmpresarioSecundario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_Empresario

            SET strNombres               = COALESCE(${data.strNombres}, strNombres),
                strApellidos             = COALESCE(${data.strApellidos}, strApellidos),
                dtFechaNacimiento        = COALESCE(${data.dtFechaNacimiento}, dtFechaNacimiento),
                strTipoDocto             = COALESCE(${data.strTipoDocto}, strTipoDocto),
                strNroDocto              = COALESCE(${data.strNroDocto}, strNroDocto),
                strLugarExpedicionDocto  = COALESCE(${data.strLugarExpedicionDocto}, strLugarExpedicionDocto),
                dtFechaExpedicionDocto   = COALESCE(${data.dtFechaExpedicionDocto}, dtFechaExpedicionDocto),
                strSexo                  = COALESCE(${data.strSexo}, strSexo),
                strCelular1              = COALESCE(${data.strCelular1}, strCelular1),
                strCorreoElectronico1    = COALESCE(${data.strCorreoElectronico1}, strCorreoElectronico1),
                strNivelEducativo        = COALESCE(${data.strNivelEducativo}, strNivelEducativo),
                strTitulos               = COALESCE(${data.strTitulos}, strTitulos),
                strCondicionDiscapacidad = COALESCE(${data.strCondicionDiscapacidad}, strCondicionDiscapacidad),
                strSede                  = COALESCE(${data.strSede}, strSede),
                strTipoEmpresario        = COALESCE(${data.strTipoEmpresario}, strTipoEmpresario),
                dtFechaVinculacion       = COALESCE(${data.dtFechaVinculacion}, dtFechaVinculacion),
                strEstado                = COALESCE(${data.strEstado}, strEstado),
                strUrlFoto               = COALESCE(${data.strUrlFoto}, strUrlFoto),
                dtmActualizacion         = COALESCE(GETDATE(), dtmActualizacion),
                strUsuario               = COALESCE(${data.strUsuario}, strUsuario),
                strEspacioJornada        = COALESCE(${data.strEspacioJornada}, strEspacioJornada)

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
                    "Error en el metodo setEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateEmpresa(data){

    }

    async updateEmprendimiento(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_InfoEmprendimiento

            SET btTieneSoloIdea                  = COALESCE(${data.btTieneSoloIdea}, btTieneSoloIdea),
                strPlaneaComenzar                = COALESCE(${data.strPlaneaComenzar}, strPlaneaComenzar),
                dtFechaNacimiento                = COALESCE(${data.dtFechaNacimiento}, dtFechaNacimiento),
                strTiempoDedicacion              = COALESCE(${data.strTiempoDedicacion}, strTiempoDedicacion),
                btGrupoAsociativo                = COALESCE(${data.btGrupoAsociativo}, btGrupoAsociativo),
                btAsociacionUnidadProdIndividual = COALESCE(${data.btAsociacionUnidadProdIndividual}, btAsociacionUnidadProdIndividual),
                strProductosServicios            = COALESCE(${data.strProductosServicios}, strProductosServicios),
                strMateriaPrima                  = COALESCE(${data.strMateriaPrima}, strMateriaPrima),
                strNombreTecnica                 = COALESCE(${data.strNombreTecnica}, strNombreTecnica),
                dtmActualizacion                 = COALESCE(GETDATE(), dtmActualizacion),
                strUsuario                       = COALESCE(${data.strUsuario}, strUsuario)

            WHERE intIdEmpresario = ${data.intIdEmpresario}

            SELECT * FROM tbl_InfoEmprendimiento WHERE intIdEmpresario = ${data.intIdEmpresario}`;

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
                    "Error en el metodo setEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateEmpresarioSecundario(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_EmpresarioSecundario

            SET strNombresApellidos     = COALESCE(${data.strNombresApellidos}, strNombresApellidos),
                strSexo                 = COALESCE(${data.strSexo}, strSexo),
                dtFechaNacimiento       = COALESCE(${data.dtFechaNacimiento}, dtFechaNacimiento),
                strTipoDocto            = COALESCE(${data.strTipoDocto}, strTipoDocto),
                strNroDocto             = COALESCE(${data.strNroDocto}, strNroDocto),
                strLugarExpedicionDocto = COALESCE(${data.strLugarExpedicionDocto}, strLugarExpedicionDocto),
                dtFechaExpedicionDocto  = COALESCE(${data.dtFechaExpedicionDocto}, dtFechaExpedicionDocto),
                strCelular              = COALESCE(${data.strCelular}, strCelular),
                strCorreoElectronico    = COALESCE(${data.strCorreoElectronico}, strCorreoElectronico),
                dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                strUsuario              = COALESCE(${data.strUsuario}, strUsuario)

                WHERE intIdEmpresarioPrincipal = ${data.intIdEmpresarioPrincipal} AND intId = ${data.intId}
                
            SELECT * FROM tbl_EmpresarioSecundario WHERE intIdEmpresarioPrincipal = ${data.intIdEmpresarioPrincipal}`;

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
                    "Error en el metodo setEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_Empresario WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: "El empresario fue eliminado con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteInfoEmprendimiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_InfoEmprendimiento WHERE intIdEmpresario = ${data.intId}`;

            let result = {
                error: false,
                msg: "La información del emprendimiento fue eliminada con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteInfoEmprendimiento de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteInfoEmpresa(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_InfoEmpresa WHERE intIdEmpresario = ${data.intId}`;

            let result = {
                error: false,
                msg: "La información de la empresa fue eliminada con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteInfoEmpresa de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteEmpresarioSecundario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_EmpresarioSecundario WHERE intIdEmpresario = ${data.intId}`;

            let result = {
                error: false,
                msg: "La información del empresario secundario fue eliminada con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteEmpresarioSecundario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            SELECT 
            
            Empresario.intId,
            Empresario.strNombres,
            Empresario.strApellidos,
            Empresario.dtFechaNacimiento,
            Empresario.strTipoDocto,
            Empresario.strNroDocto,
            Empresario.strLugarExpedicionDocto,
            Empresario.dtFechaExpedicionDocto,
            Empresario.strSexo,
            Empresario.strCelular,
            Empresario.strCorreoElectronico,
            Empresario.strNivelEducativo,
            Empresario.strTitulos,
            Empresario.strCondicionDiscapacidad,
            Empresario.strSede,
            Empresario.strTipoEmpresario,
            Empresario.dtFechaVinculacion,
            Empresario.strEstado,
            Empresario.strUrlFoto,
            Empresario.strEspacioJornada,
            (
                SELECT * FROM tbl_InfoEmprendimiento Emprendimiento
                WHERE Emprendimiento.intIdEmpresario = Empresario.intId
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
            ) as objInfoEmprendimiento,
            (
                SELECT * FROM tbl_EmpresarioSecundario EmpresarioSec
                WHERE EmpresarioSec.intIdEmpresarioPrincipal = Empresario.intId
                FOR JSON PATH
            ) as arrEmpresarioSecundario

            FROM tbl_Empresario Empresario

            WHERE (Empresario.intId = ${data.intId} OR ${data.intId} IS NULL)
            AND   (Empresario.strNombres = ${data.strNombres} OR ${data.strNombres} IS NULL)
            AND   (Empresario.strApellidos = ${data.strApellidos} OR ${data.strApellidos} IS NULL)
            AND   (Empresario.strNroDocto = ${data.strNroDocto} OR ${data.strNroDocto} IS NULL)
            AND   (Empresario.strCorreoElectronico = ${data.strCorreoElectronico} OR ${data.strCorreoElectronico} IS NULL)
            AND   (Empresario.strSede = ${data.strSede} OR ${data.strSede} IS NULL)
            AND   (Empresario.strEstado = ${data.strEstado} OR ${data.strEstado} IS NULL)
            AND   (Empresario.strTipoEmpresario = ${data.strTipoEmpresario} OR ${data.strTipoEmpresario} IS NULL)
            AND   (Empresario.dtFechaVinculacion = ${data.dtFechaVinculacion} OR ${data.dtFechaVinculacion} IS NULL)
            AND   (Empresario.strCorreoElectronico = ${data.strCorreoElectronico} OR ${data.strCorreoElectronico} IS NULL)`;

            let arrNewData = response.recordsets[0];

            for (let i = 0; i < arrNewData.length; i++) {
                if (arrNewData[i].objInfoEmprendimiento) {
                    let { objInfoEmprendimiento } = arrNewData[i];

                    if (validator.isJSON(objInfoEmprendimiento)) {
                        objInfoEmprendimiento = JSON.parse(
                            objInfoEmprendimiento
                        );
                        arrNewData[i].objInfoEmprendimiento =
                            objInfoEmprendimiento;
                    }
                }
                if (arrNewData[i].arrEmpresarioSecundario) {
                    let { arrEmpresarioSecundario } = arrNewData[i];

                    if (validator.isJSON(arrEmpresarioSecundario)) {
                        arrEmpresarioSecundario = JSON.parse(
                            arrEmpresarioSecundario
                        );
                        arrNewData[i].arrEmpresarioSecundario =
                            arrEmpresarioSecundario;
                    }
                }
            }

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
            console.log(error);
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getCategoriaEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            SELECT intId FROM tbl_CategoriasProductos_Servicios where strNombreCategoria = ${data.strNombreCategoria}`;

            let result = {
                error: false,
                data: response.recordsets[0],
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getCategoriaEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getNroDocumentoEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            SELECT strNroDocto FROM tbl_Empresario where strNroDocto = ${data.strNroDocto}`;

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
                    "Error en el metodo deleteEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoEmpresarios;
