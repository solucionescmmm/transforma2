//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOTecnicas = require("../infra/conectors/interfaseDAODiagnosticoTecnicas");

//Service
const serviceGetDiagnostico = require("../../../Main/domain/getDiagnosticos.service")

class setDiagnosticoTecnicas {
     //Objetos
     #objData;
     #objUser;
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

    async #completeData() {
        let newData = {
            //intIdEmpresario: this.#intIdEmpresario,
            ...this.#objData.objInfoGeneral,
            ...this.#objData.objInfoComMercadeo,
            ...this.#objData.objInfoComProductivo,
            ...this.#objData.objInfoComFinanciero,
            ...this.#objData.objInfoComAdministrativo,
            ...this.#objData.objInfoComAsociativo,
            intIdEmpresario: 16,
            intTipoEmpresario: 1
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
