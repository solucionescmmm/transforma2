//librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../common/config/confSQL_connectionTransfroma");

class daoEmpresarios {
    async setEmpresario(data) {
        console.log(data)
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn
                .request()
                .input("pintId", sql.BigInt, data.intId)
                .input("pstrNombres", sql.VarChar, data.strNombres)
                .input("pstrApellidos", sql.VarChar, data.strApellidos)
                .input("pdtFechaNacimiento", sql.Date, data.dtFechaNacimiento)
                .input("pstrTipoDocto", sql.VarChar, data.strTipoDocto)
                .input("pstrNroDocto", sql.VarChar, data.strNroDocto)
                .input("pstrLugarExpedicionDocto", sql.VarChar, data.strLugarExpedicionDocto)
                .input("pdtFechaExpedicionDocto", sql.DateTime, data.dtFechaExpedicionDocto)
                .input("pstrSexo", sql.VarChar, data.strSexo)
                .input("pstrCelular", sql.VarChar, data.strCelular)
                .input("pstrCorreoElectronico", sql.VarChar, data.strCorreoElectronico)
                .input("pstrNivelEducativo", sql.VarChar, data.strNivelEducativo)
                .input("pstrTitulos", sql.VarChar, data.strTitulos)
                .input("pstrCondicionDiscapacidad", sql.VarChar, data.strCondicionDiscapacidad)
                .input("pstrSede", sql.VarChar, data.strSede)
                .input("pstrTipoEmpresario", sql.VarChar, data.strTipoEmpresario)
                .input("pdtFechaVinculacion", sql.DateTime, data.dtFechaVinculacion)
                .input("pstrEstado", sql.VarChar, data.strEstado)
                .input("pstrUrlFoto", sql.VarChar, data.strUrlFoto)
                .input("pstrUsuario", sql.VarChar, data.strUsuario)
                .input("pstrEspacioJornada", sql.VarChar, data.strEspacioJornada)
                .execute("usp_ActualizarInfoEmpresario");
            console.log(response)
            let result = {
                error: false,
                data: response,
                msg: `El empresario fue registrado con éxito.`,
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
            let response1 = await conn
            .request()
            .input("pstrUrlLogo",sql.VarChar, data.strUrlLogo)
            .input("pdtFechaFundacion",sql.Date, data.dtFechaFundacion)
            .input("pstrUnidadProdOperacion",sql.VarChar, data.strUnidadProdOperacion)
            .input("pstrDireccion",sql.VarChar, data.strDireccion)
            .input("pstrMunicipio",sql.VarChar, data.strMunicipio)
            .input("strBarrio",sql.VarChar, data.strBarrio)
            .input("pintEstrato",sql.VarChar, data.intEstrato)
            .input("pstrSectorEconomico",sql.VarChar, data.strSectorEconomico)
            .input("pstrC",sql.VarChar, data.strSectorEconomico)


            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_InfoEmpresa VALUES
            (
                ${data.intIdEmpresario},
                ${data.strUrlLogo},
                ${data.dtFechaFundacion},
                ${data.intIdUnidadProdOperacion},
                ${data.strDireccion},
                ${data.strMunicipio},
                ${data.strBarrio},
                ${data.intIdSectorEconomico},
                ${data.intEstrato},
                ${data.strCategoriaProducto}
                ${data.strOtraCategoria},
                ${data.strCategoriaServicio},
                ${data.btGeneraEmpleo},
                ${data.intNumeroEmpleados},
                ${data.valorVentasMes},
                ${data.strMediosUtilizadosVentas},
                ${data.btNombreMarca},
                ${data.btLogotipo},
                ${data.btEtiquetaEmpaque},
                ${data.btMejorarEtiquetaEmpaque},
                ${data.strPrincipalesNecesidades},
                ${data.intIdRequisitoLey},
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
            )
            SET @intId = SCOPE IDENTITY();

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
                ${data.btElaboraProductoServicio},
                ${data.btTieneSoloIdea},
                ${data.intIdCuandoComienzaEmpresa},
                ${data.intIdTiempoDedicacion},
                ${data.btGrupoAsociativo},
                ${data.btAsociacionUnidadProdIndividual},
                ${data.strProductosServicios},
                ${data.strMateriaPrima},
                ${data.strNombreTecnica},
                ${data.strUsuario}    
            )
            SET @intId = SCOPE IDENTITY();

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

    async deleteEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_Empresario WHERE intId = ${data.intIdEmpresario}`;

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
    async getEmpresario(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.request().execute("")
            
            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El empresario fue registrado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            
        }
    }
}
module.exports = daoEmpresarios;
