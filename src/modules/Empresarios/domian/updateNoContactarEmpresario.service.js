//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//Servicios
const serviceGetIdTipoEmpresario = require("./getIdTipoEmpresario.service");
const serviceGetIdEstado = require("../../Estados/domain/getIdEstado.service");

class updateNoContactarEmpresario {
    #objData;
    #objUser;
    #objResult;
    #intIdEstado;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        //console.log(this.#objData)
        await this.#validations();
        await this.#updateNoContactarEmpresario();

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
    }

    async #updateNoContactarEmpresario() {
        let newData = {
            intId:this.#objData.intId,
            btNoContactar:true,
            strUsuario: this.#objUser.strEmail,
        };
        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateNoContactarEmpresario(newData);

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }
}
module.exports = updateNoContactarEmpresario;
