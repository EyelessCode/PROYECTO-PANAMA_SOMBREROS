import { DescripcionSombrero } from "../validation/model/descripcionSombrero"
import { IdSombrero } from "../validation/model/idSombrero"
import { PrecioUnitarioSombrero } from "../validation/model/precioUnitarioSombrero"
import { IdTipo } from "../validation/model/idTipo"
import { IdTalla } from "../validation/model/idTalla"
import { IdColor } from "../validation/model/idColor"

export class ClaseProducto{
    id:IdSombrero
    idTipo:IdTipo
    idTalla:IdTalla
    idColor:IdColor
    precioUnitario:PrecioUnitarioSombrero
    descripcion?:DescripcionSombrero
    fechaCreacion:Date
    activo:boolean

    constructor(id:IdSombrero,idTipo:IdTipo,
        idTalla:IdTalla,idColor:IdColor,
        precioUnitario:PrecioUnitarioSombrero,
        descripcion?:DescripcionSombrero,
        activo:boolean=true
    ) {
        this.id=id
        this.idTipo=idTipo
        this.idTalla=idTalla
        this.idColor=idColor
        this.precioUnitario=precioUnitario
        this.descripcion=descripcion
        this.fechaCreacion=new Date()
        this.activo=activo
    }

    public toPrimitives() {
        return {
            id: this.id.id,
            idTipo: this.idTipo.id,
            idTalla: this.idTalla.id,
            idColor: this.idColor.id,
            precioUnitario: this.precioUnitario.precioUnitario,
            descripcion: this.descripcion?.descripcion??null,
            fechaCreacion: this.fechaCreacion,
            activo: this.activo
        };
    }

    static fromPrimitives(data: any): ClaseProducto {
        return new ClaseProducto(
            new IdSombrero(data.id),
            new IdTipo(data.id),
            new IdTalla(data.id),
            new IdColor(data.id),
            new PrecioUnitarioSombrero(data.precioUnitario),
            data.descripcion?new DescripcionSombrero(data?.descripcion):undefined,
            Boolean(data.estado),
        )
    }
}
