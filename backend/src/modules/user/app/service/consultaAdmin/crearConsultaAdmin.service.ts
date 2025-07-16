import { ClaseConsultaAdmin } from "../../../domain/interface/consultaAdmin"
import { IRepositorioConsultaAdmin } from "../../../domain/repository/consultaAdmin/consultaAdmin.repositorio"
import { IdConsultaAdmin } from "../../../domain/validation/consultaAdmin/idConsultaAdmin"
import { IdUsuario } from "../../../domain/validation/consultaAdmin/idUsuario"
import { ResultadoConsultaAdmin } from "../../../domain/validation/consultaAdmin/resultadoConsultaAdmin"
import { TipoConsultaAdmin } from "../../../domain/validation/consultaAdmin/tipoConsultaAdmin"


export class ServicioCrearConsultaAdmin{
    constructor(private repo:IRepositorioConsultaAdmin) {}

    async run(
        id:number,
        idAdmin:number,
        tipoConsulta:string,
        resultado?:string
    ):Promise<void>{
        
        const consulta=new ClaseConsultaAdmin(
            new IdConsultaAdmin(id),
            new IdUsuario(idAdmin),
            new TipoConsultaAdmin(tipoConsulta),
            resultado?new ResultadoConsultaAdmin(resultado):undefined
        )


        return this.repo.create(consulta)
    }
}
