//clases
const classInterfaceDAODiagnosticos = require("../infra/conectors/interfaseDAODiagnosticos")

class deleteDiagnosticos{
    #intIdDiagnosticos;
    #objResult;

    constructor(objParms) {
        this.#intIdDiagnosticos = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteDiagnosticos();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdDiagnosticos) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteDiagnosticos(){
        let dao = new classInterfaceDAODiagnosticos();
        let query = await dao.deleteDiagnosticos({
            intId: this.#intIdDiagnosticos,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Diagnosticos"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteDiagnosticos