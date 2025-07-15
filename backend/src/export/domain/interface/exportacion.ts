import { IdContenedor } from "../validation/contenedor/idContenedor"
import { EstadoExportacion } from "../validation/estadoExportacion"
import { IdExportacion } from "../validation/idExportacion"
import { Moneda } from "../validation/moneda/moneda"
import { Pais } from "../validation/pais/pais"
import { ValorFleteExportacion } from "../validation/valorFleteExportacion"

export class ClaseExportacion{
    id:IdExportacion
    idContenedor:IdContenedor
    pais:Pais
    moneda:Moneda
    fechaSalida:Date
    fechaLlegada:Date
    valorFlete:ValorFleteExportacion
    estado:EstadoExportacion
    fechaRegistro:Date

    constructor(
        id:IdExportacion,
        idContenedor:IdContenedor,
        pais:Pais,
        moneda:Moneda,
        fechaSalida:Date,
        fechaLlegada:Date,
        fechaRegistro:Date,
        valorFlete:ValorFleteExportacion,
        estado:EstadoExportacion=EstadoExportacion.PENDIENTE
    ) {
        this.id=id
        this.idContenedor=idContenedor
        this.pais=pais
        this.moneda=moneda
        this.fechaSalida=fechaSalida
        this.fechaLlegada=fechaLlegada
        this.valorFlete=valorFlete
        this.estado=estado
        this.fechaRegistro=fechaRegistro
    }

    public toPrimitives() {
        return {
            id:this.id.id,
            IdContenedor:this.idContenedor.id,
            Pais:this.pais.id,
            moneda:this.moneda.id,
            fechaSalida:this.fechaSalida,
            fechaLlegada:this.fechaLlegada,
            valorFlete:this.valorFlete.valorFlete,
            estado:this.estado,
            fechaRegistro:this.fechaRegistro
        };
    }
}
