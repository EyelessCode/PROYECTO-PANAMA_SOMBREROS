import { ClaseConsultaAdmin } from "../../../domain/interface/consultaAdmin"
import { IRepositorioConsultaAdmin } from "../../../domain/repository/consultaAdmin/consultaAdmin.repositorio"
import { IdConsultaAdmin } from "../../../domain/validation/consultaAdmin/idConsultaAdmin";
import { IdUsuario } from "../../../domain/validation/consultaAdmin/idUsuario";
import { ResultadoConsultaAdmin } from "../../../domain/validation/consultaAdmin/resultadoConsultaAdmin";
import { TipoConsultaAdmin } from "../../../domain/validation/consultaAdmin/tipoConsultaAdmin";


export class ServicioEditarConsultaAdmin{
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

        const existe=await this.repo.getOneById(consulta.id)
        if (!existe) {
            throw new Error(`No se encontró la consulta: ${id}!`)
        }
        return this.repo.edit(consulta)
    }
}
