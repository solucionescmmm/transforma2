//clases
const classInterfaceDAODocumento = require("../infra/conectors/interfaceDaoDocumento")

//Functions
const deleteFile = require("../../Empresarios/app/functions/deleteFile")

class deleteDocumento{
    #intIdDocumento;
    #strFileName;
    #objResult;

    constructor(objParms) {
        this.#intIdDocumento = objParms.intId;
        this.#strFileName = objParms.strFileName;
    }

    async main() {
        await this.#validations();
        await this.#deleteDocumento();

        return this.#objResult;
    }

    async #validations() {
        if (!this.#intIdDocumento) {
            throw new Error("Se esperaban parametros de entrada");
        }
    }

    async #deleteDocumento(){
        let dao = new classInterfaceDAODocumento();
        let query = await dao.deleteDocumento({
            intId: this.#intIdDocumento,
        });

        await deleteFile({strFileName:this.#strFileName})

        if (query.error) {
            throw new Error(
                "Ha ocurrido un error al momento de eliminar el Documento"
            );
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteDocumento