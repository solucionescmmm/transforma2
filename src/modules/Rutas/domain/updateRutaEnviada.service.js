//Librerias
const validator = require("validator").default;

//class
const classInterfaceDAORutas = require("../infra/conectors/interfaseDAORutas");

//Servicios
const serviceGetIdEstado = require("./getIdEstadoRutas.service");

class updateRutaEnviada {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdEstado;

    /**
     * @param {object} data
     * @param {object} strDataUser
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getIdEstado();
        await this.#validations();
        await this.#updateRuta();

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
        if (!this.#objData.intId) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: "Enviada",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstado = queryGetIdEstado.data.intId;
    }

    async #updateRuta() {
        let dao = new classInterfaceDAORutas();

        let newData = {
            intId: this.#objData.intId,
            intIdEstadoRuta: this.#intIdEstado,
            strUsuarioActualizacion: this.#objUser.strEmail,
        };

        let query = await dao.updateRutas(newData);

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
module.exports = updateRutaEnviada;