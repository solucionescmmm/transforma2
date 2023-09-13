
//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

//service
const serviceGetAsistentesSesionesEventos = require("./getAsistentesSesionesEventos.service")

class deleteSesionesEventos {

    //objects
    #objData;
    #objUser;
    #objResult;

    //variables
    #intNumAsistentesEventos

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getAsistentesSesionesEventos()
        await this.#validations()
        await this.#deleteSesionesEventos()
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

    async #getAsistentesSesionesEventos() {
        let queryGetSesionesEventos = await serviceGetAsistentesSesionesEventos({
            intIdSesion: this.#objData.intIdSesionesEvento,
        }, this.#objUser);

        if (queryGetSesionesEventos.error) {
            throw new Error(queryGetSesionesEventos.msg);
        }

        this.#intNumAsistentesEventos = queryGetSesionesEventos.data?.length
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

}
module.exports = deleteSesionesEventos;