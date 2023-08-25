//Librerias
const validator = require("validator").default;

//class
const classInterfaceDAODiagnosticos = require("../infra/conectors/interfaseDAODiagnosticos");

//Servicios


class updateFinalizarDiagnosticos {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdEstadoDiagnostico;

    /**
     * @param {object} data
     * @param {object} strDataUser
     */

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        console.log(this.#objData)
        // await this.#validations();
        // await this.#getIntIdEstadoDiagnostico()
        // await this.#updateFinalizarDiagnosticos();
        // return this.#objResult;
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
            strNombre: "Finalizado",
        });

        if (queryGetIntIdEstadoDiagnostico.error) {
            throw new Error(query.msg);
        }

        this.#intIdEstadoDiagnostico = queryGetIntIdEstadoDiagnostico.data.intId;
    }

    async #updateFinalizarDiagnosticos() {
        let dao = new classInterfaceDAODiagnosticos();

        let query = await dao.updateDiagnosticos(this.#objData);

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
module.exports = updateFinalizarDiagnosticos;