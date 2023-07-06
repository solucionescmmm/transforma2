
//librerias
const validator = require("validator").default;

//class
const classInterfaceDAODiagnosticoGeneral = require("../infra/conectors/interfaseDAODiagnosticoGeneral");

class updateFinalizarDiagnosticoGeneral {
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
        await this.#updateFinalizarDiagnosticoGeneral();
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

        if (!this.#objData?.intIdDiagnostico) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #updateFinalizarDiagnosticoGeneral() {
        let dao = new classInterfaceDAODiagnosticoGeneral();

        let newData={
            ...this.#objData,
            btFinalizado:true,
            strUsuarioActualizacion: this.#objUser.strEmail
        }

        let query = await dao.updateFinalizarDiagnosticoGeneral(newData);

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
module.exports = updateFinalizarDiagnosticoGeneral;