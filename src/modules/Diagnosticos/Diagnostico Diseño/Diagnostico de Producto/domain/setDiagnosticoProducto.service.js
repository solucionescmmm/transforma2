//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOProducto = require("../infra/conectros/interfaseDAODiagnosticoProducto");

//service
const serviceGetIdEstadoDiagnostico = require("../../../Main/domain/getIdEstadoDiagnosticos.service")
const serviceUpdateDiagnostico = require("../../../Main/domain/updateDiagnosticos.service");

class setDiagnosticoProducto {
    #objData;
    #objUser;
    #objResult;

    // Variables
    #intIdEstadoDiagnostico;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getIntIdEstadoDiagnostico()
        await this.#validations();
        await this.#setDiagnosticoProducto();
        await this.#setResultDiagnosticoProducto();
        await this.#updateDiagnostico()
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

        if (!this.#objData) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #getIntIdEstadoDiagnostico() {
        let queryGetIntIdEstadoDiagnostico = await serviceGetIdEstadoDiagnostico({
            strNombre: "En Proceso",
        },this.#objUser);

        if (queryGetIntIdEstadoDiagnostico.error) {
            throw new Error(query.msg);
        }

        this.#intIdEstadoDiagnostico = queryGetIntIdEstadoDiagnostico.data.intId;
    }

    async #setDiagnosticoProducto() {
        let newData = {
            ...this.#objData.objInfoGeneral,
            ...this.#objData.objInfoProductos,
            ...this.#objData.objInfoCategoria1,
            ...this.#objData.objInfoCategoria2,
            ...this.#objData.objInfoNormatividad,
            ...this.#objData.objInfoAdicional,
            intIdEmpresario: this.#objData.objInfoGeneral.objEmpresario?.intId,
            intIdTipoEmpresario: this.#objData.objInfoGeneral.objEmpresario?.intIdTipoEmpresario,
            btFinalizado:false,
            strUsuarioActualizacion: this.#objUser.strEmail,
        };
        let dao = new classInterfaceDAOProducto();

        let query = await dao.setDiagnosticoProducto(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setResultDiagnosticoProducto() {
        let dao = new classInterfaceDAOProducto();

        let query = await dao.setResultDiagnosticoProducto({
            intIdDiagnostico: this.#objData?.objInfoGeneral?.intIdDiagnostico
        });

        if (query.error) {
            throw new Error(query.msg);
        }
    }

    async #updateDiagnostico() {
        let data = {
            intId: this.#objData.objInfoGeneral.intIdDiagnostico,
            intIdEstadoDiagnostico: this.#intIdEstadoDiagnostico
        };

        let service = new serviceUpdateDiagnostico(data, this.#objUser);

        let query = await service.main();

        if (query.error) {
            throw new Error(query.msg)
        }
    }
}
module.exports = setDiagnosticoProducto;
