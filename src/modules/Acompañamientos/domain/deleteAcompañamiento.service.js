//clases
const classInterfaceDAOAcompañamientos = require("../infra/conectors/interfaceDaoAcompañamientos")

class deleteAcompañamiento{
    #intIdAcompañamiento;
    #objResult;

    constructor(objParms) {
        this.#intIdAcompañamiento = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteAcompañamiento();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdAcompañamiento) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteAcompañamiento(){
        let dao = new classInterfaceDAOAcompañamientos();
        let query = await dao.deleteAcompañamiento({
            intId: this.#intIdAcompañamiento,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Acompañamiento"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteAcompañamiento