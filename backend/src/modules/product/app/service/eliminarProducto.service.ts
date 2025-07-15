import { IRepositorioProducto } from "../../domain/repository/producto.repositorio"
import { IdSombrero } from "../../domain/validation/model/idSombrero"

export class ServicioEliminarProducto{
    constructor(private repo:IRepositorioProducto){}

    async run(id:number):Promise<void>{
        const producto=new IdSombrero(id)

        const existe=await this.repo.getOneById(producto)
        if (!existe) {
            throw new Error(`No se encontró el producto: ${id}!`)
        }

        return this.repo.delete(producto)
    }
}
