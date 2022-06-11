//clases
const classInterfaceDAOTiposServicios = require("../infra/conectors/interfaceDAOTiposServicios")

class deleteTiposServicios{
    #intIdTiposServicios;
    #objResult;

    constructor(objParms) {
        this.#intIdTiposServicios = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteTiposServicios();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdTiposServicios) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteTiposServicios(){
        let dao = new classInterfaceDAOTiposServicios();
        let query = await dao.deleteTiposServicios({
            intId: this.#intIdTiposServicios,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el TiposServicios"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteTiposServicios