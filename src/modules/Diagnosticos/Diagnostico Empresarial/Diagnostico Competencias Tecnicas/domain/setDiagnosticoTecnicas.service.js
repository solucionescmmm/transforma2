//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOTecnicas = require("../infra/conectors/interfaseDAODiagnosticoTecnicas");

class setDiagnosticoTecnicas {
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
        await this.#getIntIdEmpresario();
        await this.#completeData();
        await this.#setDiagnosticoTecnicas();
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

    async #getIntIdEmpresario() {
        this.#intIdEmpresario = this.#objData.objInfoGeneral.intId;
    }

    async #completeData() {
        let newData = {
            intIdEmpresario: this.#intIdEmpresario,
            ...this.#objData.objInfoGeneral,
            ...this.#objData.objInfoComMercadeo,
            ...this.#objData.objInfoComProductivo,
            ...this.#objData.objInfoComFinanciero,
            ...this.#objData.objInfoComAdministrativo,
            ...this.#objData.objInfoComAsociativo,
        };
        this.#objData = newData;
    }

    async #setDiagnosticoTecnicas() {
        let dao = new classInterfaceDAOTecnicas();

        let query = await dao.setDiagnosticoTecnicas(this.#objData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }
}
module.exports = setDiagnosticoTecnicas;
