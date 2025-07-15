import { IdContenedor } from "../validation/idContenedor"
import { EstadoExportacion } from "../validation/estadoExportacion"
import { IdExportacion } from "../validation/idExportacion"
import { Moneda } from "../validation/moneda/moneda"
import { Pais } from '../validation/pais/pais';
import { ValorFleteExportacion } from "../validation/valorFleteExportacion"

export class ClaseExportacion{
    id:IdExportacion
    idContenedor:IdContenedor
    pais:Pais
    moneda:Moneda
    fechaSalida:Date
    fechaLlegada?:Date
    valorFlete:ValorFleteExportacion
    estado:EstadoExportacion
    fechaRegistro:Date

    constructor(
        id:IdExportacion,
        idContenedor:IdContenedor,
        pais:Pais,
        moneda:Moneda,
        fechaSalida:Date,
        valorFlete:ValorFleteExportacion,
        estado:EstadoExportacion=EstadoExportacion.PENDIENTE,
        fechaLlegada?:Date
    ) {
        this.id=id
        this.idContenedor=idContenedor
        this.pais=pais
        this.moneda=moneda
        this.fechaSalida=fechaSalida
        this.fechaLlegada=fechaLlegada
        this.valorFlete=valorFlete
        this.estado=estado
        this.fechaRegistro=new Date()
    }

    public toPrimitives() {
        return {
            id:this.id.id,
            IdContenedor:this.idContenedor.id,
            Pais:this.pais.id,
            moneda:this.moneda.id,
            fechaSalida:this.fechaSalida,
            fechaLlegada:this.fechaLlegada??null,
            valorFlete:this.valorFlete.valorFlete,
            estado:this.estado,
            fechaRegistro:this.fechaRegistro
        };
    }

    static fromPrimitives(data: any): ClaseExportacion {
        return new ClaseExportacion(
            new IdExportacion(data.id),
            new IdContenedor(data.id),
            new Pais(data.Pais.id,data.Pais.nombre,data.Pais.codigoIso),
            new Moneda(data.Moneda.id,data.Moneda.nombre,data.
                Moneda.simbolo,data?.Moneda.codigoIso),
            new Date(data.fechaSalida),
            new ValorFleteExportacion(data.valorFlete),
            data.estado as EstadoExportacion,
            data.fechaLlegada?new Date(data.fechaLlegada):undefined,
        )
    }
}
