
//class
const classInterfaceDAOHistoricos = require("../infra/conectors/interfaceDAOHistoricos")

class updateHistorico{
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
        await this.#updateHistorico()
        return this.#objResult;
    }

    async #validations(){
        if (!this.#objData) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #updateHistorico(){
        let dao = new classInterfaceDAOHistoricos();

        let query = await dao.updateHistorico(this.#objData);

        if (query.error) {
            throw new Error(query.msg);
        }


        this.#objResult = {
            error: query.error,
            msg: query.msg,
        };
    }

}
module.exports = updateHistorico;