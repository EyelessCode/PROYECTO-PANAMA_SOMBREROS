import { ClaseDetalleExport } from "../../domain/interface/detalleExport";
import { IRepositorioDetalleExport } from "../../domain/repository/detalleExport.repositorio";

export class ServicioObtenerDetallesExport{
    constructor(private repo:IRepositorioDetalleExport) {}

    async run():Promise<ClaseDetalleExport[]>{
        return this.repo.getAll()
    }
}
