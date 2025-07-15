import { IRepositorioHistorialExport } from "../../domain/repository/historialExport.repositorio"
import { IdHistorialExport } from "../../domain/validation/idHistorialExport"

export class ServicioEliminarHistorialExport{
    constructor(private repo:IRepositorioHistorialExport){}

    async run(id:number):Promise<void>{
        const historialExport=new IdHistorialExport(id)

        const existe=await this.repo.getOneById(historialExport)
        if (!existe) {
            throw new Error(`No se encontró el historial de la exportación: ${id}!`)
        }

        return this.repo.delete(historialExport)
    }
}
