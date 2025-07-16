import { ClaseExportacion } from "../../domain/interface/exportacion"
import { IRepositorioExportacion } from "../../domain/repository/exportacion.repositorio"
import { EstadoExportacion } from "../../domain/validation/estadoExportacion"
import { IdContenedor } from "../../domain/validation/idContenedor"
import { IdExportacion } from "../../domain/validation/idExportacion"
import { IdMoneda } from "../../domain/validation/idMoneda"
import { IdPais } from "../../domain/validation/idPais"
import { ValorFleteExportacion } from "../../domain/validation/valorFleteExportacion"

export class ServicioEditarExportacion{
    constructor(private repo:IRepositorioExportacion) {}

    async run(
        id:number,
        idContenedor:number,
        idPais:number,
        idMoneda:number,
        fechaSalida:Date|string,
        valorFlete:number,
        estado:string,
        fechaLlegada?:Date|string
    ):Promise<void>{
        const fecha = typeof fechaSalida === 'string' ? new Date(fechaSalida):fechaSalida;

        if (isNaN(fecha.getTime())) {
            throw new Error("Fecha de consulta inválida");
        }
        
        const exportacion=new ClaseExportacion(
            new IdExportacion(id),
            new IdContenedor(idContenedor),
            new IdPais(idPais),
            new IdMoneda(idMoneda),
            new Date(fechaSalida),
            new ValorFleteExportacion(valorFlete),
            new EstadoExportacion(estado),
            fechaLlegada?new Date(fechaLlegada):undefined,
        )

        const existe=await this.repo.getOneById(exportacion.id)
        if (!existe) {
            throw new Error(`No se encontró la exportación: ${id}!`)
        }
        return this.repo.edit(exportacion)
    }
}
