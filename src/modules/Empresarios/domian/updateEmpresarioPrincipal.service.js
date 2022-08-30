//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//Servicios
const serviceUpdateHistorico = require("../../Historicos/domain/updateHistorico.service")
const serviceGetIdFuenteHistorico = require("../../Historicos/domain/getIdFuenteHistoricos.service")
const servicegetIdeaEmpresario = require("./getIdeaEmpresario.service")

class updateEmpresarioPrincipal {

    //objects
    #objData;
    #objUser;
    #objIdeaEmpresarioActual;
    #objResult;

    //variables
    #intIdIdea;
    #intIdFuenteHistorico;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
        this.#intIdIdea = data.intIdIdea
    }

    async main() {
        await this.#getIdeaEmpresario();
        await this.#getIdFuenteHistorico();
        await this.#validations();
        await this.#updateEmpresario();
        await this.#updateIdea();
        await this.#updateEmpresa();
        await this.#updateInfoAdicional();
        if (this.#objData?.objInfoEmpresa?.strEstadoNegocio !== "Idea de negocio") {
           await this.#updateHistorico()
        }

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
        if (
            this.#objData.objEmpresario.strNroDocto ===
            this.#objIdeaEmpresarioActual.objEmpresario[0].strNroDocto
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

    async #updateEmpresario() {
        let prevData = this.#objData.objEmpresario;

        let aux_arrDepartamento = JSON.stringify(
            this.#objData.objEmpresario?.arrDepartamento || null
        );
        let aux_arrCiudad = JSON.stringify(
            this.#objData.objEmpresario?.arrCiudad || null
        );

        let newData = {
            ...prevData,
            strUsuarioActualizacion: this.#objUser.strEmail,
            arrDepartamento: aux_arrDepartamento,
            arrCiudad: aux_arrCiudad
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
            strUsuarioActualizacion: this.#objUser.strEmail,
            strNombre:this.#objData.objInfoEmpresa?.strNombreMarca,
            intId : this.#intIdIdea
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateIdea(newData);

        if (query.error) {
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
        let aux_arrDepartamento = JSON.stringify(
            this.#objData.objEmpresario?.arrDepartamento || null
        );
        let aux_arrCiudad = JSON.stringify(
            this.#objData.objEmpresario?.arrCiudad || null
        );

        let newData = {
            ...prevData,
            strUsuario: this.#objUser.strEmail,
            arrCategoriasSecundarias: aux_arrCategoriasSecundarias,
            arrFormasComercializacion: aux_arrFormasComercializacion,
            arrMediosDigitales: aux_arrMediosDigitales,
            arrRequisitosLey: aux_arrRequisitosLey,
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
        };

        let query = await dao.updateInfoAdicional(newData);

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #updateHistorico(){
        let data = {
            intIdIdea:this.#intIdIdea,
            intNumeroEmpleados:parseInt(this.#objData.objInfoEmpresa.intNumeroEmpleados, 10),
            ValorVentas:this.#objData.objInfoEmpresa.dblValorVentasMes,
            strTiempoDedicacionAdmin:this.#objData.objInfoEmpresa.strTiempoDedicacion,
            intIdFuenteHistorico: this.#intIdFuenteHistorico
        };
    
        let service = new serviceUpdateHistorico(data);

        let query = await service.main();

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();
        let prevData = this.#objIdeaEmpresarioActual;

        let objDataEmpresario = this.#objIdeaEmpresarioActual.objEmpresario[0]

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
        let aux_arrRequisitoLey = JSON.stringify(
            this.#objIdeaEmpresarioActual.objInfoEmpresa?.arrRequisitoLey || null
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
            arrRequisitoLey: aux_arrRequisitoLey,
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
