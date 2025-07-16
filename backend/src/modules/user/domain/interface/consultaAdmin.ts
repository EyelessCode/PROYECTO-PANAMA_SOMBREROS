import { IdConsultaAdmin } from "../validation/consultaAdmin/idConsultaAdmin"
import { IdUsuario } from "../validation/consultaAdmin/idUsuario"
import { ResultadoConsultaAdmin } from "../validation/consultaAdmin/resultadoConsultaAdmin"
import { TipoConsultaAdmin } from "../validation/consultaAdmin/tipoConsultaAdmin"

export class ClaseConsultaAdmin{
    id:IdConsultaAdmin
    idAdmin:IdUsuario
    fechaConsulta:Date
    tipoConsulta:TipoConsultaAdmin
    resultado?:ResultadoConsultaAdmin

    constructor(
        id:IdConsultaAdmin,
        idAdmin:IdUsuario,
        tipoConsulta:TipoConsultaAdmin,
        resultado?:ResultadoConsultaAdmin
    ) {
        this.id=id
        this.idAdmin=idAdmin
        this.fechaConsulta=new Date()
        this.tipoConsulta=tipoConsulta
        this.resultado=resultado
    }

    public toPrimitives() {
        return {
            id:this.id.id,
            idAdmin:this.idAdmin.id,
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
