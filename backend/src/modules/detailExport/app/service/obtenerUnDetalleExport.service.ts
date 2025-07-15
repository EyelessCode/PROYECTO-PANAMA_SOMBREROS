import { ClaseDetalleExport } from "../../domain/interface/detalleExport"
import { IRepositorioDetalleExport } from "../../domain/repository/detalleExport.repositorio"
import { IdDetalleExport } from "../../domain/validation/idDetalleExport"

export class ServicioObtenerUnDetalleExport{
    constructor(private repo:IRepositorioDetalleExport){}

    async run(id:number):Promise<ClaseDetalleExport>{
        const detalleExport=await this.repo.getOneById(new IdDetalleExport(id))

        if (!detalleExport) {
            throw new Error(`No se encontró el detalle de la exportación: ${id}!`)
        }

        return detalleExport
    }
}
