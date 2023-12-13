
//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos");

class updateFinalizarSesionesEventos {
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
        await this.#updateFinalizarSesionesEventos();
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

        if (!this.#objData?.intId) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #updateFinalizarSesionesEventos() {
        let dao = new classInterfaceDAOEventos();

        let newData={
            ...this.#objData,
            btFinalizado:true,
        }

        let query = await dao.updateSesionesEventos(newData);

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
module.exports = updateFinalizarSesionesEventos;