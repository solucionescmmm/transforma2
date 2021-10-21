const classInterfaceDAOComentarios = require("../infra/conectors/interfaceDaoComentarios")

class deleteRespuesta{
    #intIdRespuesta;
    #objResult;

    constructor(objParms) {
        this.#intIdRespuesta = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteRespuesta();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdRespuesta) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteRespuesta(){
        let dao = new classInterfaceDAOComentarios();
        let query = await dao.deleteRespuesta({
            intId: this.#intIdRespuesta,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar la respuesta"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteRespuesta