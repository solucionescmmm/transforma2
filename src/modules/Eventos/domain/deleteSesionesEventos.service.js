
//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

class deleteSesionesEventos {

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