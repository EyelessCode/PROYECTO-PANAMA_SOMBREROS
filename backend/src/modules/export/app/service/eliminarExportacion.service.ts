import { IRepositorioExportacion } from "../../domain/repository/exportacion.repositorio"
import { IdExportacion } from "../../domain/validation/idExportacion"

export class ServicioEliminarExportacion{
    constructor(private repo:IRepositorioExportacion){}

    async run(id:number):Promise<void>{
        const exportacion=new IdExportacion(id)

        const existe=await this.repo.getOneById(exportacion)
        if (!existe) {
            throw new Error(`No se encontró la exportación: ${id}!`)
        }

        return this.repo.delete(exportacion)
    }
}
