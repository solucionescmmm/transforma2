//clases
const classInterfaceDAOTareas = require("../infra/conectors/interfaceDaoTareas")

class deleteTarea{
    #intIdTarea;
    #objResult;

    constructor(objParms) {
        this.#intIdTarea = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteTarea();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdTarea) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteTarea(){
        let dao = new classInterfaceDAOTareas();
        let query = await dao.deleteTarea({
            intId: this.#intIdTarea,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Tarea"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteTarea