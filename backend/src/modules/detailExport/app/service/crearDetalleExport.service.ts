import { ClaseDetalleExport } from "../../domain/interface/detalleExport"
import { IRepositorioDetalleExport } from "../../domain/repository/detalleExport.repositorio"
import { CantidadDetalleExport } from "../../domain/validation/cantidadDetalleExport"
import { IdDetalleExport } from "../../domain/validation/idDetalleExport"
import { IdExportacion } from "../../domain/validation/idExportacion"
import { IdSombrero } from "../../domain/validation/idSombrero"
import { PrecioVentaDetalleExport } from "../../domain/validation/precioVentaDetalleExport"

export class ServicioCrearDetalleExport{
    constructor(private repo:IRepositorioDetalleExport) {}

    async run(
        id:number,
        idExportacion:number,
        idSombrero:number,
        cantidad:number,
        precioVenta:number
    ):Promise<void>{
        const detalleExport=new ClaseDetalleExport(
            new IdDetalleExport(id),
            new IdExportacion(idExportacion),
            new IdSombrero(idSombrero),
            new CantidadDetalleExport(cantidad),
            new PrecioVentaDetalleExport(precioVenta)
        )

        return this.repo.create(detalleExport)
    }
}
