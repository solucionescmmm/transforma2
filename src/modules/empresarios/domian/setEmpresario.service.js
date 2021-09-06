//Librerias
const validator = require("validator").default;
const { parseISO, format } = require("date-fns");
//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//services
const getEmpresario = require("./getEmpresario.service");
const getCategoriaEmpresario = require("./getCategoriaServicio.service");

class setEmpresario {
    #objData;
    #objUser;
    #intIdEmpresario;
    #objResult;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#setEmpresario();
        //  await this.#setEmpresa();
        await this.#setEmprendimiento();
        // await this.#setEmpresarioSecundario();
        return this.#objResult;
    }

    async #validations() {
        //console.log(this.#objData);
       // console.log(this.#objUser);
        let dao = new classInterfaceDAOEmpresarios();

        if (
            !validator.isEmail(this.#objUser.strEmail, {
                domain_specific_validation: "cmmmedellin.org",
            })
        ) {
            throw new Error(
                "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
            );
        }
        let queryGetNroDoctoEmpresario = await dao.getNroDocumentoEmpresario({
            strNroDocto: this.#objData.objEmpresario.strNroDocto,
        });
        console.log(queryGetNroDoctoEmpresario);

        if (queryGetNroDoctoEmpresario.data) {
            throw new Error(
                `Este número de documento ${queryGetNroDoctoEmpresario.data.strNroDocto}, ya exite y esta asociado a un Interesado`
            );
        }
    }

    async #setEmpresario() {
        let prevData = this.#objData.objEmpresario;

        

        let newData = {
            ...prevData,
            strUsuario: this.#objUser.strEmail,
            
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setEmpresarios(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdEmpresario = query.data.intId;

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setEmpresa() {
        let queryGetCategoriaProducto = await getCategoriaEmpresario({
            strNombreCategoria:
                this.#objData.objInfoEmpresa.strCategoriaProducto,
        });

        let queryGetCategoriaServicio = await getCategoriaEmpresario({
            strNombreCategoria:
                this.#objData.objInfoEmpresa.strCategoriaServicio,
        });

        let prevData = this.#objData.objInfoEmpresa;

        let newData = {
            ...prevData,
            intIdEmpresario: this.#intIdEmpresario,
            intIdNombreCategoriaProducto:
                queryGetCategoriaProducto?.data || null,
            intIdNombreCategoriaServicio:
                queryGetCategoriaServicio?.data || null,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setEmpresa(newData);

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setEmprendimiento() {
        let prevData = this.#objData.objInfoEmprendimiento;

        let newData = {
            ...prevData,
            intIdEmpresario: this.#intIdEmpresario,
            strUsuario: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.setEmprendimineto(newData);

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setEmpresarioSecundario() {
        let dao = new classInterfaceDAOEmpresarios();
        for (let i = 0; i < arrEmpresarioSecundario.length; i++) {
            let prevData = this.#objData.arrEmpresarioSecundario[i];

            let newData = {
                ...prevData,
                intIdEmpresario: this.#intIdEmpresario,
            };

            let query = await dao.setEmpresarioSecundario(newData);

            if (query.error) {
                await this.#rollbackTransaction();
            }
        }
    }

    async #rollbackTransaction() {
        let newData = {
            objEmpresario: {
                strNombres: data.objInfoEmpresarioPr.strNombres,
                strApellidos: data.objInfoEmpresarioPr.strApellidos,
                dtFechaNacimiento: data.objInfoEmpresarioPr.dtFechaNacimiento,
                strTipoDocto: data.objInfoEmpresarioPr.strTipoDocto,
                strNroDocto: data.objInfoEmpresarioPr.strNroDocto,
                strLugarExpedicionDocto:
                    data.objInfoEmpresarioPr.strLugarExpedicionDocto,
                dtFechaExpedicionDocto:
                    data.objInfoEmpresarioPr.dtFechaExpedicionDocto,
                strSexo: data.objInfoEmpresarioPr.strSexo,
                strCelular: data.objInfoEmpresarioPr.strCelular,
                strCorreoElectronico:
                    data.objInfoEmpresarioPr.strCorreoElectronico,
                strNivelEducativo: data.objInfoEmpresarioPr.strNivelEducativo,
                strTitulos: data.objInfoEmpresarioPr.strTitulos,
                strCondicionDiscapacidad:
                    data.objInfoEmpresarioPr.strCondicionDiscapacidad,
                strSede: data.objInfoPrincipal.strSede,
                strTipoEmpresario: data.objInfoPrincipal.strTipoEmpresario,
                dtFechaVinculacion: data.objInfoPrincipal.dtFechaVinculacion,
                strEstado: data.objInfoPrincipal.strEstado,
                strUrlFoto: data.objInfoEmpresarioPr.strURLFileFoto,
                strEspacioJornada: data.objInfoPrincipal.strNivelEducativo,
            },
            arrEmpresarioSecundario: data.arrInfoEmpresarioSec,
            objInfoEmprendimiento: {
                btTieneSoloIdea: data.objInfoEmprendimiento.btTieneSoloIdea,
                strPlaneaComenzar:
                    data.objInfoEmprendimiento.strCuandoComienzaEmpresa,
                strTiempoDedicacion:
                    data.objInfoEmprendimiento.strTiempoDedicacion,
                btGrupoAsociativo: data.objInfoEmprendimiento.btGrupoAsociativo,
                btAsociacionUnidadProdIndividual:
                    data.objInfoEmprendimiento.btAsociacionUnidadProdIndividual,
                strProductosServicios:
                    data.objInfoEmprendimiento.strProductosServicios,
                strMateriaPrima: data.objInfoEmprendimiento.strMateriaPrima,
                strNombreTecnica: data.objInfoEmprendimiento.strNombreTecnica,
            },
            objInfoEmpresa: {
                strUrlLogo: data.objInfoEmpresa.strURLFileLogoEmpresa,
                dtFechaFundacion: data.objInfoEmpresa.dtFechaFundacion,
                strUnidadProdOperacion:
                    data.objInfoEmpresa.strUnidadProdOperacion,
                strDireccion: data.objInfoEmpresa.strDireccion,
                strMunicipio: data.objInfoEmpresa.strMunicipio,
                strBarrio: data.objInfoEmpresa.strBarrio,
                intEstrato: data.objInfoEmpresa.intEstrato,
                strCategoriaProducto: data.objInfoEmpresa.strCategoriaProducto,
                strOtraCategoriaProducto:
                    data.objInfoEmpresa.strOtraCategoriaProducto,
                arrCategoriaServicio: data.objInfoEmpresa.arrCategoriaServicio,
                btGeneraEmpleo: data.objInfoEmpresa.btGeneraEmpleo,
                intNumeroEmpleados: data.objInfoEmpresa.intNumeroEmpleados,
                valorVentasMes: data.objInfoEmpresa.valorVentasMes,
                strMediosUtilizadosVentas:
                    data.objInfoEmpresa.arrMediosUtilizadosVentas,
                btNombreMarca: data.objInfoAdicional.btNombreMarca,
                btLogotipo: data.objInfoAdicional.btLogotipo,
                btEtiquetaEmpaque: data.objInfoAdicional.btEtiquetaEmpaque,
                btMejorarEtiquetaEmpaque:
                    data.objInfoAdicional.btMejorarEtiquetaEmpaque,
                strPrincipalesNecesidades:
                    data.objInfoAdicional.strPrincipalesNecesidades,
                strRequisitoLey: data.objInfoAdicional.arrRequisitoLey,
                strOtrosRequisitos: data.objInfoAdicional.strOtrosRequisitos,
                btInteresadoProcesoCMM:
                    data.objInfoAdicional.btInteresadoProcesoCMM,
                strTemasCapacitacion:
                    data.objInfoAdicional.strTemasCapacitacion,
                strComoSeEntero: data.objInfoAdicional.arrComoSeEntero,
                strOtrosMediosEntero:
                    data.objInfoAdicional.strOtrosMediosEntero,
                strMedioDeComunicacion:
                    data.objInfoAdicional.arrMediosDeComunicacion,
                strOtroMedioComunicacion:
                    data.objInfoAdicional.strOtroMedioComunicacion,
                btRecibirInfoCMM: data.objInfoAdicional.btRecibirInfoCMM,
                strRecomendaciones: data.objInfoAdicional.strRecomendaciones,
            },
        };
        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.deleteEmpresario({
            intIdEmpresario: this.#intIdEmpresario,
        });

        this.#objResult = {
            error: true,
            msg: query.error
                ? query.msg
                : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}

module.exports = setEmpresario;
