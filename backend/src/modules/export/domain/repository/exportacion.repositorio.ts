import { ClaseExportacion } from "../interface/exportacion"
import { IdExportacion } from "../validation/idExportacion"

export interface IRepositorioExportacion{
    getAll():Promise<ClaseExportacion[]>
    getOneById(id:IdExportacion):Promise<ClaseExportacion|null>
    create(exportacion:ClaseExportacion):Promise<void>
    edit(exportacion:ClaseExportacion):Promise<void>
    delete(id:IdExportacion):Promise<void>
}
