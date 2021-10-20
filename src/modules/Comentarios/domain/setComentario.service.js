//Librerias
const validator = require("validator").default;

//class
const classInterfaceDAOComentarios = require("../infra/conectors/interfaceDaoComentarios")

class setComentario{
    #objData;
    #objResult;
    /**
     * @param {object} data
     */
    constructor(data) {
        this.#objData = data;
    }

    async main() {
        await this.#setComentario()
        return this.#objResult;
    }

    async #setComentario(){
        let dao = new classInterfaceDAOComentarios();

        let query = await dao.setComentario(this.#objData);

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
module.exports = setComentario;