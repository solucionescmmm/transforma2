//class
const classInterfaceDAOTareas = require("../infra/conectors/interfaceDaoTareas");

//Librerias
const validator = require("validator").default;

//Service
const serviceGetIdeaEmpresario = require("../../Empresarios/domian/getIdeaEmpresario.service")

//functions
const sendEmail = require("../../../common/functions/sendEmail")
const plantillaCorreoTareas = require("../app/functions/plantillaCorreoTareas")

class updateTarea {
    //obj info
    #objData;
    #objUser;
    #objResult;
    #objIdea

    #strNombreEstado

    /**
     * @param {object} data
     * @param {object} strDataUser
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        console.log(this.#objData);
        await this.#getEstadoTarea();
        await this.#getIdea()
        await this.#validations();
        await this.#updateTarea();
        await this.#sendEmail()
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

    async #getEstadoTarea() {
        const dao = new classInterfaceDAOTareas()
        let queryGetIdEstado = await dao.getEstadoTarea({
            intId: this.#objData.intIdEstado
        }, this.#objUser);

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#strNombreEstado = queryGetIdEstado.data[0]?.strNombre
    }

    async #updateTarea() {
        let dao = new classInterfaceDAOTareas();

        let newData = {
            ...this.#objData,
            btFinalizada: this.#strNombreEstado === "Realizada" ? 1 : this.#strNombreEstado === "Atendida, no tomada" ? 1 : this.#strNombreEstado === "Cancelada" ? 1 : 0,
            strUsuarioActualizacion: this.#objUser.strEmail,
            intIdEstadoTarea: this.#objData.intIdEstado,
            intIdAreaResponsable: this.#objData.strArea?.intId,
            strResponsable: JSON.stringify(this.#objData?.strResponsable)
        };

        let query = await dao.updateTarea(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #getIdea() {
        let queryGetIdEstado = await serviceGetIdeaEmpresario({
            intIdIdea: this.#objData.intIdIdea,
        }, this.#objUser);

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#objIdea = queryGetIdEstado.data;
    }

    async #sendEmail() {
        const objDataEmpresarioPrincipal = this.#objIdea[0].objEmpresario.find((e) => e.strTipoEmpresario === "Principal")
        const strNombreIdea = this.#objIdea[0].strNombre;
        const strNombreEmpresario = `${objDataEmpresarioPrincipal.strNombres} ${objDataEmpresarioPrincipal.strApellidos}`
        const intIdIdea = this.#objIdea[0]?.intId
        const strEstado = this.#strNombreEstado


        let strMensaje = plantillaCorreoTareas({
            ...this.#objData,
            ...this.#objUser,
            strNombreIdea,
            strNombreEmpresario,
            intIdIdea,
            strEstado
        })

        let arrEmailTo = []

        if (typeof this.#objData.strResponsable === "object") {
            const array = this.#objData.strResponsable

            for (let i = 0; i < array.length; i++) {
                arrEmailTo.push({
                    email: array[i]?.strEmail
                })

            }
        }

        const querySendEmail = await sendEmail({
            from: {
                name: "Transforma Notificaciones",
                email: "transforma@demismanos.org"
            },
            to: arrEmailTo,
            cc: "",
            subject: "Nueva tarea",
            message: strMensaje
        })


        if (querySendEmail.error) {
            this.#objResult = {
                ...this.#objResult,
                msg: `La tarea fue registrada con éxito, sin embargo, no fue posible enviar la notificación por correo electrónico debido a un error en el Servicio de Mensajeria.`,
            }
            return;
        }

    }
}
module.exports = updateTarea;