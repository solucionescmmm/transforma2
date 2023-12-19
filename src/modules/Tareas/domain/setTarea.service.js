//class
const classInterfaceDAOTareas = require("../infra/conectors/interfaceDaoTareas");

//Librerias
const validator = require("validator").default;

//Service
const serviceGetIdeaEmpresario = require("../../Empresarios/domian/getIdeaEmpresario.service")

//functions
const sendEmail = require("../../../common/functions/sendEmail")
const plantillaCorreoTareas = require("../app/functions/plantillaCorreoTareas")

class setTarea {
    //obj info
    #objData;
    #objUser;
    #objResult;
    #objIdea;

    /**
     * @param {object} data
     * @param {object} strDataUser
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        //console.log(this.#objData)
        await this.#validations();
        await this.#getIdea()
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

    async #getIdea() {
        let queryGetIdEstado = await serviceGetIdeaEmpresario({
            intIdIdea: this.#objData.intIdIdea,
        },this.#objUser);

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#objIdea = queryGetIdEstado.data;

        console.log(this.#objIdea[0].strNombre, this.#objIdea[0].objEmpresario.find((e)=> e.strTipoEmpresario === "Principal").strNombres)
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
        const objDataEmpresarioPrincipal = this.#objIdea[0].objEmpresario.find((e)=> e.strTipoEmpresario === "Principal")
        const strNombreIdea = this.#objIdea[0].strNombre;
        const strNombreEmpresario = `${objDataEmpresarioPrincipal.strNombres} ${objDataEmpresarioPrincipal.strApellidos}`

        let strMensaje = plantillaCorreoTareas({
            ...this.#objData,
            ...this.#objUser,
            strNombreIdea,
            strNombreEmpresario
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
