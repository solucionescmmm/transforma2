//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOTecnicas = require("../infra/conectors/interfaseDAODiagnosticoTecnicas");

//Service
const serviceGetIdEstadoDiagnostico = require("../../../Main/domain/getIdEstadoDiagnosticos.service")
const serviceUpdateDiagnostico = require("../../../Main/domain/updateDiagnosticos.service");


class setDiagnosticoTecnicas {
    //Objetos
    #objData;
    #objUser;
    #objResult;

    // Variables
    #intIdEstadoDiagnostico;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#getIntIdEstadoDiagnostico();
        await this.#setDiagnosticoTecnicas();
        await this.#updateDiagnostico();
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

        if (!this.#objData) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #getIntIdEstadoDiagnostico() {
        let queryGetIntIdEstadoDiagnostico = await serviceGetIdEstadoDiagnostico({
            strNombre: "En Proceso",
        },this.#objUser);

        if (queryGetIntIdEstadoDiagnostico.error) {
            throw new Error(query.msg);
        }

        this.#intIdEstadoDiagnostico = queryGetIntIdEstadoDiagnostico.data.intId;
    }

    async #setDiagnosticoTecnicas() {
        let dao = new classInterfaceDAOTecnicas();

        let newData = {
            ...this.#objData.objInfoGeneral,
            ...this.#objData.objInfoComMercadeo,
            ...this.#objData.objInfoComProductivo,
            ...this.#objData.objInfoComFinanciero,
            ...this.#objData.objInfoComAdministrativo,
            ...this.#objData.objInfoComAsociativo,
            intIdEmpresario:this.#objData.objInfoGeneral.objEmpresario.intId,
            intIdTipoEmpresario: this.#objData.objInfoGeneral.objEmpresario.intIdTipoEmpresario,
            strUsuarioCreacion: this.#objData.objInfoGeneral.strUsuarioCreacion.strEmail || "",
            strUsuarioActualizacion: this.#objData.objInfoGeneral.strUsuarioCreacion.strEmail || "",
            btFinalizado: false,
        };

        let query = await dao.setDiagnosticoTecnicas(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #updateDiagnostico(){
        let data = {
            intId: this.#objData.objInfoGeneral.intIdDiagnostico,
            intIdEstadoDiagnostico: this.#intIdEstadoDiagnostico
        };
    
        let service = new serviceUpdateDiagnostico(data,this.#objUser);

        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg)
        }
    }
}
module.exports = setDiagnosticoTecnicas;
