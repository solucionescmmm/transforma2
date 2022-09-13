//clases
const classInterfaceDAOPaquetes = require("../infra/conectors/interfaceDAOPaquetes")

class deletePaquetes{
    #intIdPaquete;
    #objResult;

    constructor(objParms) {
        this.#intIdPaquete = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deletePaquetes();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdPaquete) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deletePaquetes(){
        let dao = new classInterfaceDAOPaquetes();
        let query = await dao.deletePaquetes({
            intId: this.#intIdPaquete,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Paquetes"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deletePaquetes