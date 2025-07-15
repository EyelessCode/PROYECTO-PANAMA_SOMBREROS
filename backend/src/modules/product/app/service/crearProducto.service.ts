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
        tipoId:number,
        tallaId:number,
        colorId:number,
        precio:number,
        descripcion?:string
    ):Promise<void>{
        const producto=new ClaseProducto(
            new IdSombrero(id),
            new IdTipo(tipoId),
            new IdTalla(tallaId),
            new IdColor(colorId),
            new PrecioUnitarioSombrero(precio),
            descripcion?new DescripcionSombrero(descripcion):undefined,
            true
        )

        return this.repo.create(producto)
    }
}
