import { Pool } from "pg";
import { IRepositorioConsultaAdmin } from "../../../../domain/repository/consultaAdmin/consultaAdmin.repositorio";
import { ClaseConsultaAdmin } from "../../../../domain/interface/consultaAdmin";
import { IdConsultaAdmin } from "../../../../domain/validation/consultaAdmin/idConsultaAdmin";
import { ResultadoConsultaAdmin } from "../../../../domain/validation/consultaAdmin/resultadoConsultaAdmin";
import { TipoConsultaAdmin } from "../../../../domain/validation/consultaAdmin/tipoConsultaAdmin";
import { IdUsuario } from "../../../../domain/validation/consultaAdmin/idUsuario";

type pgConsultaAdmin={
    id_consulta:number,
    id_admin:number,
    fecha_consulta:Date,
    tipo_consulta:string,
    resultado:string,
}

export class RepositorioPosgreSqlConsultaAdmin implements IRepositorioConsultaAdmin{
    private mapeoDominio(data:pgConsultaAdmin):ClaseConsultaAdmin{
        return new ClaseConsultaAdmin(
            new IdConsultaAdmin(data.id_consulta),
            new IdUsuario(data.id_admin),
            new TipoConsultaAdmin(data.tipo_consulta),
            data.resultado?new ResultadoConsultaAdmin(data?.resultado):undefined
        )
    }

    entidadPg:Pool
    constructor(databaseUrl:string){
        this.entidadPg=new Pool({
            connectionString:databaseUrl
        })
    }
    
    async getAll(): Promise<ClaseConsultaAdmin[]> {
        const query={
            text:`SELECT * FROM consultas_admin`
        }

        const resultado=await this.entidadPg.query<pgConsultaAdmin>(query)
        return resultado.rows.map((row)=>this.mapeoDominio(row))
    }

    async getOneById(id: IdConsultaAdmin): Promise<ClaseConsultaAdmin | null> {
        const query={
            text:`SELECT * FROM consultas_admin WHERE id_consulta=$1`,
            values:[id.id]
        }

        const resultado=await this.entidadPg.query<pgConsultaAdmin>(query)
        if(resultado.rows.length===0)throw null

        const fila=resultado.rows[0]

        return this.mapeoDominio(fila)
    }

    async create(consultaAdmin: ClaseConsultaAdmin): Promise<void> {
        const query={
            text:`INSERT INTO consultas_admin (id_admin,
                fecha_consulta,tipo_consulta,resultado) VALUES($1,$2,$3,$4)`,
            values:[
                // consultaAdmin.id.id,
                consultaAdmin.idAdmin.id,
                consultaAdmin.fechaConsulta,
                consultaAdmin.tipoConsulta.tipoConsulta,
                consultaAdmin?.resultado?.resultado,
            ]
        }

        await this.entidadPg.query(query)
    }

    async edit(consultaAdmin: ClaseConsultaAdmin): Promise<void> {
        const query={
            text:`UPDATE consultas_admin SET id_admin=$1,
                fecha_consulta=$2,tipo_consulta=$3,resultado=$4 `+
                `WHERE id_consulta=$5`,
            values:[
                consultaAdmin.idAdmin.id,
                consultaAdmin.fechaConsulta,
                consultaAdmin.tipoConsulta.tipoConsulta,
                consultaAdmin?.resultado?.resultado,
                consultaAdmin.id.id
            ]
        }

        await this.entidadPg.query(query)
    }
    
    async delete(id: IdConsultaAdmin): Promise<void> {
        const query={
            text:`DELETE FROM consultas_admin WHERE id_consulta=$1`,
            values:[id.id]
        }

        await this.entidadPg.query(query)
    }

}
