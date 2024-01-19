
//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

//service
const serviceSp_setFlujoAcompañamiento = require("../../Acompañamientos/domain/sp_setFlujoAcompañamiento.service")
const serviceGetAsistentesEventos = require("./getAsistentesEventos.service");
const serviceGetValorTarifa = require("../../Servicios/Maestros/Tipos de Tarifa por Sede/domain/getSedeTipoTarifaServicioBySedeServicio.service")

class setAsistentesEventos {
    //objects
    #objData;
    #objDataEventos;
    #objUser;
    #objResult;

    //Variable
    #intIdSedeEvento
    #intIdServicioEvento
    #intIdTarifa
    #ValorTarifa

    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getEventos()
        await this.#getValorTarifa()
        await this.#validations()
        await this.#setAsistentesEventos()
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

        const queryGetAsistentesEventos = await serviceGetAsistentesEventos({
            intIdEvento: this.#objData.intIdEvento
        }, this.#objUser)

        if (queryGetAsistentesEventos.error) {
            throw new Error(queryGetAsistentesEventos.msg)
        }

        const arrAsistentes = queryGetAsistentesEventos.data
        let arrEmpresarios = this.#objData.arrEmpresarios
        let arrTerceros = this.#objData.arrTerceros

        if (arrAsistentes?.length > 0) {
            for (let i = 0; i < arrAsistentes.length; i++) {
                for (let j = 0; j < arrEmpresarios.length; j++) {
                    const intIdAsistente = arrAsistentes[i]?.intIdEmpresario
                    if (intIdAsistente === arrEmpresarios[j]?.intId) {
                        throw new Error(`El empresario ${arrEmpresarios[j]?.strNombres} ${arrEmpresarios[j]?.strApellidos}, ya esta registrado en el evento.`)
                    }
                }

                for (let j = 0; j < arrTerceros.length; j++) {
                    const intIdAsistente = arrAsistentes[i]?.intIdTercero
                    if (intIdAsistente === arrTerceros[j]?.intId) {
                        throw new Error(`El tercero ${arrTerceros[j]?.strNombres} ${arrTerceros[j]?.strApellidos}, ya esta registrado en el evento.`)
                    }
                }
            }
        }
    }

    async #getEventos() {
        let dao = new classInterfaceDAOEventos();

        let query = await dao.getEventos({ intId: this.#objData.intIdEvento });

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdSedeEvento = query.data?.[0]?.intIdSede
        this.#intIdServicioEvento = query.data?.[0]?.intIdServicio
    }

    async #getValorTarifa() {
        let query = await serviceGetValorTarifa({
            intIdSede: this.#intIdSedeEvento,
            intIdServicio: this.#intIdServicioEvento
        }, this.#objUser);

        if (query.error) {
            throw new Error(query.msg);
        }


        this.#intIdTarifa = query.data?.[0]?.intId || null
        this.#ValorTarifa = query.data?.[0]?.Valor || null
    }

    async #setAsistentesEventos() {
        let dao = new classInterfaceDAOEventos();

        let arrEmpresarios = this.#objData.arrEmpresarios
        let arrTerceros = this.#objData.arrTerceros

        for (let i = 0; i < arrEmpresarios.length; i++) {
            let data = {
                intIdEvento: this.#objData.intIdEvento,
                intIdIdea: arrEmpresarios[i]?.objInfoIdeaEmpresario[0]?.intIdIdea,
                intIdEmpresario: arrEmpresarios[i]?.intId,
                intIdTercero: null,
                intTipoEmpresario: arrEmpresarios[i]?.objInfoIdeaEmpresario[0]?.intIdTipoEmpresario,
                intIdSedeTarifaServicio: this.#intIdTarifa,
                ValorMatricula: this.#ValorTarifa,
                btFinalizoEvento: false
            }

            let query = await dao.setAsistentesEventos(data);

            if (query.error) {
                throw new Error(query.msg);
            }

            let querySp = await serviceSp_setFlujoAcompañamiento({
                intIdIdea: arrEmpresarios[i]?.objInfoIdeaEmpresario[0]?.intIdIdea,
                intIdEvento: this.#objData.intIdEvento,
                intIdEmpresario: arrEmpresarios[i]?.intId,
                intIdSedeTarifaServicio: this.#intIdTarifa,
            }, this.#objUser)

            if (querySp.error) {
                throw new Error(querySp.msg);
            }

            this.#objResult = {
                error: query.error,
                data: query.data,
                msg: query.msg,
            };

        }

        for (let i = 0; i < arrTerceros.length; i++) {
            let data = {
                intIdEvento: this.#objData.intIdEvento,
                intIdIdea: null,
                intIdEmpresario: null,
                intIdTercero: arrTerceros[i]?.intId,
                intTipoEmpresario: null,
                intIdSedeTarifaServicio: null,
                ValorMatricula: null,
                btFinalizoEvento: false
            }

            let query = await dao.setAsistentesEventos(data);

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

}
module.exports = setAsistentesEventos;