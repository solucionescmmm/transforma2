//clases
const classInterfaceDAOAreasServicios = require("../infra/conectors/interfaseDAOAreasServicios")

class deleteAreasServicios{
    #intIdAreasServicios;
    #objResult;

    constructor(objParms) {
        this.#intIdAreasServicios = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteAreasServicios();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdAreasServicios) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteAreasServicios(){
        let dao = new classInterfaceDAOAreasServicios();
        let query = await dao.deleteAreasServicios({
            intId: this.#intIdAreasServicios,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el AreasServicios"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteAreasServicios