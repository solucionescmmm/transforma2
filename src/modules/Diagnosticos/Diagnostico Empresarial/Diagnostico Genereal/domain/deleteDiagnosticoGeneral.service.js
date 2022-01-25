//clases
const classInterfaceDAOComentarios = require("../infra/conectors/interfaseDAODiagnosticoGeneral");

class deleteComentario {
    #intIdEmpresario;
    #objResult;

    constructor(objParms) {
        this.#intIdEmpresario = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteDiagnosticoGeneral();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdComentario) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteDiagnosticoGeneral() {
        let dao = new classInterfaceDAOComentarios();
        let query = await dao.deleteDiagnosticoGeneral({
            intId: this.#intIdEmpresario,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Diagnostico General"
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
