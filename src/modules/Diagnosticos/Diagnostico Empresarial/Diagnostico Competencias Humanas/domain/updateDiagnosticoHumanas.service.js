//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOHumanas = require("../infra/conectors/interfaseDAODiagnosticoHumanas");

class updateDiagnosticoHumanas {
    //Objetos
    #objData;
    #objUser;
    #objResult;

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#completeData();
        await this.#updateDiagnosticoHumanas();
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

    async #completeData() {
        let newData = {
            ...this.#objData.objInfoGeneral,
            ...this.#objData.objInfoEncuestaHumanas,
            strEquilibrioVida: JSON.stringify(this.#objData?.objInfoEncuestaHumanas?.strEquilibrioVida || ""),
            strRedesApoyoOtros: JSON.stringify(this.#objData?.objInfoEncuestaHumanas?.strRedesApoyoOtros || ""),
            strSituacionesDesistirEmprendimiento: JSON.stringify(this.#objData?.objInfoEncuestaHumanas?.strSituacionesDesistirEmprendimiento || ""),
            intIdEmpresario: this.#objData.objInfoGeneral.objEmpresario?.intId,
            intIdTipoEmpresario: this.#objData.objInfoGeneral.objEmpresario?.intIdTipoEmpresario,
            dtmFechaSesion: this.#objData.objInfoGeneral.dtmFechaSesion,
            strUsuarioActualizacion: this.#objUser.strEmail,
        };
        this.#objData = newData;
    }

    async #updateDiagnosticoHumanas() {
        let dao = new classInterfaceDAOHumanas();

        let query = await dao.updateDiagnosticoHumanas(this.#objData);

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
            intIdDiagnostico: this.#objData?.objInfoGeneral?.intIdDiagnostico
        });

        if (query.error) {
            throw new Error(query.msg);
        }
    }
}
module.exports = updateDiagnosticoHumanas;