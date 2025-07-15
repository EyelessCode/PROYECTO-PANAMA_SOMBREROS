import { ClaseContenedor } from "../interface/container"
import { IdContenedor } from "../validation/idContenedor"

export interface IRepositorioContenedor{
    getAll():Promise<ClaseContenedor[]>
    getOneById(id:IdContenedor):Promise<ClaseContenedor|null>
    create(contenedor:ClaseContenedor):Promise<void>
    edit(contenedor:ClaseContenedor):Promise<void>
    delete(id:IdContenedor):Promise<void>
}
