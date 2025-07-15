import { IRepositorioConsultaAdmin } from "../../../domain/repository/consultaAdmin/consultaAdmin.repositorio"
import { IdConsultaAdmin } from "../../../domain/validation/consultaAdmin/idConsultaAdmin"

export class ServicioEliminarConsultaAdmin{
    constructor(private repo:IRepositorioConsultaAdmin){}

    async run(id:number):Promise<void>{
        const consulta=new IdConsultaAdmin(id)

        const existe=await this.repo.getOneById(consulta)
        if (!existe) {
            throw new Error(`No se encontró la consulta: ${id}!`)
        }

        return this.repo.delete(consulta)
    }
}
