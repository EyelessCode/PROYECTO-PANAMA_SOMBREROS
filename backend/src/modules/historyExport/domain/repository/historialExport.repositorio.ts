import { ClaseHistorialExport } from "../interface/historialExport"
import { IdHistorialExport } from "../validation/idHistorialExport"

export interface IRepositorioHistorialExport{
    getAll():Promise<ClaseHistorialExport[]>
    getOneById(id:IdHistorialExport):Promise<ClaseHistorialExport|null>
    create(historialExport:ClaseHistorialExport):Promise<void>
    edit(historialExport:ClaseHistorialExport):Promise<void>
    delete(id:IdHistorialExport):Promise<void>
}
