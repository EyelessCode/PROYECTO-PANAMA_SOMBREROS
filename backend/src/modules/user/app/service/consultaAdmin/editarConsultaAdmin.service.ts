import { ClaseConsultaAdmin } from "../../../domain/interface/consultaAdmin"
import { IRepositorioConsultaAdmin } from "../../../domain/repository/consultaAdmin/consultaAdmin.repositorio"
import { IdConsultaAdmin } from "../../../domain/validation/consultaAdmin/idConsultaAdmin";
import { ResultadoConsultaAdmin } from "../../../domain/validation/consultaAdmin/resultadoConsultaAdmin";
import { TipoConsultaAdmin } from "../../../domain/validation/consultaAdmin/tipoConsultaAdmin";
import { IdUsuario } from "../../../domain/validation/user/idUsuario";


export class ServicioEditarConsultaAdmin{
    constructor(private repo:IRepositorioConsultaAdmin) {}

    async run(
        id:number,
        idUsuario:number,
        fechaConsulta:Date|string,
        tipoConsulta:string,
        resultado?:string
    ):Promise<void>{
        const consulta=new ClaseConsultaAdmin(
            new IdConsultaAdmin(id),
            new IdUsuario(idUsuario),
            new TipoConsultaAdmin(tipoConsulta),
            resultado?new ResultadoConsultaAdmin(resultado):undefined
        )

        const fecha = typeof fechaConsulta === 'string' ? new Date(fechaConsulta):fechaConsulta;

        if (isNaN(fecha.getTime())) {
            throw new Error("Fecha de consulta inválida");
        }

        const existe=await this.repo.getOneById(consulta.id)
        if (!existe) {
            throw new Error(`No se encontró la consulta: ${id}!`)
        }
        return this.repo.edit(consulta)
    }
}
