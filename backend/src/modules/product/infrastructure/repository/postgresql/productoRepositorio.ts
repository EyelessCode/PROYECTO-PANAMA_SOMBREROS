import { Pool } from "pg";
import { IRepositorioProducto } from "../../../domain/repository/producto.repositorio";
import { ClaseProducto } from "../../../domain/interface/producto";
import { IdSombrero } from "../../../domain/validation/model/idSombrero";
import { IdTipo } from "../../../domain/validation/model/idTipo";
import { IdTalla } from "../../../domain/validation/model/idTalla";
import { IdColor } from "../../../domain/validation/model/idColor";
import { PrecioUnitarioSombrero } from "../../../domain/validation/model/precioUnitarioSombrero";
import { DescripcionSombrero } from "../../../domain/validation/model/descripcionSombrero";

type pgProducto={
    id_sombrero:number
    id_tipo:number
    id_talla:number
    id_color:number
    precio_unitario:number
    descripcion?:string
    fecha_creacion:Date
    activo:boolean
}

export class RepositorioPosgreSqlProducto implements IRepositorioProducto{
    private mapeoDominio(data:pgProducto):ClaseProducto{
        return new ClaseProducto(
            new IdSombrero(data.id_sombrero),
            new IdTipo(data.id_tipo),
            new IdTalla(data.id_talla),
            new IdColor(data.id_color),
            new PrecioUnitarioSombrero(data.precio_unitario),
            new DescripcionSombrero(data?.descripcion),
            data.activo
        )
    }

    entidadPg:Pool
    constructor(databaseUrl:string){
        this.entidadPg=new Pool({
            connectionString:databaseUrl
        })
    }
    
    async getAll(): Promise<ClaseProducto[]> {
        const query={
            text:`SELECT * FROM sombrero`
        }

        const resultado=await this.entidadPg.query<pgProducto>(query)
        return resultado.rows.map((row)=>this.mapeoDominio(row))
    }

    async getOneById(id: IdSombrero): Promise<ClaseProducto | null> {
        const query={
            text:`SELECT * FROM sombrero WHERE id_sombrero=$1`,
            values:[id.id]
        }

        const resultado=await this.entidadPg.query<pgProducto>(query)
        if(resultado.rows.length===0)throw null

        const fila=resultado.rows[0]

        return this.mapeoDominio(fila)
    }

    async create(producto: ClaseProducto): Promise<void> {
        const query={
            text:`INSERT INTO sombrero (id_tipo,
                id_talla,id_color,precio_unitario,descripcion,
                fecha_creacion,activo) VALUES($1,$2,$3,$4,$5,
                $6,$7)`,
            values:[
                producto.idTipo.id,
                producto.idTalla.id,
                producto.idColor.id,
                producto.precioUnitario.precioUnitario,
                producto?.descripcion?.descripcion,
                producto.fechaCreacion,
                producto.activo
            ]
        }

        await this.entidadPg.query(query)
    }

    async edit(producto: ClaseProducto): Promise<void> {
        const query={
            text:`UPDATE sombrero SET id_tipo=$1,
                id_talla=$2,id_color=$3,precio_unitario=$4,descripcion=$5,
                fecha_creacion=$6,activo=$7 `+
                `WHERE id_sombrero=$8`,
            values:[
                producto.idTipo.id,
                producto.idTalla.id,
                producto.idColor.id,
                producto.precioUnitario.precioUnitario,
                producto?.descripcion?.descripcion,
                producto.fechaCreacion,
                producto.activo,
                producto.id.id
            ]
        }

        await this.entidadPg.query(query)
    }
    
    async delete(id: IdSombrero): Promise<void> {
        const query={
            text:`DELETE FROM sombrero WHERE id_sombrero=$1`,
            values:[id.id]
        }

        await this.entidadPg.query(query)
    }

}
