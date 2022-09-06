//clases
const classInterfaceDAOProyectosEspeciales = require("../infra/conectors/interfaseDAOProyectosEspeciales")

class deleteProyectosEspeciales{
    #intIdProyectosEspeciales;
    #objResult;

    constructor(objParms) {
        this.#intIdProyectosEspeciales = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteProyectosEspeciales();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdProyectosEspeciales) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteProyectosEspeciales(){
        let dao = new classInterfaceDAOProyectosEspeciales();
        let query = await dao.deleteProyectosEspeciales({
            intId: this.#intIdProyectosEspeciales,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el ProyectosEspeciales"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteProyectosEspeciales