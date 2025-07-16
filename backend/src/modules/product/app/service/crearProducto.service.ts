import { ClaseProducto } from "../../domain/interface/producto"
import { IRepositorioProducto } from "../../domain/repository/producto.repositorio"
import { DescripcionSombrero } from "../../domain/validation/model/descripcionSombrero"
import { IdColor } from "../../domain/validation/model/idColor"
import { IdSombrero } from "../../domain/validation/model/idSombrero"
import { IdTalla } from "../../domain/validation/model/idTalla"
import { IdTipo } from "../../domain/validation/model/idTipo"
import { PrecioUnitarioSombrero } from "../../domain/validation/model/precioUnitarioSombrero"

export class ServicioCrearProducto{
    constructor(private repo:IRepositorioProducto) {}

    async run(
        id:number,
        idTipo:number,
        idTalla:number,
        idColor:number,
        precioUnitario:number,
        activo:boolean,
        descripcion?:string,
    ):Promise<void>{
        const producto=new ClaseProducto(
            new IdSombrero(id),
            new IdTipo(idTipo),
            new IdTalla(idTalla),
            new IdColor(idColor),
            new PrecioUnitarioSombrero(precioUnitario),
            descripcion?new DescripcionSombrero(descripcion):undefined,
            Boolean(activo)
        )

        return this.repo.create(producto)
    }
}
