import { CantidadDetalleExport } from "../validation/cantidadDetalleExport"
import { IdDetalleExport } from "../validation/idDetalleExport"
import { IdExportacion } from "../validation/idExportacion"
import { IdSombrero } from "../validation/idSombrero"
import { PrecioVentaDetalleExport } from "../validation/precioVentaDetalleExport"

export class ClaseDetalleExport{
    id:IdDetalleExport
    idExportacion:IdExportacion
    idSombrero:IdSombrero
    cantidad:CantidadDetalleExport
    precioVenta:PrecioVentaDetalleExport

    constructor(
        id:IdDetalleExport,
        idExportacion:IdExportacion,
        idSombrero:IdSombrero,
        cantidad:CantidadDetalleExport,
        precioVenta:PrecioVentaDetalleExport
    ) {
        this.id=id
        this.idExportacion=idExportacion
        this.idSombrero=idSombrero
        this.cantidad=cantidad
        this.precioVenta=precioVenta
    }

    public toPrimitives() {
        return {
            id:this.id.id,
            idExportacion:this.idExportacion.id,
            idSombrero:this.idSombrero.id,
            cantidad:this.cantidad.cantidad,
            precioVenta:this.precioVenta.precioVenta
        };
    }

    static fromPrimitives(data: any): ClaseDetalleExport {
        return new ClaseDetalleExport(
            new IdDetalleExport(data.id),
            new IdExportacion(data.id),
            new IdSombrero(data.id),
            new CantidadDetalleExport(data.cantidad),
            new PrecioVentaDetalleExport(data.precioVenta)
        )
    }
}
