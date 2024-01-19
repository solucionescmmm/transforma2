//clases
const classInterfaceDAOSedeTipoTarifaServicio = require("../infra/conectors/interfaceDAOSedeTipoTarifaServicio")

class deleteSedeTipoTarifaServicio{
    #intIdSedeTipoTarifaServicio;
    #objResult;

    constructor(objParms) {
        this.#intIdSedeTipoTarifaServicio = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteSedeTipoTarifaServicio();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdSedeTipoTarifaServicio) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteSedeTipoTarifaServicio(){
        let dao = new classInterfaceDAOSedeTipoTarifaServicio();
        let query = await dao.deleteSedeTipoTarifaServicio({
            intId: this.#intIdSedeTipoTarifaServicio,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el SedeTipoTarifaServicio"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteSedeTipoTarifaServicio