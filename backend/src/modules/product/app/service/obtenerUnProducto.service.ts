import { ClaseProducto } from "../../domain/interface/producto"
import { IRepositorioProducto } from "../../domain/repository/producto.repositorio"
import { IdSombrero } from "../../domain/validation/model/idSombrero"

export class ServicioObtenerUnProducto{
    constructor(private repo:IRepositorioProducto){}

    async run(id:number):Promise<ClaseProducto>{
        const producto=await this.repo.getOneById(new IdSombrero(id))

        if (!producto) {
            throw new Error(`No se encontró el producto: ${id}!`)
        }

        return producto
    }
}
