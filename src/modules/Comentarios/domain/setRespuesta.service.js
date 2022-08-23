//Librerias
const validator = require("validator").default;

//class
const classInterfaceDAOComentarios = require("../infra/conectors/interfaceDaoComentarios")

class setRespuesta{
    //obj info
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
        await this.#setRespuesta()
        return this.#objResult;
    }

    async #validations(){
        if (!this.#objData) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #setRespuesta(){
        let newData = {
            ...this.#objData,
            strUsuarioCreacion:this.#objData.strUsuarioCreacion
        }
        let dao = new classInterfaceDAOComentarios();

        let query = await dao.setRespuesta(newData);

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
module.exports = setRespuesta;