import { ClaseProducto } from "../interface/producto"
import { IdSombrero } from "../validation/model/idSombrero"

export interface IRepositorioProducto{
    getAll():Promise<ClaseProducto[]>
    getOneById(id:IdSombrero):Promise<ClaseProducto|null>
    create(producto:ClaseProducto):Promise<void>
    edit(producto:ClaseProducto):Promise<void>
    delete(id:IdSombrero):Promise<void>
}
