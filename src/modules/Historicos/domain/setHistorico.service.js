
//class
const classInterfaceDAOHistoricos = require("../infra/conectors/interfaceDAOHistoricos")

class setHistorico{
    #objData;
    #objResult;
    /**
     * @param {object} data
     */
    constructor(data) {
        this.#objData = data;
    }

    async main() {
        await this.#validations()
        await this.#setHistorico()
        return this.#objResult;
    }

    async #validations(){
        if (!this.#objData) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #setHistorico(){
        let dao = new classInterfaceDAOHistoricos();

        let query = await dao.setHistorico(this.#objData);

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
module.exports = setHistorico;