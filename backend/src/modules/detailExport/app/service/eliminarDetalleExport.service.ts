import { IRepositorioDetalleExport } from "../../domain/repository/detalleExport.repositorio"
import { IdDetalleExport } from "../../domain/validation/idDetalleExport"

export class ServicioEliminarDetalleExport{
    constructor(private repo:IRepositorioDetalleExport){}

    async run(id:number):Promise<void>{
        const detalleExport=new IdDetalleExport(id)

        const existe=await this.repo.getOneById(detalleExport)
        if (!existe) {
            throw new Error(`No se encontró el detalle de la exportación: ${id}!`)
        }

        return this.repo.delete(detalleExport)
    }
}
