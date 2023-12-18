//class
const classInterfaceDAOTareas = require("../infra/conectors/interfaceDaoTareas");

//Librerias
const validator = require("validator").default;

//functions
const sendEmail = require("../../../common/functions/sendEmail")
const plantillaCorreoTareas = require("../app/functions/plantillaCorreoTareas")

class setTarea {
    //obj info
    #objData;
    #objUser;
    #objResult;

    /**
     * @param {object} data
     * @param {object} strDataUser
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#validations();
        await this.#setTarea();
       // await this.#sendEmail()
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

    async #setTarea() {
        let dao = new classInterfaceDAOTareas();

        let newData = {
            ...this.#objData,
            btFinalizada: 0,
            strUsuarioCreacion:this.#objUser.strEmail,
            strResponsable: JSON.stringify(this.#objData?.strResponsable)
        };

        let query = await dao.setTarea(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #sendEmail(){
        let strMensaje = plantillaCorreoTareas({
            ...this.#objData,
            ...this.#objUser,
        })
        let strEmailResponsables

        if (typeof this.#objData.strResponsable === "object") {
            console.log(this.#objData.strResponsable)
            strEmailResponsables = this.#objData.strResponsable
                .map((e) => {
                    return e.strEmail;
                })
                .join(";");
        }

        console.log(strEmailResponsables)

        const querySendEmail = await sendEmail({
            from:"transforma@demismanos.org",
            to:"snayderlon115@gmail.com",
            cc: "",
            subject:"Nueva tarea",
            message: strMensaje
        })

        console.log(querySendEmail)

        if (querySendEmail.error) {
            this.#objResult={
                ...this.#objResult,
                msg: `La tarea fue registrada con éxito, sin embargo, no fue posible enviar la notificación por correo electrónico debido a un error en el Servicio de Mensajeria.`,
            }
            return;
        }
        
    }
}
module.exports = setTarea;
