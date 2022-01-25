//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOProducto = require("../infra/conectros/interfaseDAODiagnosticoProducto")

class setDiagnosticoProducto{
    #objData;
    #objUser;
    #intIdEmpresario;
    #objResult;

    /**
     * @param {object} data
     */
     constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations()
        await this.#getIntIdEmpresario()
        await this.#completeData()
        await this.#setDiagnosticoProducto()
        await this.#setResultDiagnosticoProducto()
        return this.#objResult;
    }

    async #validations(){
        if (
            !validator.isEmail(this.#objUser.strEmail, {
                domain_specific_validation: "cmmmedellin.org",
            })
        ) {
            throw new Error(
                "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
            );
        }

        if (!this.#objData) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #getIntIdEmpresario(){
        this.#intIdEmpresario=this.#objData.objInfoGeneral.intId;
    }

    async #completeData(){
        let newData = {
            intIdEmpresario: this.#intIdEmpresario,
            ...this.#objData.objInfoGeneral,
            ...this.#objData.objInfoProductos,
            ...this.#objData.objInfoCategoria1,
            ...this.#objData.objInfoCategoria2,
            ...this.#objData.objInfoNormatividad,
            ...this.#objData.objInfoAdicional,
        };
        this.#objData = newData;
    }

    async #setDiagnosticoProducto(){

        let dao = new classInterfaceDAOProducto();

        let query = await dao.setDiagnosticoProducto(this.#objData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setResultDiagnosticoProducto(){
        let dao = new classInterfaceDAOProducto();

        let query = await dao.setResultDiagnosticoProducto({intIdEmpresario: this.#intIdEmpresario});

        if (query.error) {
            throw new Error(query.msg);
        }
    }
}
module.exports = setDiagnosticoProducto;