//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOHumanas = require("../infra/conectors/interfaseDAODiagnosticoHumanas");

//Service
const serviceGetDiagnostico = require("../../../Main/domain/getDiagnosticos.service");

class setDiagnosticoHumanas {
    //Objetos
    #objData;
    #objUser;
    #objResult;

    // Variables
    #intIdEstadoDiagnsotico;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#getDiagnostico()
        await this.#completeData();
        await this.#setDiagnosticoHumanas();
        await this.#setResultDiagnosticoHumanas();
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

    async #getDiagnostico() {
        let queryServiceGetDiagnostico = await serviceGetDiagnostico({
            intIdIdea: this.#objData?.objInfoGeneral?.intIdIdea,
            intId: this.#objData?.objInfoGeneral?.intIdDiagnostico
        },this.#objUser)

        if (queryServiceGetDiagnostico.error) {
            throw new Error(queryServiceGetDiagnostico.msg)
        }

        this.#intIdEstadoDiagnsotico = queryServiceGetDiagnostico.data[0]?.intIdEstadoDiagnostico
    }

    async #completeData() {
        let newData = {
            //intIdEmpresario: this.#intIdEmpresario,
            ...this.#objData.objInfoGeneral,
            ...this.#objData.objInfoEncuestaHumanas,
            intIdEstadoDiagnostico: this.#intIdEstadoDiagnsotico,
            strEquilibrioVida: JSON.stringify(this.#objData?.objInfoEncuestaHumanas?.strEquilibrioVida || ""),
            strSituacionesDesistirEmprendimiento: JSON.stringify(this.#objData?.objInfoEncuestaHumanas?.strSituacionesDesistirEmprendimiento || ""),
            intIdEmpresario: 16,
            intIdTipoEmpresario: 1
        };
        this.#objData = newData;
    }

    async #setDiagnosticoHumanas() {
        let dao = new classInterfaceDAOHumanas();

        let query = await dao.setDiagnosticoHumanas(this.#objData);
        
        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setResultDiagnosticoHumanas() {
        let dao = new classInterfaceDAOHumanas();

        let query = await dao.setResultDiagnosticoHumanas({
            intIdEmpresario: this.#objData?.objInfoGeneral?.intIdDiagnostico
        });

        if (query.error) {
            throw new Error(query.msg);
        }
    }
}
module.exports = setDiagnosticoHumanas;
