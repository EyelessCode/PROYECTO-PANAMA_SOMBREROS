import { IdDetalleExport } from "../../../detailExport/domain/validation/idDetalleExport"
import { IdSombrero } from "../../../detailExport/domain/validation/idSombrero"
import { AccionHistorialExport } from "../validation/accionHistorialExport"
import { DescripcionHistorialExport } from "../validation/descripcionHistorialExport"
import { IdExportacion } from "../validation/idExportacion"

export class ClaseHistorialExport{
    id:IdDetalleExport
    idExportacion:IdExportacion
    idUsuario:IdSombrero
    fechaActualizacion:Date
    accion:AccionHistorialExport
    descripcionCambio:DescripcionHistorialExport

    constructor(
        id:IdDetalleExport,
        idExportacion:IdExportacion,
        idUsuario:IdSombrero,
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
            new IdDetalleExport(data.id),
            new IdExportacion(data.id),
            new IdSombrero(data.id),
            new AccionHistorialExport(data.accion),
            new DescripcionHistorialExport(data.descripcion),
        )
    }
}
