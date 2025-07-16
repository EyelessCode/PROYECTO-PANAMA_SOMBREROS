import { Pool } from "pg";
import { IRepositorioUsuario } from "../../../../domain/repository/user/usuario.repositorio";
import { ClaseUsuario } from "../../../../domain/interface/usuario";
import { IdUsuario } from "../../../../domain/validation/user/idUsuario";
import { CedulaUsuario } from "../../../../domain/validation/user/cedulaUsuario";
import { ContraseniaUsuario } from "../../../../domain/validation/user/contraseniaUsuario";
import { CorreoUsuario } from "../../../../domain/validation/user/correoUsuario";
import { NombreUsuario } from "../../../../domain/validation/user/nombreUsuario";
import { RolUsuario } from "../../../../domain/validation/user/rolUsuario";

type pgUsuario={
    id_usuario:number,
    cedula:string,
    nombre:string,
    correo:string,
    contrasenia:string,
    rol:string
}

export class RepositorioPosgreSqlUsuario implements IRepositorioUsuario{
    private mapeoDominio(data:pgUsuario):ClaseUsuario{
        return new ClaseUsuario(
            new IdUsuario(data.id_usuario),
            new CedulaUsuario(data.cedula),
            new NombreUsuario(data.nombre),
            new CorreoUsuario(data.correo),
            new ContraseniaUsuario(data.contrasenia),
            new RolUsuario(data.rol)
        )
    }

    entidadPg:Pool
    constructor(databaseUrl:string){
        this.entidadPg=new Pool({
            connectionString:databaseUrl
        })
    }
    
    async getAll(): Promise<ClaseUsuario[]> {
        const query={
            text:`SELECT * FROM usuario`
        }

        const resultado=await this.entidadPg.query<pgUsuario>(query)
        return resultado.rows.map((row)=>this.mapeoDominio(row))
    }

    async getOneById(id: IdUsuario): Promise<ClaseUsuario | null> {
        const query={
            text:`SELECT * FROM usuario WHERE id_usuario=$1`,
            values:[id.id]
        }

        const resultado=await this.entidadPg.query<pgUsuario>(query)
        if(resultado.rows.length===0)throw null

        const fila=resultado.rows[0]

        return this.mapeoDominio(fila)
    }

    async create(usuario: ClaseUsuario): Promise<void> {
        const query={
            text:`INSERT INTO usuario (cedula,
                nombre,correo,contrasenia,rol) VALUES($1,$2,$3,$4,$5)`,
            values:[
                // usuario.id.id,
                usuario.cedula.cedula,
                usuario.nombre.nombre,
                usuario.correo.correo,
                usuario.contrasenia.contrasenia,
                usuario.rol.rol,
            ]
        }

        await this.entidadPg.query(query)
    }

    async edit(usuario: ClaseUsuario): Promise<void> {
        const query={
            text:`UPDATE usuario SET cedula=$1,
                nombre=$2,correo=$3,contrasenia=$4,rol=$5 `+
                `WHERE id_usuario=$6`,
            values:[
                usuario.cedula.cedula,
                usuario.nombre.nombre,
                usuario.correo.correo,
                usuario.contrasenia.contrasenia,
                usuario.rol.rol,
                usuario.id.id
            ]
        }

        await this.entidadPg.query(query)
    }
    
    async delete(id: IdUsuario): Promise<void> {
        const query={
            text:`DELETE FROM usuario WHERE id_usuario=$1`,
            values:[id.id]
        }

        await this.entidadPg.query(query)
    }

}
