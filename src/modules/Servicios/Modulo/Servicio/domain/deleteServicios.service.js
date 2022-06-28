//clases
const classInterfaceDAOServicios = require("../infra/conectors/interfaceDAOServicios")

class deleteServicios{
    #intIdServicio;
    #objResult;

    constructor(objParms) {
        this.#intIdServicio = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteServicios();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdServicio) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteServicios(){
        let dao = new classInterfaceDAOServicios();
        let query = await dao.deleteServicios({
            intId: this.#intIdServicio,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Servicio"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteServicios