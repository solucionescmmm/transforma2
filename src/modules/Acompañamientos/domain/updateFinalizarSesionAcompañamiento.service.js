//librerias
const validator = require("validator").default;

//class
const classInterfaceDAOAcompañamientos = require("../infra/conectors/interfaceDaoAcompañamientos");
//Service

const serviceCheckServicioFase = require("../../Rutas/domain/checkServicioFase.service");
const serviceCheckPaqueteFase = require("../../Rutas/domain/checkPaqueteFase.service");

class updateFinalizarSesionAcompañamiento {
    #objData;
    #objUser;
    #objResult;

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        if (this.#objData?.arrObjetivosServ) {
            await this.#checkServicioFase()
        }

        if (this.#objData?.arrObjetivosPaq) {
            await this.#checkPaqueteFase()
        }
        await this.#validations();
        await this.#updateFinalizarSesionAcompañamiento();
        await this.#sp_flujoFinalizarAcompañamiento()
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

        if (!this.#objData?.intId) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #checkServicioFase() {
        let arrNewObj = this.#objData?.arrObjetivosServ?.map((o)=>{

            let objNew = {
                ...o,
                btCumplio: this.#objData?.bitCumplieronServicio ? true : false
            }
            return objNew
        })

        const clsCheckServicio = new serviceCheckServicioFase({
            intIdServicioFase: this.#objData?.intIdServicioFase,
            arrObjetivos: arrNewObj
        },this.#objUser)

        const queryCheck = await clsCheckServicio.main()

        if (queryCheck.error) {
            throw new Error(queryCheck.msg)
        }

    }

    async #checkPaqueteFase() {
        let arrNewObj = this.#objData?.arrObjetivosPaq?.map((o)=>{

            let objNew = {
                ...o,
                btCumplio: this.#objData?.bitCumplieronServicio ? true : false
            }
            return objNew
        })

        const clsCheckServicio = new serviceCheckPaqueteFase({
            intIdServicioFase: this.#objData?.intIdServicioFase,
            arrObjetivos: arrNewObj
        },this.#objUser)

        const queryCheck = await clsCheckServicio.main()

        if (queryCheck.error) {
            throw new Error(queryCheck.msg)
        }

    }

    async #updateFinalizarSesionAcompañamiento() {
        let dao = new classInterfaceDAOAcompañamientos();

        let newData={
            ...this.#objData,
            btFinalizado: true,
            strUsuarioActualizacion: this.#objUser.strEmail
        }

        let query = await dao.updateFinalizarSesionAcompañamiento(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #sp_flujoFinalizarAcompañamiento() {
        let dao = new classInterfaceDAOAcompañamientos();

        let query = await dao.sp_flujoFinalizarAcompañamiento({
            intIdSesionAcompañamiento: this.#objData.intId,
            bitFinalizarAcompañamiento: this.#objData?.bitFinalizarAcompañamiento
        });

        if (query.error) {
            throw new Error(query.msg);
        }
    }
}
module.exports = updateFinalizarSesionAcompañamiento;