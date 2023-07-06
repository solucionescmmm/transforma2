//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOHumanas = require("../infra/conectors/interfaseDAODiagnosticoHumanas");


class updateFinalizarDiagnosticoHumanas {
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
        await this.#updateFinalizarDiagnosticoHumanas();

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

    async #updateFinalizarDiagnosticoHumanas() {
        let dao = new classInterfaceDAOHumanas();

        let newData={
            ...this.#objData,
            btFinalizado:true,
            strUsuarioActualizacion: this.#objUser.strEmail
        }

        let query = await dao.updateFinalizarDiagnosticoHumanas(newData);

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
module.exports = updateFinalizarDiagnosticoHumanas;