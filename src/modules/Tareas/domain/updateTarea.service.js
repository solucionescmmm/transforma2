//Librerias
const validator = require("validator").default;

//class
const classInterfaceDAOTareas = require("../infra/conectors/interfaceDaoTareas")

class updateTarea{
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
        await this.#updateTarea()
        return this.#objResult;
    }

    async #validations(){
        if (!this.#objData.intId) {
            throw new Error("Se esperaba parametro de entrada.")   
        }
    }


    async #updateTarea(){
        let dao = new classInterfaceDAOTareas();

        let query = await dao.updateTarea(this.#objData);

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
module.exports = updateTarea;