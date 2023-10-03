
//class
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos")

//Librerias
const validator = require("validator").default;

//service
const deleteAsistentesSesionesEventos = require("./deleteAsistentesSesionesEventos.service")

class setAsistentesSesionesEventos {

    //objects
    #objData;
    #objUser;
    #objResult;

    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        console.log(this.#objData)
        await this.#validations()
        await this.#setAsistentesSesionesEventos()
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

    async #setAsistentesSesionesEventos() {
        let dao = new classInterfaceDAOEventos();

        const arrAsistentes = this.#objData.arrAsistentes

        for (let i = 0; i < arrAsistentes.length; i++) {
            let newData = {
                intIdSesion: this.#objData?.intIdSesion,
                intIdAsistenteEvento: arrAsistentes[i]?.intIdAsistenteEvento
            }

            let query = await dao.setAsistentesSesionesEventos(newData);

            if (query.error) {
                await this.#rollbackTransaction()
                throw new Error(query.msg);
            }

            this.#objResult = {
                error: query.error,
                msg: query.msg,
            };
        }


    }

    async #rollbackTransaction() {
        const service = new deleteAsistentesSesionesEventos({
            intIdSesion: this.#objData?.intIdSesion
        }, this.#objUser)

        let query = await service.main()

        if (query.error) {
            this.#objResult = {
                error: true,
                msg: query.error
                    ? query.msg
                    : "El registro de la asistencia ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
            };
        }
    }

}
module.exports = setAsistentesSesionesEventos;