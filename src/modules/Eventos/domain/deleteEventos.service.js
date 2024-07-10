
//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

//service
const serviceGetSesionesEventos = require("./getSesionesEventos.service")
const serviceGetAsistentesEventos = require("./getAsistentesEventos.service")

class deleteEventos {

    //objects
    #objData;
    #objUser;
    #objResult;

    //variable
    #intNumSesionesEventos;
    #intNumAsistentesEventos;

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getSesionesEventos()
        await this.#getAsistentesEventos()
        await this.#validations()
        await this.#deleteAreasEventos()
        await this.#deleteEventos()
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

        if (!this.#objData?.intIdEvento) {
            throw new Error("Se esperaban parámetros de entrada.");
        }

        if (this.#intNumSesionesEventos >= 1) {
            throw new Error("No se puede eliminar el evento, tiene una o mas sesiones que dependen del evento.");
        }

        if (this.#intNumAsistentesEventos >= 1) {
            throw new Error("No se puede eliminar el evento, tiene personas registradas que depende del evento.");
        }
    }

    async #getSesionesEventos() {
        let queryGetSesionesEventos = await serviceGetSesionesEventos({
            intIdEvento: this.#objData.intIdEvento,
        }, this.#objUser);

        if (queryGetSesionesEventos.error) {
            throw new Error(queryGetSesionesEventos.msg);
        }

        this.#intNumSesionesEventos = queryGetSesionesEventos.data?.length
    }

    async #getAsistentesEventos() {
        let queryGetSesionesEventos = await serviceGetAsistentesEventos({
            intIdEvento: this.#objData.intIdEvento,
        }, this.#objUser);

        if (queryGetSesionesEventos.error) {
            throw new Error(queryGetSesionesEventos.msg);
        }

        this.#intNumAsistentesEventos = queryGetSesionesEventos.data?.length
    }

    async #deleteEventos() {
        let dao = new classInterfaceDAOEventos();

        let newData = {
            intIdEvento: this.#objData.intIdEvento
        }

        let query = await dao.deleteEventos(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #deleteAreasEventos() {
        let dao = new classInterfaceDAOEventos();

        let newData = {
            intIdEvento: this.#objData.intIdEvento
        }

        let query = await dao.deleteAreasEventos(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

    }

}
module.exports = deleteEventos;