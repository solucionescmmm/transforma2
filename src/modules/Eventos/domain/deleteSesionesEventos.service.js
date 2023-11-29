
//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

//service
const serviceGetAsistentesSesionesEventos = require("./getAsistentesSesionesEventos.service")
//const serviceGetSesionesEventos = require("./getSesionesEventos.service")

class deleteSesionesEventos {

    //objects
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdEvento;
    #intNumSesiones;
    #intNumAsistentesEventos;

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getSesionesEventos()
        await this.#getAsistentesSesionesEventos()
        await this.#getIntNumSesiones()
        await this.#validations()
        await this.#deleteSesionesEventos()
        await this.#updateEventos();
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

        if (!this.#objData?.intIdSesionesEvento) {
            throw new Error("Se esperaban parámetros de entrada.");
        }

        if (this.#intNumAsistentesEventos >= 1) {
            throw new Error("No se puede eliminar esta sesión, ya tiene asistencias guardadas.");
        }
    }

    async #getSesionesEventos() {
        let dao = new classInterfaceDAOEventos();

        let queryGetSesionesEventos = await dao.getSesionesEventos({
            intId: this.#objData.intIdSesionesEvento
        })

        if (queryGetSesionesEventos.error) {
            throw new Error(queryGetSesionesEventos.msg);
        }

        this.#intIdEvento = queryGetSesionesEventos.data[0]?.intIdEvento
    }

    async #getAsistentesSesionesEventos() {
        let queryGetAsistentesSesionesEventos = await serviceGetAsistentesSesionesEventos({
            intIdSesion: this.#objData.intIdSesionesEvento,
        }, this.#objUser);

        if (queryGetAsistentesSesionesEventos.error) {
            throw new Error(queryGetAsistentesSesionesEventos.msg);
        }

        this.#intNumAsistentesEventos = queryGetAsistentesSesionesEventos.data?.length
    }

    async #getIntNumSesiones() {
        let dao = new classInterfaceDAOEventos();

        let query = await dao.getIntNumSesiones({
            intId: this.#intIdEvento
        })

        if (query.error) {
            throw new Error(query.msg)
        }

        this.#intNumSesiones = query.data[0]?.intNumSesiones
    }
    
    async #deleteSesionesEventos() {
        let dao = new classInterfaceDAOEventos();

        let newData = {
            intIdSesionesEvento: this.#objData.intIdSesionesEvento
        }

        let query = await dao.deleteSesionesEventos(newData);

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
            intId: this.#intIdEvento,
            intNumSesiones: this.#intNumSesiones - 1
        }

        let query = await dao.updateEventos(data);

        if (query.error) {
            throw new Error(query.msg);
        }
    }

}
module.exports = deleteSesionesEventos;