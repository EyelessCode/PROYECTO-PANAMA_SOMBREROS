import { Pool } from "pg"
import { IRepositorioDetalleExport } from "../../../domain/repository/detalleExport.repositorio"
import { IdDetalleExport } from "../../../domain/validation/idDetalleExport"
import { IdExportacion } from "../../../domain/validation/idExportacion"
import { IdSombrero } from "../../../domain/validation/idSombrero"
import { CantidadDetalleExport } from "../../../domain/validation/cantidadDetalleExport"
import { PrecioVentaDetalleExport } from "../../../domain/validation/precioVentaDetalleExport"
import { ClaseDetalleExport } from "../../../domain/interface/detalleExport"

type PgDetalleExport={
    id_detalle_expo:number,
    id_exportacion:number,
    id_sombrero:number,
    cantidad:number,
    precio_venta:number
}

export class RepositorioPostgreSqlDetallesExport implements IRepositorioDetalleExport{
    private mapeoDominio(data:PgDetalleExport):ClaseDetalleExport{
        return new ClaseDetalleExport(
            new IdDetalleExport(data.id_detalle_expo),
            new IdExportacion(data.id_exportacion),
            new IdSombrero(data.id_sombrero),
            new CantidadDetalleExport(data.cantidad),
            new PrecioVentaDetalleExport(data.precio_venta)
        )
    }

    entidadPg:Pool
    constructor(databaseUrl:string){
        this.entidadPg=new Pool({
            connectionString:databaseUrl
        })
    }
    
    async getAll(): Promise<ClaseDetalleExport[]> {
        const query={
            text:`SELECT * FROM detalle_exportacion`
        }

        const resultado=await this.entidadPg.query<PgDetalleExport>(query)
        return resultado.rows.map((row)=>this.mapeoDominio(row))
    }

    async getOneById(id: IdDetalleExport): Promise<ClaseDetalleExport | null> {
        const query={
            text:`SELECT * FROM detalle_exportacion WHERE id_detalle_expo=$1`,
            values:[id.id]
        }

        const resultado=await this.entidadPg.query<PgDetalleExport>(query)
        if(resultado.rows.length===0)throw null

        const fila=resultado.rows[0]

        return this.mapeoDominio(fila)
    }

    async create(detalleExport: ClaseDetalleExport): Promise<void> {
        const query={
            text:`INSERT INTO detalle_exportacion (id_exportacion,
                id_sombrero,cantidad,precio_venta) VALUES($1,$2,$3,$4)`,
            values:[
                detalleExport.idExportacion.id,
                detalleExport.idSombrero.id,
                detalleExport.cantidad.cantidad,
                detalleExport.precioVenta?.precioVenta
            ]
        }

        await this.entidadPg.query(query)
    }

    async edit(detalleExport: ClaseDetalleExport): Promise<void> {
        const query={
            text:`UPDATE detalle_exportacion SET id_exportacion=$1,
                id_sombrero=$2,cantidad=$3,precio_venta=$4 `+
                `WHERE id_detalle_expo=$5`,
            values:[
                detalleExport.idExportacion.id,
                detalleExport.idSombrero.id,
                detalleExport.cantidad.cantidad,
                detalleExport.precioVenta?.precioVenta,
                detalleExport.id.id
            ]
        }

        await this.entidadPg.query(query)
    }
    
    async delete(id: IdDetalleExport): Promise<void> {
        const query={
            text:`DELETE FROM detalle_exportacion WHERE id_detalle_expo=$1`,
            values:[id.id]
        }

        await this.entidadPg.query(query)
    }

}
