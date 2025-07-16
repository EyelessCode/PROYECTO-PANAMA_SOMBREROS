import { Pool } from "pg";
import { ClaseExportacion } from "../../../domain/interface/exportacion"
import { IRepositorioExportacion } from "../../../domain/repository/exportacion.repositorio"
import { IdContenedor } from "../../../domain/validation/idContenedor";
import { IdExportacion } from "../../../domain/validation/idExportacion"
import { IdMoneda } from "../../../domain/validation/idMoneda";
import { IdPais } from '../../../domain/validation/idPais';
import { ValorFleteExportacion } from "../../../domain/validation/valorFleteExportacion";
import { EstadoExportacion } from "../../../domain/validation/estadoExportacion";

type PgExportacion={
    id_exportacion:number
    id_contenedor:number
    id_pais_destino:number
    id_moneda:number
    fecha_salida:Date
    fecha_llegada_estimada?:Date
    valor_flete:number
    estado:string
    fecha_registro:Date
}

export class RepositorioPosgreSqlExportacion implements IRepositorioExportacion{
    private mapeoDominio(data:PgExportacion):ClaseExportacion{
        return new ClaseExportacion(
            new IdExportacion(data.id_exportacion),
            new IdContenedor(data.id_contenedor),
            new IdPais(data.id_pais_destino),
            new IdMoneda(data.id_moneda),
            new Date(data.fecha_salida),
            new ValorFleteExportacion(data.valor_flete),
            new EstadoExportacion(data.estado),
            data.fecha_llegada_estimada?new Date(data.fecha_llegada_estimada):undefined
        )
    }

    entidadPg:Pool
    constructor(databaseUrl:string){
        this.entidadPg=new Pool({
            connectionString:databaseUrl
        })
    }
    
    async getAll(): Promise<ClaseExportacion[]> {
        const query={
            text:`SELECT * FROM exportacion`
        }

        const resultado=await this.entidadPg.query<PgExportacion>(query)
        return resultado.rows.map((row)=>this.mapeoDominio(row))
    }

    async getOneById(id: IdExportacion): Promise<ClaseExportacion | null> {
        const query={
            text:`SELECT * FROM exportacion WHERE id_exportacion=$1`,
            values:[id.id]
        }

        const resultado=await this.entidadPg.query<PgExportacion>(query)
        if(resultado.rows.length===0)throw null

        const fila=resultado.rows[0]

        return this.mapeoDominio(fila)
    }

    async create(exportacion: ClaseExportacion): Promise<void> {
        const query={
            text:`INSERT INTO exportacion (id_contenedor,
                id_pais_destino,id_moneda,fecha_salida,fecha_llegada_estimada,
                valor_flete,estado,fecha_registro) VALUES($1,$2,$3,$4,$5,
                $6,$7,$8)`,
            values:[
                exportacion.idContenedor.id,
                exportacion.pais.id,
                exportacion.moneda.id,
                exportacion.fechaSalida,
                exportacion.fechaLlegada??null,
                exportacion.valorFlete.valorFlete,
                exportacion.estado.estado,
                exportacion.fechaRegistro
            ]
        }

        await this.entidadPg.query(query)
    }

    async edit(exportacion: ClaseExportacion): Promise<void> {
        const query={
            text:`UPDATE exportacion SET id_contenedor=$1,
                id_pais_destino=$2,id_moneda=$3,fecha_salida=$4,fecha_llegada_estimada=$5,
                valor_flete=$6,estado=$7,fecha_registro=8 `+
                `WHERE id_exportacion=$9`,
            values:[
                exportacion.idContenedor.id,
                exportacion.pais.id,
                exportacion.moneda.id,
                exportacion.fechaSalida,
                exportacion.fechaLlegada??null,
                exportacion.valorFlete.valorFlete,
                exportacion.estado.estado,
                exportacion.fechaRegistro,
                exportacion.id.id
            ]
        }

        await this.entidadPg.query(query)
    }
    
    async delete(id: IdExportacion): Promise<void> {
        const query={
            text:`DELETE FROM exportacion WHERE id_exportacion=$1`,
            values:[id.id]
        }

        await this.entidadPg.query(query)
    }

}
