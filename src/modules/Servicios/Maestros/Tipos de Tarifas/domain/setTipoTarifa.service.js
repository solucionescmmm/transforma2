//class
const classInterfaceDAOTipoTarifa = require("../infra/conectors/interfaceDAOTipoTarifa");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");

class setTipoTarifa {
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdEstado;
    /**
     * @param {object} data
     */
    constructor(data,strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#getIdEstado();
        this.#completeData();
        await this.#setTipoTarifa();
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

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: "En borrador",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstado = queryGetIdEstado.data.intId;
    }

    #completeData() {
        let newData = {
            ...this.#objData,
            intIdEstado: this.#intIdEstado,
        };
        this.#objData = newData;

        console.log(this.#objData);
    }

    async #setTipoTarifa() {
        let dao = new classInterfaceDAOTipoTarifa();

        let query = await dao.setTipoTarifa(this.#objData);

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
module.exports = setTipoTarifa;