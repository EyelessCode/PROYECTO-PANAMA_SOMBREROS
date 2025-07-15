import { AccionHistorialExport } from "../validation/accionHistorialExport"
import { DescripcionHistorialExport } from "../validation/descripcionHistorialExport"
import { IdExportacion } from "../validation/idExportacion"
import { IdHistorialExport } from "../validation/idHistorialExport"
import { IdUsuario } from "../validation/idUsuario"

export class ClaseHistorialExport{
    id:IdHistorialExport
    idExportacion:IdExportacion
    idUsuario:IdUsuario
    fechaActualizacion:Date
    accion:AccionHistorialExport
    descripcionCambio:DescripcionHistorialExport

    constructor(
        id:IdHistorialExport,
        idExportacion:IdExportacion,
        idUsuario:IdUsuario,
        accion:AccionHistorialExport,
        descripcionCambio:DescripcionHistorialExport
    ) {
        this.id=id
        this.idExportacion=idExportacion
        this.idUsuario=idUsuario
        this.fechaActualizacion=new Date()
        this.accion=accion
        this.descripcionCambio=descripcionCambio
    }

    public toPrimitives() {
        return {
            id:this.id.id,
            idExportacion:this.idExportacion.id,
            idUsuario:this.idUsuario.id,
            fechaActualizacion:this.fechaActualizacion,
            accion:this.accion.accion,
            descripcionCambio:this.descripcionCambio.descripcionCambio,
        };
    }

    static fromPrimitives(data: any): ClaseHistorialExport {
        return new ClaseHistorialExport(
            new IdHistorialExport(data.id),
            new IdExportacion(data.id),
            new IdUsuario(data.id),
            new AccionHistorialExport(data.accion),
            new DescripcionHistorialExport(data.descripcionCambio),
        )
    }
}
