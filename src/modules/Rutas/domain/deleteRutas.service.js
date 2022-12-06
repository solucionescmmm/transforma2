//clases
const classInterfaceDAORutas = require("../infra/conectors/interfaseDAORutas")

//Servicios
const serviceGetRutas = require("./getRutas.service")

class deleteRutas{
    #intIdRutas;
    #objResult;

    constructor(objParms) {
        this.#intIdRutas = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteRutas();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdRutas) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteRutas(){
        let dao = new classInterfaceDAORutas();
        let query = await dao.deleteRutas({
            intId: this.#intIdRutas,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Rutas"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteRutas