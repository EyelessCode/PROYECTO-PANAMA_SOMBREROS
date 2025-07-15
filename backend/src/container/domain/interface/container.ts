import { CapacidadMaxContenedor } from "../validation/capacidadMaxContenedor"
import { CodigoContenedor } from "../validation/codigoContenedor"
import { DescripcionContenedor } from "../validation/descripcionContenedor"
import { IdContenedor } from "../validation/idContenedor"
import { PesoMaxContenedor } from "../validation/pesoMaxContenedor"

export class ClassContenedor{
    id:IdContenedor
    codigo:CodigoContenedor
    capacidadMax:CapacidadMaxContenedor
    descripcion?:DescripcionContenedor
    pesoMax:PesoMaxContenedor

    constructor(
        id:IdContenedor,
        codigo:CodigoContenedor,
        capacidadMax:CapacidadMaxContenedor,
        pesoMax:PesoMaxContenedor,
        descripcion?:DescripcionContenedor
    ) {
        this.id=id
        this.codigo=codigo
        this.capacidadMax=capacidadMax
        this.descripcion=descripcion
        this.pesoMax=pesoMax
    }

    public toPrimitives() {
        return {
            id:this.id.id,
            codigo:this.codigo.codigo,
            capacidadMax:this.capacidadMax.capacidadMax,
            descripcion:this.descripcion?.descripcion??null,
            pesoMax:this.pesoMax.pesoMax
        };
    }

    static fromPrimitives(data: any): ClassContenedor {
        return new ClassContenedor(
            new IdContenedor(data.id),
            new CodigoContenedor(data.codigo),
            new CapacidadMaxContenedor(data.capacidadMax),
            new PesoMaxContenedor(data.pesoMax),
            new DescripcionContenedor(data.descripcion)
        )
    }
}
