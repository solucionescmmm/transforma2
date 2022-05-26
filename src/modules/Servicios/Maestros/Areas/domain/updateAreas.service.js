//Librerias
const validator = require("validator").default;

//class
const classInterfaceDAOComentarios = require("../infra/conectors/interfaseDAOAreas")

class updateComentario{
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
        await this.#updateComentario()
        return this.#objResult;
    }

    async #validations(){
        if (!this.#objData.intId) {
            throw new Error("Se esperaba parametro de entrada.")   
        }
    }


    async #updateComentario(){
        let dao = new classInterfaceDAOComentarios();

        let query = await dao.updateComentario(this.#objData);

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
module.exports = updateComentario;