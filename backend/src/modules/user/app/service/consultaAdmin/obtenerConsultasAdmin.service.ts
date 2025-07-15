import { ClaseConsultaAdmin } from "../../../domain/interface/consultaAdmin";
import { IRepositorioConsultaAdmin } from "../../../domain/repository/consultaAdmin/consultaAdmin.repositorio";

export class ServicioObtenerConsultasAdmin{
    constructor(private repo:IRepositorioConsultaAdmin) {}

    async run():Promise<ClaseConsultaAdmin[]>{
        return this.repo.getAll()
    }
}
