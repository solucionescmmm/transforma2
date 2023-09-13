//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

class deleteAsistentesSesionesEventos {

    //objects
    #objData;
    #objUser;
    #objResult;

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations()
        await this.#deleteAsistentesSesionesEventos()
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
        if (!this.#objData?.intIdSesion && !this.#objData?.intIdAsistenteEvento) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #deleteAsistentesSesionesEventos() {
        let dao = new classInterfaceDAOEventos();

        let newData = {
            intIdSesion: this.#objData.intIdSesion,
            intIdAsistenteEvento: this.#objData.intIdAsistenteEvento
        }

        let query = await dao.deleteAsistentesSesionesEventos(newData);

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
module.exports = deleteAsistentesSesionesEventos;