//clases
const classInterfaceDAOTercero = require("../infra/conectors/interfaceDaoTercero")

class deleteTercero{
    #intIdTercero;
    #objResult;

    constructor(objParms) {
        this.#intIdTercero = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteTercero();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdTercero) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteTercero(){
        let dao = new classInterfaceDAOTercero();
        let query = await dao.deleteTercero({
            intId: this.#intIdTercero,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Tercero"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteTercero