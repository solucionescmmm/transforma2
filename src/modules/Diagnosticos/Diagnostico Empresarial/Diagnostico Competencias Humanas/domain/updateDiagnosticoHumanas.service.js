//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOHumanas = require("../infra/conectors/interfaseDAODiagnosticoHumanas");

class updateDiagnosticoHumanas {
    #objData;
    #objUser;
    #intIdEmpresario;
    #objResult;

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#getIntIdEmpresario();
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

    async #getIntIdEmpresario() {
        this.#intIdEmpresario = this.#objData.objInfoGeneral.intId;
    }

    async #completeData() {
        let newData = {
            intIdEmpresario: this.#intIdEmpresario,
            ...this.#objData.objInfoGeneral,
            strUsuarioActualizacion: this.#objUser.strEmail,
            ...this.#objData.objInfoEncuestaHumanas,
        };
        this.#objData = newData;
    }

    async #updateDiagnosticoHumanas() {
        let dao = new classInterfaceDAOHumanas();

        let query = await dao.updateDiagnosticoHumana(this.#objData);

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
            intIdEmpresario: this.#intIdEmpresario,
        });

        if (query.error) {
            throw new Error(query.msg);
        }
    }
}
module.exports = updateDiagnosticoHumanas;