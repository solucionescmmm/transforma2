//clases
const classInterfaceDAOComentarios = require("../infra/conectors/interfaseDAOAreas")

class deleteComentario{
    #intIdComentario;
    #objResult;

    constructor(objParms) {
        this.#intIdComentario = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteComentario();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdComentario) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteComentario(){
        let dao = new classInterfaceDAOComentarios();
        let query = await dao.deleteComentario({
            intId: this.#intIdComentario,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Comentario"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteComentario