import { ClaseUsuario } from "../../interface/usuario"
import { IdUsuario } from "../../validation/user/idUsuario"

export interface IRepositorioUsuario{
    getAll():Promise<ClaseUsuario[]>
    getOneById(id:IdUsuario):Promise<ClaseUsuario|null>
    create(usuario:ClaseUsuario):Promise<void>
    edit(usuario:ClaseUsuario):Promise<void>
    delete(id:IdUsuario):Promise<void>
}
