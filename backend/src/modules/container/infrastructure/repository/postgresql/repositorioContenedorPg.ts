import { Pool } from "pg"
import { ClaseContenedor } from "../../../domain/interface/container"
import { IRepositorioContenedor } from "../../../domain/repository/contenedor.repositorio"
import { CapacidadMaxContenedor } from "../../../domain/validation/capacidadMaxContenedor"
import { CodigoContenedor } from "../../../domain/validation/codigoContenedor"
import { DescripcionContenedor } from "../../../domain/validation/descripcionContenedor"
import { IdContenedor } from "../../../domain/validation/idContenedor"
import { PesoMaxContenedor } from "../../../domain/validation/pesoMaxContenedor"

type PgContenedor={
    id_contenedor:number,
    codigo_contenedor:string,
    capacidad_maxima:number,
    peso_maximo:number,
    descripcion?:string
}

export class RepositorioPostgreSqlContenedor implements IRepositorioContenedor{
    private mapeoDominio(data:PgContenedor):ClaseContenedor{
        return new ClaseContenedor(
            new IdContenedor(data.id_contenedor),
            new CodigoContenedor(data.codigo_contenedor),
            new CapacidadMaxContenedor(data.capacidad_maxima),
            new PesoMaxContenedor(data.peso_maximo),
            new DescripcionContenedor(data.descripcion)
        )
    }

    entidadPg:Pool
    constructor(databaseUrl:string){
        this.entidadPg=new Pool({
            connectionString:databaseUrl
        })
    }
    
    async getAll(): Promise<ClaseContenedor[]> {
        const query={
            text:`SELECT * FROM contenedor`
        }

        const resultado=await this.entidadPg.query<PgContenedor>(query)
        return resultado.rows.map((row)=>this.mapeoDominio(row))
    }

    async getOneById(id: IdContenedor): Promise<ClaseContenedor | null> {
        const query={
            text:`SELECT * FROM contenedor WHERE id_contenedor=$1`,
            values:[id.id]
        }

        const resultado=await this.entidadPg.query<PgContenedor>(query)
        if(resultado.rows.length===0)throw null

        const fila=resultado.rows[0]

        return this.mapeoDominio(fila)
    }

    async create(contenedor: ClaseContenedor): Promise<void> {
        const query={
            text:`INSERT INTO contenedor (codigo_contenedor,capacidad_maxima,
                peso_maximo,descripcion) VALUES($1,$2,$3,$4)`,
            values:[
                contenedor.codigo.codigo,
                contenedor.capacidadMax.capacidadMax,
                contenedor.pesoMax.pesoMax,
                contenedor.descripcion?.descripcion||null
            ]
        }

        await this.entidadPg.query(query)
    }

    async edit(contenedor: ClaseContenedor): Promise<void> {
        const query={
            text:`UPDATE contenedor SET codigo_contenedor=$1,capacidad_maxima=$2,peso_maximo=$3,
            descripcion=$4 `+
            `WHERE id_contenedor=$5`,
            values:[
                contenedor.codigo.codigo,
                contenedor.capacidadMax.capacidadMax,
                contenedor.pesoMax.pesoMax,
                contenedor.descripcion?.descripcion||null,
                contenedor.id.id
            ]
        }

        await this.entidadPg.query(query)
    }
    
    async delete(id: IdContenedor): Promise<void> {
        const query={
            text:`DELETE FROM contenedor WHERE id_contenedor=$1`,
            values:[id.id]
        }

        await this.entidadPg.query(query)
    }

}
