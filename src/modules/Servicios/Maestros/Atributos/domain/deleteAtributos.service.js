//clases
const classInterfaceDAOAtributos = require("../infra/conectors/interfaceDAOAtributos")

class deleteAtributos{
    #intIdAtributos;
    #objResult;

    constructor(objParms) {
        this.#intIdAtributos = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteAtributos();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdAtributos) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteAtributos(){
        let dao = new classInterfaceDAOAtributos();
        let query = await dao.deleteAtributos({
            intId: this.#intIdAtributos,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Atributos"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteAtributos