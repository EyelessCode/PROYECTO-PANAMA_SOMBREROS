import { ClaseConsultaAdmin } from "../../interface/consultaAdmin"
import { IdConsultaAdmin } from "../../validation/consultaAdmin/idConsultaAdmin"

export interface IRepositorioConsultaAdmin{
    getAll():Promise<ClaseConsultaAdmin[]>
    getOneById(id:IdConsultaAdmin):Promise<ClaseConsultaAdmin|null>
    create(consulta:ClaseConsultaAdmin):Promise<void>
    edit(consulta:ClaseConsultaAdmin):Promise<void>
    delete(id:IdConsultaAdmin):Promise<void>
}
