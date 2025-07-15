import { ClaseConsultaAdmin } from "../../../domain/interface/consultaAdmin"
import { IRepositorioConsultaAdmin } from "../../../domain/repository/consultaAdmin/consultaAdmin.repositorio"
import { IdConsultaAdmin } from "../../../domain/validation/consultaAdmin/idConsultaAdmin"
import { ResultadoConsultaAdmin } from "../../../domain/validation/consultaAdmin/resultadoConsultaAdmin"
import { TipoConsultaAdmin } from "../../../domain/validation/consultaAdmin/tipoConsultaAdmin"
import { IdUsuario } from "../../../domain/validation/user/idUsuario"


export class ServicioCrearConsultaAdmin{
    constructor(private repo:IRepositorioConsultaAdmin) {}

    async run(
        id:number,
        idUsuario:number,
        fechaConsulta:Date|string,
        tipoConsulta:string,
        resultado?:string
    ):Promise<void>{
        const fecha = typeof fechaConsulta === 'string' ? new Date(fechaConsulta):fechaConsulta;

        if (isNaN(fecha.getTime())) {
            throw new Error("Fecha de consulta inválida");
        }
        
        const consulta=new ClaseConsultaAdmin(
            new IdConsultaAdmin(id),
            new IdUsuario(idUsuario),
            new TipoConsultaAdmin(tipoConsulta),
            resultado?new ResultadoConsultaAdmin(resultado):undefined
        )


        return this.repo.create(consulta)
    }
}
