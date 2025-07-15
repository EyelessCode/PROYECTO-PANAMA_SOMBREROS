import { ClaseHistorialExport } from "../../domain/interface/historialExport"
import { IRepositorioHistorialExport } from "../../domain/repository/historialExport.repositorio"
import { AccionHistorialExport } from "../../domain/validation/accionHistorialExport"
import { DescripcionHistorialExport } from "../../domain/validation/descripcionHistorialExport"
import { IdExportacion } from "../../domain/validation/idExportacion"
import { IdHistorialExport } from "../../domain/validation/idHistorialExport"
import { IdUsuario } from "../../domain/validation/idUsuario"

export class ServicioCrearHistorialExport{
    constructor(private repo:IRepositorioHistorialExport) {}

    async run(
        id:number,
        idExportacion:number,
        idUsuario:number,
        accion:string,
        descripcionCambio:string
    ):Promise<void>{
        const historialExport=new ClaseHistorialExport(
            new IdHistorialExport(id),
            new IdExportacion(idExportacion),
            new IdUsuario(idUsuario),
            new AccionHistorialExport(accion),
            new DescripcionHistorialExport(descripcionCambio),
        )

        return this.repo.create(historialExport)
    }
}
