
const servicioRepetido = (infoFase, i) => {
    if (!infoFase) {
        throw new Error("Se esperaban parametros de entrada")
    }

    let arrPaquetesFase = infoFase.arrPaquetes
    let arrServiciosFase = infoFase.arrServicios

    arrPaquetesFase.map((paquete) => {
        let arrServicios = paquete.objPaquete.objInfoPrincipal.arrServicios
        //recorre los servicios del paquete
        arrServicios.map((serv) => {
            let intIdServicio = serv.objInfoPrincipal.intId
            //Recorre los servicios de la Fase
            arrServiciosFase.map((servicio) => {
                if (servicio.objServicio.objInfoPrincipal.intId === intIdServicio) {
                    throw new Error(`No se puede guardar el servicio ${servicio.objServicio.objInfoPrincipal?.strNombre},
                             ya que se encuentra repetido en el paquete ${paquete.objPaquete.objInfoPrincipal?.strNombre} en la fase #${i+1}`)
                }
            })
        })

    })


}

module.exports = servicioRepetido;
