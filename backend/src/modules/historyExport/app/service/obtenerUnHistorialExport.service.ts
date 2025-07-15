import { ClaseHistorialExport } from "../../domain/interface/historialExport"
import { IRepositorioHistorialExport } from "../../domain/repository/historialExport.repositorio"
import { IdHistorialExport } from "../../domain/validation/idHistorialExport"

export class ServicioObtenerUnHistorialExport{
    constructor(private repo:IRepositorioHistorialExport){}

    async run(id:number):Promise<ClaseHistorialExport>{
        const historialExport=await this.repo.getOneById(new IdHistorialExport(id))

        if (!historialExport) {
            throw new Error(`No se encontró el historial de la exportación: ${id}!`)
        }

        return historialExport
    }
}
