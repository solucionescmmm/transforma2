//Librerias
const validator = require("validator").default;
//clases
const classInterfaceDAODiagnosticos = require("../infra/conectors/interfaseDAODiagnosticos")

//Service
const serviceGetDiagnosticosHijos = require("./getDiagnosticosHijos.service");

class deleteDiagnosticos{
    #objData;
    #objUser;
    #objResult;

    #bitTieneHijos;

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getDiagnosticosHijos()
        await this.#validations();
        await this.#deleteDiagnosticos();

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
        if (!this.#objData?.intIdDiagnostico) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
        if (this.#bitTieneHijos) {
            throw new Error("No se puede elimnar el diagnóstico, ya tiene información asociada")
        }
    }

    async #getDiagnosticosHijos(){
        const query = await serviceGetDiagnosticosHijos(
            {
                intId: this.#objData?.intIdDiagnostico,
            },
            this.#objUser
        );

        if (query.error) {
            throw new Error(query.msg);
        }

        const data = query.data[0];

        if (
            data.objDiagnosticoGeneral || 
            data.objDiagnosticoHumanoSocial ||
            data.objDiagnosticoCompetenciasTecnicas ||
            data.objDiagnosticoProductos ||
            data.objDiagnosticoServicios 
        ) {
            this.#bitTieneHijos = true
        }
    }

    async #deleteDiagnosticos(){
        let dao = new classInterfaceDAODiagnosticos();

        let query = await dao.deleteDiagnosticos({
            intId: this.#objData?.intIdDiagnostico,
        });

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

}
module.exports = deleteDiagnosticos