//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOServicio = require("../infra/conectors/interfaseDAODiagnosticoServicio");

class updateDiagnosticoServicio {
    #objData;
    #objUser;
    #objResult;

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#updateDiagnosticoServicio();
        await this.#setResultDiagnosticoServicio();
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

    async #updateDiagnosticoServicio() {
        let dao = new classInterfaceDAOServicio();

        let newData = {
            ...this.#objData.objInfoGeneral,
            ...this.#objData.objInfoEvaluacion,
            ...this.#objData.objInfoNormatividad,
            ...this.#objData.objInfoAdicional,
            intIdEmpresario: this.#objData.objInfoGeneral.objEmpresario?.intId,
            intIdTipoEmpresario: this.#objData.objInfoGeneral.objEmpresario?.intIdTipoEmpresario,
            strUsuarioActualizacion: this.#objData.objInfoGeneral.strUsuarioCreacion.strEmail || "",
        };

        let query = await dao.updateDiagnosticoServicio(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setResultDiagnosticoServicio() {
        let dao = new classInterfaceDAOServicio();

        let query = await dao.setResultDiagnosticoServicio({
            intIdDiagnostico: this.#objData?.objInfoGeneral?.intIdDiagnostico
        });

        if (query.error) {
            throw new Error(query.msg);
        }
    }
}
module.exports = updateDiagnosticoServicio;
