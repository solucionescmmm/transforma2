//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

class deleteAsistentesEventos {

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
        await this.#deleteAsistentesEventos()
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
        if (!this.#objData?.intIdAsistentesEvento) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #deleteAsistentesEventos() {
        let dao = new classInterfaceDAOEventos();

        let newData = {
            intIdAsistentesEvento: this.#objData.intIdAsistentesEvento
        }

        let query = await dao.deleteAsistentesEventos(newData);

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
module.exports = deleteAsistentesEventos;