//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

//service
const serviceGetAsistentesSesionesEventos = require("./getAsistentesSesionesEventos.service")
const serviceSp_deleteFlujoAcompañamiento = require("../../Acompañamientos/domain/sp_deleteFlujoAcompañamiento.service")

class deleteAsistentesEventos {

    //objects
    #objData;
    #objUser;
    #objResult;

    //variables
    #intNumAsistencias

    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getAsistentesSesionesEventos()
        await this.#validations()
        await this.#deleteAsistentesEventos()
        if (this.#objData.intIdEmpresario) {
            await this.#sp_deleteFlujoAcompañamiento()
        }
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

        if (!this.#objData?.intIdAsistentesEvento) {
            throw new Error("Se esperaban parámetros de entrada.");
        }

        if (this.#intNumAsistencias >= 1) {
            throw new Error("No se puede eliminar el registro de esta persona, ya tiene una o mas asistencias en este evento.");
        }
    }

    async #getAsistentesSesionesEventos() {
        let queryGetSesionesEventos = await serviceGetAsistentesSesionesEventos({
            intIdAsistenteEvento: this.#objData.intIdAsistentesEvento,
        }, this.#objUser);

        if (queryGetSesionesEventos.error) {
            throw new Error(queryGetSesionesEventos.msg);
        }

        this.#intNumAsistencias = queryGetSesionesEventos.data?.length
    }

    async #deleteAsistentesEventos() {
        let dao = new classInterfaceDAOEventos();

        let newData = {
            intIdAsistentesEvento: this.#objData.intIdAsistentesEvento
        }

        let query = await dao.deleteAsistentesEventos(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #sp_deleteFlujoAcompañamiento(){
        let query = await serviceSp_deleteFlujoAcompañamiento({
            intIdIdea: this.#objData?.intIdIdea,
            intIdEmpresario: this.#objData?.intIdEmpresario,
            intIdEvento: this.#objData?.intIdEvento
        },this.#objUser);

        if (query.error) {
            throw new Error(query.msg);
        }
    }

}
module.exports = deleteAsistentesEventos;