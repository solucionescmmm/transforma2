
//class
const classInterfaceDAOComentarios = require("../infra/conectors/interfaceDaoComentarios")

class updateRespuesta{
    #objData;
    #objResult;
    /**
     * @param {object} data
     */
    constructor(data) {
        this.#objData = data;
    }

    async main() {
        await this.#updateRespuesta()
        return this.#objResult;
    }


    async #updateRespuesta(){
        let dao = new classInterfaceDAOComentarios();

        let query = await dao.updateRespuesta(this.#objData);

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
module.exports = updateRespuesta;