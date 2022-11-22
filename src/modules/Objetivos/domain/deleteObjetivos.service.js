//clases
const classInterfaceDAOObjetivos = require("../infra/conectors/interfaseDAOObjetivos")

class deleteObjetivos{
    #intIdObjetivos;
    #objResult;

    constructor(objParms) {
        this.#intIdObjetivos = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteObjetivos();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdObjetivos) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteObjetivos(){
        let dao = new classInterfaceDAOObjetivos();
        let query = await dao.deleteObjetivos({
            intId: this.#intIdObjetivos,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Objetivos"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteObjetivos