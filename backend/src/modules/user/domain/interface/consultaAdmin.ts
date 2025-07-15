import { IdConsultaAdmin } from "../validation/consultaAdmin/idConsultaAdmin"
import { ResultadoConsultaAdmin } from "../validation/consultaAdmin/resultadoConsultaAdmin"
import { TipoConsultaAdmin } from "../validation/consultaAdmin/tipoConsultaAdmin"
import { IdUsuario } from "../validation/user/idUsuario"

export class ClaseConsultaAdmin{
    id:IdConsultaAdmin
    idUsuario:IdUsuario
    fechaConsulta:Date
    tipoConsulta:TipoConsultaAdmin
    resultado?:ResultadoConsultaAdmin

    constructor(
        id:IdConsultaAdmin,
        idUsuario:IdUsuario,
        tipoConsulta:TipoConsultaAdmin,
        resultado?:ResultadoConsultaAdmin
    ) {
        this.id=id
        this.idUsuario=idUsuario
        this.fechaConsulta=new Date()
        this.tipoConsulta=tipoConsulta
        this.resultado=resultado
    }

    public toPrimitives() {
        return {
            id:this.id.id,
            idUsuario:this.idUsuario.id,
            fechaConsulta:this.fechaConsulta,
            tipoConsulta:this.tipoConsulta.tipoConsulta,
            resultado:this.resultado?.resultado
        };
    }

    static fromPrimitives(data: any): ClaseConsultaAdmin {
        return new ClaseConsultaAdmin(
            new IdConsultaAdmin(data.id),
            new IdUsuario(data.id),
            new TipoConsultaAdmin(data.tipoConsulta),
            data.resultado?new ResultadoConsultaAdmin(data?.resultado):undefined
        )
    }
}
