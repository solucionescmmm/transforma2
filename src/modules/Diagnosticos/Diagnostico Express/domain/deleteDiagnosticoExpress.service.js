//clases
const classInterfaceDAOComentarios = require("../infra/conectors/interfaseDAODiagnosticoExpress");

class deleteComentario {
    #intIdEmpresario;
    #objResult;

    constructor(objParms) {
        this.#intIdEmpresario = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteDiagnosticoExpress();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdComentario) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteDiagnosticoExpress() {
        let dao = new classInterfaceDAOComentarios();
        let query = await dao.deleteDiagnosticoExpress({
            intId: this.#intIdEmpresario,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Diagnostico Express"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }
}
module.exports = deleteComentario;
