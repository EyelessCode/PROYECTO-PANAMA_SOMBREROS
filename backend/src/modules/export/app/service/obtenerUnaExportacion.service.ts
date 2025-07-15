import { ClaseExportacion } from "../../domain/interface/exportacion"
import { IRepositorioExportacion } from "../../domain/repository/exportacion.repositorio"
import { IdExportacion } from "../../domain/validation/idExportacion"

export class ServicioObtenerUnaExportacion{
    constructor(private repo:IRepositorioExportacion){}

    async run(id:number):Promise<ClaseExportacion>{
        const exportacion=await this.repo.getOneById(new IdExportacion(id))

        if (!exportacion) {
            throw new Error(`No se encontró la exportación: ${id}!`)
        }

        return exportacion
    }
}
