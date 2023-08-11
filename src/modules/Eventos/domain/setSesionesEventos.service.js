//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

//service


class setSesionesEventos {

    //objects
    #objData;
    #objUser;
    #objResult;

    //variables
    #intNumSesiones
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations()
        await this.#getEventos()
        await this.#setSesionesEventos()
        await this.#updateEventos()

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

    async #getEventos() {
        let dao = new classInterfaceDAOEventos();

        let query = await dao.getIntNumSesiones({
            intId: this.#objData.intIdEvento
        })

        if (query.error) {
            throw new Error(query.msg)
        }


        this.#intNumSesiones = query.data[0]?.intNumSesiones
    }

    async #setSesionesEventos() {
        let newData = {
            ...this.#objData,
            strNombreModulo: this.#objData.strNombre,
            intAreaResponsable: this.#objData.strArea?.intId,
            strResponsables: JSON.stringify(this.#objData?.strResponsables || ""),
            btFinalizado: false,
        }

        let dao = new classInterfaceDAOEventos();

        let query = await dao.setSesionesEventos(newData);

        console.log(query)

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #updateEventos() {
        let dao = new classInterfaceDAOEventos();

        let data = {
            intId: this.#objData.intIdEvento,
            intNumSesiones: this.#intNumSesiones + 1
        }

        let query = await dao.updateEventos(data);

        if (query.error) {
            throw new Error(query.msg);
        }
    }

}
module.exports = setSesionesEventos;