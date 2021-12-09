//Librerias
const validator = require("validator").default;

//CLases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

class updateEmpresario {
    #objData;
    #objUser;
    #objEmpresarioActual;
    #intIdEmpresarioActual;
    #objResult;
    /**
     * @param {object} data
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser
        
    }

    async main() {
        await this.#getEmpresario();
        await this.#validations();
        await this.#updateEmpresario();
        await this.#updateEmpresa();
        await this.#updateEmpresarioSecundario();
        await this.#updateInfoAdicional();

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

        let btMismaCedula = false;
        if (this.#objData.objEmpresario.strNroDocto === this.#objEmpresarioActual.strNroDocto) {
            btMismaCedula = true
        }

        if (!btMismaCedula) {
            let dao = new classInterfaceDAOEmpresarios()
            let queryGetNroDoctoEmpresario = await dao.getNroDocumentoEmpresario({
            strNroDocto: this.#objData.objEmpresario.strNroDocto,
            });

            if (queryGetNroDoctoEmpresario.data) {
                throw new Error(
                    `Este número de documento ${queryGetNroDoctoEmpresario.data.strNroDocto}, ya exite y esta asociado a un Interesado`
                );
            }
        }
    }

    async #getEmpresario() {
        let dao = new classInterfaceDAOEmpresarios();
        
        let query = await dao.getEmpresario({ intId: this.#objData.objEmpresario.intId });

        if (query.error) {
            throw new Error(query.msg);
        }
        
        if (!query.data) {
            throw new Error(`El empresario no existe`);
        }
        this.#objEmpresarioActual = query.data[0];
        this.#intIdEmpresarioActual = query.data[0].intId;
    }

    async #updateEmpresario() {
        
        let prevData = this.#objData.objEmpresario;

        let aux_arrDepartamento= JSON.stringify(this.#objData.objEmpresario?.arrDepartamento || null)
        let aux_arrCiudad= JSON.stringify(this.#objData.objEmpresario?.arrCiudad || null)

        let newData = {
            ...prevData,
            strUsuario: this.#objUser.strEmail,
            arrDepartamento: aux_arrDepartamento,
            arrCiudad:aux_arrCiudad
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateEmpresario(newData);

        if (query.error) {
            await this.#rollbackTransaction();
            throw new Error(query.msg);
        }
        console.log(this.#objData);

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #updateEmpresa() {
        let prevData = this.#objData.objInfoEmpresa;


        let aux_arrCategoriasSecundarias= JSON.stringify(this.#objData.objInfoEmpresa?.arrCategoriasSecundarias || null)
        let aux_arrFormasComercializacion = JSON.stringify(this.#objData.objInfoEmpresa?.arrFormasComercializacion ||null)
        let aux_arrMediosDigitales = JSON.stringify(this.#objData.objInfoEmpresa?.arrMediosDigitales|| null)
        let aux_arrRequisitosLey = JSON.stringify(this.#objData.objInfoEmpresa?.arrRequisitosLey|| null)
        let aux_arrDepartamento= JSON.stringify(this.#objData.objEmpresario?.arrDepartamento || null)
        let aux_arrCiudad= JSON.stringify(this.#objData.objEmpresario?.arrCiudad || null)
        
        let newData = {
            ...prevData,
            intIdEmpresario: this.#intIdEmpresarioActual,
            strUsuario: this.#objUser.strEmail,
            arrCategoriasSecundarias: aux_arrCategoriasSecundarias,
            arrFormasComercializacion: aux_arrFormasComercializacion,
            arrMediosDigitales: aux_arrMediosDigitales,
            arrRequisitosLey: aux_arrRequisitosLey,
            arrDepartamento:aux_arrDepartamento,
            arrCiudad:aux_arrCiudad
        };

        let dao = new classInterfaceDAOEmpresarios();

        let query = await dao.updateEmpresa(newData);

        if (query.error) {
            await this.#rollbackTransaction();
        }
    }

    async #updateEmpresarioSecundario() {
        let dao = new classInterfaceDAOEmpresarios();

            let queryDeleteEmpresarioSecundario = await dao.deleteEmpresarioSecundario({
                intId : this.#intIdEmpresarioActual
            })
            if (queryDeleteEmpresarioSecundario.error) {
                throw new Error(queryDeleteEmpresarioSecundario.msg);
            }

            for (let i = 0; i < this.#objData.arrEmpresarioSecundario.length; i++) {
                let prevData = this.#objData.arrEmpresarioSecundario[i];

                let newData = {
                    ...prevData,
                    intIdEmpresarioPrincipal: this.#intIdEmpresarioActual,
                    strUsuario: this.#objUser.strEmail,
                };

                let query = await dao.setEmpresarioSecundario(newData);

                if (query.error) {
                    await this.#rollbackTransaction();
                }
            }
        
    }

    async #updateInfoAdicional(){
        let dao = new classInterfaceDAOEmpresarios()

        let prevData = this.#objData.objInfoAdicional;

        let aux_arrTemasCapacitacion =JSON.stringify(this.#objData.objInfoAdicional?.arrTemasCapacitacion|| null);
        let aux_arrComoSeEntero = JSON.stringify(this.#objData.objInfoAdicional?.arrComoSeEntero|| null);
        let aux_arrMediosDeComunicacion = JSON.stringify(this.#objData.objInfoAdicional?.arrMediosDeComunicacion|| null);

        
        let newData={
            ...prevData,
            intIdEmpresario: this.#intIdEmpresarioActual,
            strUsuario: this.#objUser.strEmail,
            arrTemasCapacitacion:aux_arrTemasCapacitacion,
            arrComoSeEntero:aux_arrComoSeEntero,
            arrMediosDeComunicacion:aux_arrMediosDeComunicacion,
        }

        let query = await dao.updateInfoAdicional(newData)

        if(query.error){
            await this.#rollbackTransaction();
        }
    }

    async #rollbackTransaction() {
        let dao = new classInterfaceDAOEmpresarios();
        let prevData = this.#objEmpresarioActual;

        let objDataEmpresario = {
            ...prevData.objEmpresario,
            arrCategoriasSecundarias: aux_arrCategoriasSecundarias,
            arrFormasComercializacion: aux_arrFormasComercializacion,
            arrMediosDigitales: aux_arrMediosDigitales,
            arrRequisitoLey: aux_arrRequisitoLey,
        }

        let rollEmpresario = await dao.updateEmpresario(
            this.#objEmpresarioActual.objEmpresario
        );
        let aux_arrCategoriasSecundarias= JSON.stringify(this.#objEmpresarioActual.objInfoEmpresa?.arrCategoriasSecundarias || null)
        let aux_arrFormasComercializacion = JSON.stringify(this.#objEmpresarioActual.objInfoEmpresa?.arrFormasComercializacion || null)
        let aux_arrMediosDigitales = JSON.stringify(this.#objEmpresarioActual.objInfoEmpresa?.arrMediosDigitales|| null)
        let aux_arrRequisitoLey = JSON.stringify(this.#objEmpresarioActual.objInfoEmpresa?.arrRequisitoLey|| null)
        let aux_arrDepartamento= JSON.stringify(this.#objEmpresarioActual.objInfoEmpresa?.arrDepartamento || null)
        let aux_arrCiudad= JSON.stringify(this.#objData.objEmpresarioActual?.arrCiudad || null)

        let objDataEmpresa = {
            ...prevData.objInfoEmpresa,
            arrCategoriasSecundarias: aux_arrCategoriasSecundarias,
            arrFormasComercializacion: aux_arrFormasComercializacion,
            arrMediosDigitales: aux_arrMediosDigitales,
            arrRequisitoLey: aux_arrRequisitoLey,
        }
        let rollEmpresa = await dao.updateEmpresa(objDataEmpresa);

        let aux_arrTemasCapacitacion =JSON.stringify(this.#objEmpresarioActual.objInfoAdicional?.arrTemasCapacitacion|| null);
        let aux_arrComoSeEntero = JSON.stringify(this.#objEmpresarioActual.objInfoAdicional?.arrComoSeEntero|| null);
        let aux_arrMediosDeComunicacion = JSON.stringify(this.#objEmpresarioActual.objInfoAdicional?.arrMediosDeComunicacion|| null);

        let objDataAdicional ={
            ...prevData.objInfoAdicional,
            arrTemasCapacitacion:aux_arrTemasCapacitacion,
            arrComoSeEntero:aux_arrComoSeEntero,
            arrMediosDeComunicacion:aux_arrMediosDeComunicacion,
        }

        let rollAdicional = await dao.updateInfoAdicional(objDataAdicional)

        let queryDeleteEmpresarioSecundario = await dao.deleteEmpresarioSecundario({
            intId : this.#intIdEmpresarioActual
        })
        if (queryDeleteEmpresarioSecundario.error) {
            throw new Error(queryDeleteEmpresarioSecundario.msg);
        }

        for (
            let i = 0;
            i < this.#objEmpresarioActual.arrEmpresarioSecundario.length;
            i++
        ) {
            let rollEmpresarioSecundario = await dao.setEmpresarioSecundario(
                this.#objEmpresarioActual.arrEmpresarioSecundario[i]
            );

            if (rollEmpresarioSecundario.error) {
                throw new Error(rollEmpresarioSecundario.msg);
            }
        }

        if (rollEmpresario.error) {
            throw new Error(rollEmpresario.msg);
        }

        if (rollEmpresa.error) {
            throw new Error(rollEmpresa.msg);
        }

        if (rollAdicional.error) {
            throw new Error(rollAdicional.msg);
        }

        this.#objResult = {
            error: true,
            msg: query.error
                ? query.msg
                : "El registro del empresario ha fallado, se devolvieron los cambios efectuados en el sistema, por favor contacta al área de TI para más información.",
        };
    }
}
module.exports = updateEmpresario;
