
//librerias
const validator = require("validator").default;

//class
const classInterfaceDAODiagnosticoExpress = require("../infra/conectors/interfaseDAODiagnosticoExpress");

//Services
const serviceUpdateFinalizarDiagnostico = require("../../Main/domain/updateFinalizarDiagnosticos.service")

class updateFinalizarDiagnosticoExpress {
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
        await this.#updateFinalizarDiagnosticoExpress();
        await this.#updateFinalizarDiagnosticoPadre()
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

    async #updateFinalizarDiagnosticoExpress() {
        let dao = new classInterfaceDAODiagnosticoExpress();

        let newData={
            ...this.#objData,
            btFinalizado: true,
            strUsuarioActualizacion: this.#objUser.strEmail
        }

        let query = await dao.updateFinalizarDiagnosticoExpress(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #updateFinalizarDiagnosticoPadre() {
        const service = new serviceUpdateFinalizarDiagnostico(this.#objData, this.#objUser)
        const query = await service.main()

        if (query.error) {
            throw new Error(query.msg);
        }
    }
}
module.exports = updateFinalizarDiagnosticoExpress;