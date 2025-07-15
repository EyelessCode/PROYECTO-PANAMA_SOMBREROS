import { ClaseHistorialExport } from "../../domain/interface/historialExport";
import { IRepositorioHistorialExport } from "../../domain/repository/historialExport.repositorio";

export class ServicioObtenerHistorialesExport{
    constructor(private repo:IRepositorioHistorialExport) {}

    async run():Promise<ClaseHistorialExport[]>{
        return this.repo.getAll()
    }
}
