
//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

class setEventos{
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
        await this.#validations()
        await this.#setEventos()
        return this.#objResult;
    }

    async #validations(){
        if (!this.#objData) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #setEventos(){
        let newData = {
            ...this.#objData,
            strUsuarioCreacion: this.#objUser.strUsuarioCreacion
        }
        let dao = new classInterfaceDAOEventos();

        let query = await dao.setEventos(newData);

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
module.exports = setEventos;