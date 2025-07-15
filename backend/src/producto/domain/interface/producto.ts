import { DescripcionSombrero } from "../validation/model/descripcionSombrero"
import { Color } from "../validation/model/color/color"
import { IdSombrero } from "../validation/model/idSombrero"
import { Talla } from "../validation/model/talla/talla"
import { Tipo } from "../validation/model/tipo/tipo"
import { PrecioUnitarioSombrero } from "../validation/model/precioUnitarioSombrero"

export class ClaseProducto{
    id:IdSombrero
    tipo:Tipo
    talla:Talla
    color:Color
    precioUnitario:PrecioUnitarioSombrero
    descripcion?:DescripcionSombrero
    fechaCreacion?:Date
    activo:boolean

    constructor(id:IdSombrero,tipo:Tipo,
        talla:Talla,color:Color,
        precioUnitario:PrecioUnitarioSombrero,
        descripcion?:DescripcionSombrero,
        activo:boolean=true
    ) {
        this.id=id
        this.tipo=tipo
        this.talla=talla
        this.color=color
        this.precioUnitario=precioUnitario
        this.descripcion=descripcion
        this.fechaCreacion=new Date()
        this.activo=activo
    }

    public toPrimitives() {
        return {
            id: this.id.id,
            tipo: this.tipo.id,
            talla: this.talla.id,
            color: this.color.id,
            precioUnitario: this.precioUnitario.precioUnitario,
            descripcion: this.descripcion?.descripcion || null,
            fechaCreacion: this.fechaCreacion,
            activo: this.activo
        };
    }
}
