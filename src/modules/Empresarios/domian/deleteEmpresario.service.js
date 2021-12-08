//clases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");
const serviceDeleteComentario = require("../../Comentarios/domain/deleteComentario.service")


class deleteEmpresario {
    #intIdEmpresario;
    #objResult;

    constructor(objParms) {
        this.#intIdEmpresario = objParms.intId;
    }

    async main() {
        await this.#validations();
        await this.#deleteInfoEmpresa();
        await this.#deleteEmpresarioSecundario();
        await this.#deleteInfoAdicional()
        await this.#deleteEmpresario();
        await this.#deleteComentario();
        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdEmpresario) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteEmpresario() {
        let dao = new classInterfaceDAOEmpresarios();
        let query = await dao.deleteEmpresario({
            intId: this.#intIdEmpresario,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el empresario"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #deleteInfoEmpresa() {
        let dao = new classInterfaceDAOEmpresarios();
        let query = await dao.deleteInfoEmpresa({
            intId: this.#intIdEmpresario,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar la información de la empresa asociada al empresario"
            );
        }
    }

    async #deleteInfoAdicional() {
        let dao = new classInterfaceDAOEmpresarios();
        let query = await dao.deleteInfoAdicional({
            intId: this.#intIdEmpresario,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar la información de la adicional asociada al empresario"
            );
        }
    }

    async #deleteEmpresarioSecundario() {
        let dao = new classInterfaceDAOEmpresarios();
        let query = await dao.deleteEmpresarioSecundario({
            intId: this.#intIdEmpresario,
        });

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el o los empresarios secundarios asociados al empresario principal"
            );
        }
    }

    async #deleteComentario(){
        let objParams= {
            intIdEmpresario:this.#intIdEmpresario
        }
        
            let service = new serviceDeleteComentario(objParams)
            let query = await service.main();

            if (query.error) {
                throw new Error(query.msg);
            }
    }

    async #deleteDiagnosticGeneral(){

    }
    
}

module.exports = deleteEmpresario;
