//class
const validateDataArray = require("../app/functions/validateSchema");
const interfaceDAOAdmin = require("../infra/conectors/interfaceDAOAdmin");
const classInterfaceDAOCargaMasiva = require("../infra/conectors/interfaceDAOAdmin");

//Librerias
const validator = require("validator").default;

//functions


class setCargaMasiva {
    //obj info
    #objData;
    #objUser;
    #objResult;
    #objDataProcess

    #intIdEstadoTarea

    /**
     * @param {object} data
     * @param {object} strDataUser
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        this.#validations();
        await this.#validationsSchema()
        await this.#validationBusiness()
        await this.#truncateTmpCrearPersonaEmpresaria()
        await this.#setCargaMasiva();
        await this.#sp_setIdeaEmpresario()

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

    async #validationsSchema() {
        const result = validateDataArray(this.#objData);

        if (result.valid) {
            this.#objDataProcess = result.data;
            console.log("Todos los datos son válidos.");
        } else {
            // Lanza un objeto con la estructura deseada
            // console.log(result);
            throw {
                error: true,
                data: result,
                message: "Errores en los datos de entrada."
            };
        }
    }

    async #validationBusiness() {
        const dao = new interfaceDAOAdmin();
        const validationErrors = [];

        console.log(this.#objDataProcess);

        for (let i = 0; i < this.#objDataProcess.length; i++) {
            const currentDocument = this.#objDataProcess[i]?.NumeroDocto?.toString();

            const query = await dao.getNroDocumentoEmpresario({
                strNroDocto: currentDocument,
            });

            if (query.error) {
                throw new Error(query.msg)
            }

            if (query.data) {
                validationErrors.push({
                    index: i + 2,
                    name: `${this.#objDataProcess[i]?.Nombres} ${this.#objDataProcess[i]?.Apellidos}`,
                    document: currentDocument,
                    column: "NumeroDocto",
                    error: `El empresario ya existe en la app.`,
                });
            }

        }

        if (validationErrors.length > 0) {
            throw {
                error: true,
                data: validationErrors,
                message: "Errores en los datos de entrada."
            };
        }
    }


    async #truncateTmpCrearPersonaEmpresaria() {
        const dao = new interfaceDAOAdmin()
        const query = await dao.truncateTmpCrearPersonaEmpresaria()

        if (query.error) {
            throw new Error(query.msg)
        }

    }

    async #setCargaMasiva() {
        let dao = new classInterfaceDAOCargaMasiva();
        let query

        for (let i = 0; i < this.#objDataProcess.length; i++) {
            query = await dao.setCargaMasiva({
                ...this.#objDataProcess[i],
                Celular1: String(this.#objDataProcess[i].Celular1),
                Celular2: String(this.#objDataProcess[i].Celular2)
            })

            if (query.error) {
                throw new Error(query.msg)
            }

        }

        this.#objResult = {
            error: false,
            data: query.data,
            msg: "Los empresarios fueron cargados con exito.",
        };
    }

    async #sp_setIdeaEmpresario() {
        const dao = new interfaceDAOAdmin()
        const query = await dao.sp_setIdeaEmpresario({
            strEmail: this.#objUser.strEmail
        })

        if (query.error) {
            throw new Error(query.msg)
        }

    }
}
module.exports = setCargaMasiva;
