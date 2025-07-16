import { ClaseProducto } from "../../domain/interface/producto"
import { IRepositorioProducto } from "../../domain/repository/producto.repositorio"
import { DescripcionSombrero } from "../../domain/validation/model/descripcionSombrero"
import { IdColor } from "../../domain/validation/model/idColor"
import { IdSombrero } from "../../domain/validation/model/idSombrero"
import { IdTalla } from "../../domain/validation/model/idTalla"
import { IdTipo } from "../../domain/validation/model/idTipo"
import { PrecioUnitarioSombrero } from "../../domain/validation/model/precioUnitarioSombrero"

export class ServicioEditarProducto{
    constructor(private repo:IRepositorioProducto) {}

    async run(
        id:number,
        tipoId:number,
        tallaId:number,
        colorId:number,
        precioUnitario:number,
        activo:boolean,
        descripcion?:string
    ):Promise<void>{
        const producto=new ClaseProducto(
            new IdSombrero(id),
            new IdTipo(tipoId),
            new IdTalla(tallaId),
            new IdColor(colorId),
            new PrecioUnitarioSombrero(precioUnitario),
            descripcion?new DescripcionSombrero(descripcion):undefined,
            Boolean(activo)
        )

        const existe=await this.repo.getOneById(producto.id)
        if (!existe) {
            throw new Error(`No se encontró el producto: ${id}!`)
        }
        return this.repo.edit(producto)
    }
}
