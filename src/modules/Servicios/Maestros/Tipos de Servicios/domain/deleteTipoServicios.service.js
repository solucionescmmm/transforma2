//clases
const classInterfaceDAOTipoTarifa = require("../infra/conectors/interfaceDAOTipoTarifa")

class deleteTipoTarifa{
    #intIdTipoTarifa;
    #objResult;

    constructor(objParms) {
        this.#intIdTipoTarifa = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteTipoTarifa();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdTipoTarifa) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteTipoTarifa(){
        let dao = new classInterfaceDAOTipoTarifa();
        let query = await dao.deleteTipoTarifa({
            intId: this.#intIdTipoTarifa,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el TipoTarifa"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteTipoTarifa