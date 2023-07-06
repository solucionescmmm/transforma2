//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOProducto = require("../infra/conectros/interfaseDAODiagnosticoProducto");

class updateFinalizarDiagnosticoProducto {
    #objData;
    #objUser;
    #objResult;

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#updateFinalizarDiagnosticoProducto();
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

    async #updateFinalizarDiagnosticoProducto() {
        let dao = new classInterfaceDAOProducto();

        let newData = {
            ...this.#objData,
            btFinalizado: true,
            strUsuarioActualizacion: this.#objUser.strEmail
        }

        let query = await dao.updateFinalizarDiagnosticoProducto(newData);

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
module.exports = updateFinalizarDiagnosticoProducto;
