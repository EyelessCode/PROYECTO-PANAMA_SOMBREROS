import { ClaseExportacion } from "../../domain/interface/exportacion";
import { IRepositorioExportacion } from "../../domain/repository/exportacion.repositorio";

export class ServicioObtenerExportaciones{
    constructor(private repo:IRepositorioExportacion) {}

    async run():Promise<ClaseExportacion[]>{
        return this.repo.getAll()
    }
}
