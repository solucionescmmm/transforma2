
//class
const classInterfaceDAOTareas = require("../infra/conectors/interfaceDaoTareas")

class setTarea{
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
        await this.#setTarea()
        return this.#objResult;
    }

    async #validations(){
        if (!this.#objData) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #setTarea(){
        let dao = new classInterfaceDAOTareas();

        let query = await dao.setTarea(this.#objData);

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
module.exports = setTarea;