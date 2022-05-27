//clases
const classInterfaceDAOSedes = require("../infra/conectors/interfaceDAOSedes")

class deleteSedes{
    #intIdSedes;
    #objResult;

    constructor(objParms) {
        this.#intIdSedes = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteSedes();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdSedes) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteSedes(){
        let dao = new classInterfaceDAOSedes();
        let query = await dao.deleteSedes({
            intId: this.#intIdSedes,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Sedes"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteSedes