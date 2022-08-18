//Librerias
const validator = require("validator").default;

//clases
const classInterfaceDAOComentarios = require("../infra/conectors/interfaceDaoComentarios");

class deleteComentario {
    #objUser;
    #intIdComentario;
    #objResult;

    constructor(objParms, strDataUser) {
        this.#intIdComentario = objParms.intId;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#deleteComentario();

        return this.#objResult;
    }

    async #validations() {
        if (
            !validator.isEmail(this.#objUser.strEmail, {
                domain_specific_validation: "cmmmedellin.org",
            })
        ) {
            throw new Error(
                "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
            );
        }
        if (!this.#intIdComentario) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteComentario() {
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
module.exports = deleteComentario;
