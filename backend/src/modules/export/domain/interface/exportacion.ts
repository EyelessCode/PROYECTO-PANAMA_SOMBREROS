import { IdContenedor } from "../validation/idContenedor"
import { IdExportacion } from "../validation/idExportacion"
import { ValorFleteExportacion } from "../validation/valorFleteExportacion"
import { IdPais } from "../validation/idPais";
import { IdMoneda } from "../validation/idMoneda";
import { EstadoExportacion } from "../validation/estadoExportacion";

export class ClaseExportacion{
    id:IdExportacion
    idContenedor:IdContenedor
    pais:IdPais
    moneda:IdMoneda
    fechaSalida:Date
    fechaLlegada?:Date
    valorFlete:ValorFleteExportacion
    estado:EstadoExportacion
    fechaRegistro:Date

    constructor(
        id:IdExportacion,
        idContenedor:IdContenedor,
        pais:IdPais,
        moneda:IdMoneda,
        fechaSalida:Date,
        valorFlete:ValorFleteExportacion,
        estado:EstadoExportacion,
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
            idContenedor:this.idContenedor.id,
            pais:this.pais.id,
            moneda:this.moneda.id,
            fechaSalida:this.fechaSalida,
            fechaLlegada:this.fechaLlegada??null,
            valorFlete:this.valorFlete.valorFlete,
            estado:this.estado.estado,
            fechaRegistro:this.fechaRegistro
        };
    }

    static fromPrimitives(data: any): ClaseExportacion {
        return new ClaseExportacion(
            new IdExportacion(data.id),
            new IdContenedor(data.id),
            new IdPais(data.id),
            new IdMoneda(data.id),
            new Date(data.fechaSalida),
            new ValorFleteExportacion(data.valorFlete),
            new EstadoExportacion(data.estado),
            data.fechaLlegada?new Date(data.fechaLlegada):undefined
        )
    }
}
