import { ClaseConsultaAdmin } from "../../../domain/interface/consultaAdmin"
import { IRepositorioConsultaAdmin } from "../../../domain/repository/consultaAdmin/consultaAdmin.repositorio"
import { IdConsultaAdmin } from "../../../domain/validation/consultaAdmin/idConsultaAdmin"

export class ServicioObtenerUnaConsultaAdmin{
    constructor(private repo:IRepositorioConsultaAdmin){}

    async run(id:number):Promise<ClaseConsultaAdmin>{
        const consulta=await this.repo.getOneById(new IdConsultaAdmin(id))

        if (!consulta) {
            throw new Error(`No se encontró la consulta: ${id}!`)
        }

        return consulta
    }
}
