import { ClaseDetalleExport } from "../interface/detalleExport"
import { IdDetalleExport } from "../validation/idDetalleExport"

export interface IRepositorioDetalleExport{
    getAll():Promise<ClaseDetalleExport[]>
    getOneById(id:IdDetalleExport):Promise<ClaseDetalleExport|null>
    create(detalleExport:ClaseDetalleExport):Promise<void>
    edit(detalleExport:ClaseDetalleExport):Promise<void>
    delete(id:IdDetalleExport):Promise<void>
}
