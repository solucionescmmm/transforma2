//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//Servicios
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service")
const serviceSetHistorico = require("../../Historicos/domain/setHistorico.service")
const serviceUpdateHistorico = require("../../Historicos/domain/updateHistorico.service")
const serviceSetDocumento = require("../../Document/domain/setDocumento.service");
const serviceGetIdFuenteHistorico = require("../../Historicos/domain/getIdFuenteHistoricos.service")
const serviceGetHistorico = require("../../Historicos/domain/getHistoricoByFuente.service")
const servicegetIdeaEmpresario = require("./getIdeaEmpresario.service")

class updateEmpresarioPrincipal {

    //objects
    #objData;
    #objUser;
    #objIdeaEmpresarioActual;
    #objResult;

    //variables
    #intIdIdea;
    #intIdEstado;
    #intIdFuenteHistorico;
    #bitTienePrediagnostico;
    #intIdTipoEmpresario;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
        this.#intIdIdea = data.intIdIdea
    }

    async main() {
        //console.log(this.#objData)
        await this.#getIdeaEmpresario();
        await this.#getIdFuenteHistorico();
        await this.#getHistorico();
        await this.#getIdEstado();
        await this.#getIdTipoEmpresario();
        await this.#validations();
        await this.#updateIdea();
        await this.#updateIdeaEmpresario();
        await this.#updateEmpresario();
        await this.#updateEmpresa();
        await this.#updateInfoAdicional();

        return this.#objResult;
    }

    async #validations() {
        if (
            !validator.isEmail(this.#objUser.strEmail, {
                domain_specific_validation: "cmmmedellin.org",
            })
        ) {
            throw new Error(
                "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
            );
        }

        let btMismaCedula = false;
        let objDataEmpresarioPrincipal = this.#objIdeaEmpresarioActual.objEmpresario.find((data) => data.strTipoEmpresario === "Principal")

        if (
            this.#objData.objEmpresario.strNroDocto ===
            objDataEmpresarioPrincipal?.strNroDocto
        ) {
            btMismaCedula = true;
        }

        if (!btMismaCedula) {
            let dao = new classInterfaceDAOEmpresarios();
            let queryGetNroDoctoEmpresario =
                await dao.getNroDocumentoEmpresario({
                    strNroDocto: this.#objData.objEmpresario.strNroDocto,
                });

            if (queryGetNroDoctoEmpresario.data) {
                throw new Error(
                    `Este número de documento ${queryGetNroDoctoEmpresario.data.strNroDocto}, ya exite y esta asociado a un Interesado`
                );
            }
        }

        if (this.#objData?.objInfoEmpresa?.strEstadoNegocio !== "Idea de negocio" && this.#bitTienePrediagnostico) {
            await this.#updateHistorico()
        }

        if (this.#objData?.objInfoEmpresa?.strEstadoNegocio !== "Idea de negocio" && !this.#bitTienePrediagnostico) {
            await this.#setHistorico()
        }

        if (this.#objData.objInfoAdicional.strURLDocumento) {
            await this.#setDocumento()
        }
    }

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: "Activo",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstado = queryGetIdEstado.data.intId;
    }

    async #getIdeaEmpresario() {
        let query = await servicegetIdeaEmpresario({
            intId: this.#intIdIdea
        }, this.#objUser);

        if (query.error) {
            throw new Error(query.msg);
        }

        if (!query.data) {
            throw new Error(`El empresario no existe`);
        }
        
        this.#objIdeaEmpresarioActual = query.data[0];
    }

    async #getIdFuenteHistorico() {
        let queryGetIdFuenteHistorico = await serviceGetIdFuenteHistorico({
            strNombre: "Prediagnóstico",
        });

        if (queryGetIdFuenteHistorico.error) {
            throw new Error(query.msg);
        }

        this.#intIdFuenteHistorico = queryGetIdFuenteHistorico.data.intId;
    }

    async #getHistorico() {
        let queryGetHistorico = await serviceGetHistorico({
            intIdIdea: this.#intIdIdea,
        });

        if (queryGetHistorico.error) {
            throw new Error(query.msg);
        }

        this.#bitTienePrediagnostico = queryGetHistorico.data ? true : false;
    }

    async #getIdTipoEmpresario() {
        const dao = new classInterfaceDAOEmpresarios()

        let queryGetIdTipoEmpresario = await dao.getIdTipoEmpresario({
            strNombre: "Principal",
        });

        if (queryGetIdTipoEmpresario.error) {
            throw new Error(queryGetIdTipoEmpresario.msg);
        }

        this.#intIdTipoEmpresario = queryGetIdTipoEmpresario.data.intId;
    }

    async #updateEmpresario() {
        let prevData = this.#objData.objEmpresario;

        let aux_arrPais = JSON.stringify(
            this.#objData.objEmpresario?.arrPais || null
        );

        let aux_arrDepartamento = JSON.stringify(
            this.#objData.objEmpresario?.arrDepartamento || null
        );
        let aux_arrCiudad = JSON.stringify(
            this.#objData.objEmpresario?.arrCiudad || null
        );

        let newData = {
            ...prevData,
            intIdIdea: this.#intIdIdea,
            strUsuario: this.#objUser.strEmail,
            arrPais: aux_arrPais,
            arrDepartamento: aux_arrDepartamento,
            arrCiudad: aux_arrCiudad,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateEmpresario(newData);

        if (query.error) {
            await this.#rollbackTransaction();
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #updateIdea() {
        let newData = {
            intId: this.#intIdIdea,
            strNombre: this.#objData.objInfoEmpresa?.strNombreMarca,
            strModalidadIngreso:this.#objData?.objEmpresario?.strModalidadIngreso,
            dtFechaVinculacion: this.#objData?.objEmpresario?.dtFechaVinculacion,
            strTipoVinculacion: this.#objData?.objEmpresario?.strTipoVinculacion,
            intIdEstadoVinculacion: this.#objData?.objEmpresario?.intIdEstadoVinculacion,
            strUsuarioActualizacion: this.#objUser.strEmail,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateIdea(newData);

        if (query.error) {
            throw new Error(query.msg);
        }
    }

    async #updateIdeaEmpresario() {
        let newData={
            intIdIdea: this.#intIdIdea,
            intIdEmpresario: this.#objData?.objEmpresario?.intId,
            intIdTipoEmpresario: this.#intIdTipoEmpresario,
            strModalidadIngreso:this.#objData?.objEmpresario?.strModalidadIngreso,
            dtFechaVinculacion: this.#objData?.objEmpresario?.dtFechaVinculacion,
            strTipoVinculacion: this.#objData?.objEmpresario?.strTipoVinculacion,
            intIdEstadoVinculacionEmpresario: this.#objData?.objEmpresario?.intIdEstadoVinculacion,
            intIdEstado:this.#intIdEstado,
            strUsuarioActualizacion: this.#objUser.strEmail
        }
        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateIdeaEmpresario(newData);
        
        if (query.error) {
            await this.#rollbackTransaction();
            throw new Error(query.msg);
        }
    }

    async #updateEmpresa() {
        let prevData = this.#objData.objInfoEmpresa;

        let aux_arrCategoriasSecundarias = JSON.stringify(
            this.#objData.objInfoEmpresa?.arrCategoriasSecundarias || null
        );
        let aux_arrFormasComercializacion = JSON.stringify(
            this.#objData.objInfoEmpresa?.arrFormasComercializacion || null
        );
        let aux_arrMediosDigitales = JSON.stringify(
            this.#objData.objInfoEmpresa?.arrMediosDigitales || null
        );
        let aux_arrRequisitosLey = JSON.stringify(
            this.#objData.objInfoEmpresa?.arrRequisitosLey || null
        );
        let aux_arrPais = JSON.stringify(
            this.#objData.objInfoEmpresa?.arrPais || null
        );
        let aux_arrDepartamento = JSON.stringify(
            this.#objData.objInfoEmpresa?.arrDepartamento || null
        );
        let aux_arrCiudad = JSON.stringify(
            this.#objData.objInfoEmpresa?.arrCiudad || null
        );

        let newData = {
            ...prevData,
            strUsuario: this.#objUser.strEmail,
            arrCategoriasSecundarias: aux_arrCategoriasSecundarias,
            arrFormasComercializacion: aux_arrFormasComercializacion,
            arrMediosDigitales: aux_arrMediosDigitales,
            arrRequisitosLey: aux_arrRequisitosLey,
            arrPais: aux_arrPais,
            arrDepartamento: aux_arrDepartamento,
            arrCiudad: aux_arrCiudad,
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateEmpresa(newData);

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #updateInfoAdicional() {
        let dao = new classInterfaceDAOEmpresarios();

        let prevData = this.#objData.objInfoAdicional;


        let aux_arrTemasCapacitacion = JSON.stringify(
            this.#objData.objInfoAdicional?.arrTemasCapacitacion || null
        );
        let aux_arrComoSeEntero = JSON.stringify(
            this.#objData.objInfoAdicional?.arrComoSeEntero || null
        );
        let aux_arrMediosDeComunicacion = JSON.stringify(
            this.#objData.objInfoAdicional?.arrMediosDeComunicacion || null
        );

        let newData = {
            ...prevData,
            strUsuario: this.#objUser.strEmail,
            arrTemasCapacitacion: aux_arrTemasCapacitacion,
            arrComoSeEntero: aux_arrComoSeEntero,
            arrMediosDeComunicacion: aux_arrMediosDeComunicacion,
            strUrlSoporteRecibirInfoCMM: this.#objData.objInfoAdicional?.strURLDocumento || null,
        };

        let query = await dao.updateInfoAdicional(newData);

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setHistorico() {
        let data = {
            intIdIdea: this.#intIdIdea,
            intNumeroEmpleados: this.#objData.objInfoEmpresa.btGeneraEmpleo === true ? parseInt(this.#objData.objInfoEmpresa.intNumeroEmpleados, 10) : 1,
            ValorVentas: this.#objData.objInfoEmpresa.dblValorVentasMes,
            strTiempoDedicacionAdmin: this.#objData.objInfoEmpresa.strTiempoDedicacion,
            intIdFuenteHistorico: this.#intIdFuenteHistorico,
            intIdFuenteDato: this.#objData.objInfoEmpresa.intId,
        };

        let service = new serviceSetHistorico(data);

        let query = await service.main();

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #updateHistorico() {
        let data = {
            intIdIdea: this.#intIdIdea,
            intNumeroEmpleados: this.#objData.objInfoEmpresa.btGeneraEmpleo === true ? parseInt(this.#objData.objInfoEmpresa.intNumeroEmpleados, 10) : 1,
            ValorVentas: this.#objData.objInfoEmpresa.dblValorVentasMes,
            strTiempoDedicacionAdmin: this.#objData.objInfoEmpresa.strTiempoDedicacion,
            intIdFuenteDato: this.#objData.objInfoEmpresa.intId,
        };

        let service = new serviceUpdateHistorico(data);

        let query = await service.main();

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #setDocumento() {
        let service = new serviceSetDocumento(
            {
                intIdIdea: this.#intIdIdea,
                strNombre: "Autorización para recibir información de CMM",
                strObservaciones: "Autorización que da la persona empresaria para recibir información de CMM.",
                strUrlDocumento: this.#objData.objInfoAdicional?.strURLDocumento,
            },
            this.#objUser
        );
        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg);
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();
        let prevData = this.#objIdeaEmpresarioActual;

        let objDataEmpresario = this.#objIdeaEmpresarioActual.objEmpresario.find((i)=> i.strTipoEmpresario === "Principal")

        let aux_arrDepartamentoEm = JSON.stringify(
            objDataEmpresario?.arrDepartamento || null
        );
        let aux_arrCiudadEm = JSON.stringify(
            objDataEmpresario?.arrCiudad || null
        );

        objDataEmpresario={
            ...objDataEmpresario,
            arrDepartamento: aux_arrDepartamentoEm,
            arrCiudad: aux_arrCiudadEm
        }

        let rollEmpresario = await dao.updateEmpresario(objDataEmpresario);

        let aux_arrCategoriasSecundarias = JSON.stringify(
            this.#objIdeaEmpresarioActual.objInfoEmpresa
                ?.arrCategoriasSecundarias || null
        );
        let aux_arrFormasComercializacion = JSON.stringify(
            this.#objIdeaEmpresarioActual.objInfoEmpresa
                ?.arrFormasComercializacion || null
        );
        let aux_arrMediosDigitales = JSON.stringify(
            this.#objIdeaEmpresarioActual.objInfoEmpresa?.arrMediosDigitales || null
        );
        let aux_arrRequisitosLey = JSON.stringify(
            this.#objIdeaEmpresarioActual.objInfoEmpresa?.arrRequisitosLey || null
        );
        let aux_arrDepartamento = JSON.stringify(
            this.#objIdeaEmpresarioActual.objInfoEmpresa?.arrDepartamento || null
        );
        let aux_arrCiudad = JSON.stringify(
            this.#objData.objIdeaEmpresarioActual?.arrCiudad || null
        );

        let objDataEmpresa = {
            ...prevData.objInfoEmpresa,
            arrDepartamento: aux_arrDepartamento,
            arrCiudad: aux_arrCiudad,
            arrCategoriasSecundarias: aux_arrCategoriasSecundarias,
            arrFormasComercializacion: aux_arrFormasComercializacion,
            arrMediosDigitales: aux_arrMediosDigitales,
            arrRequisitosLey: aux_arrRequisitosLey,
        };

        let rollEmpresa = await dao.updateEmpresa(objDataEmpresa);

        let aux_arrTemasCapacitacion = JSON.stringify(
            this.#objIdeaEmpresarioActual.objInfoAdicional?.arrTemasCapacitacion ||
            null
        );
        let aux_arrComoSeEntero = JSON.stringify(
            this.#objIdeaEmpresarioActual.objInfoAdicional?.arrComoSeEntero || null
        );
        let aux_arrMediosDeComunicacion = JSON.stringify(
            this.#objIdeaEmpresarioActual.objInfoAdicional
                ?.arrMediosDeComunicacion || null
        );

        let objDataAdicional = {
            ...prevData.objInfoAdicional,
            arrTemasCapacitacion: aux_arrTemasCapacitacion,
            arrComoSeEntero: aux_arrComoSeEntero,
            arrMediosDeComunicacion: aux_arrMediosDeComunicacion,
        };

        let rollAdicional = await dao.updateInfoAdicional(objDataAdicional);

        if (rollEmpresario.error) {
            throw new Error(rollEmpresario.msg);
        }

        if (rollEmpresa.error) {
            throw new Error(rollEmpresa.msg);
        }

        if (rollAdicional.error) {
            throw new Error(rollAdicional.msg);
        }

        this.#objResult = {
            error: true,
            msg: query.error
                ? query.msg
                : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}
module.exports = updateEmpresarioPrincipal;
