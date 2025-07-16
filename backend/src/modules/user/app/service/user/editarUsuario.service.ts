import { ClaseUsuario } from "../../../domain/interface/usuario"
import { IRepositorioUsuario } from "../../../domain/repository/user/usuario.repositorio"
import { CedulaUsuario } from "../../../domain/validation/user/cedulaUsuario"
import { ContraseniaUsuario } from "../../../domain/validation/user/contraseniaUsuario"
import { CorreoUsuario } from "../../../domain/validation/user/correoUsuario"
import { IdUsuario } from "../../../domain/validation/user/idUsuario"
import { NombreUsuario } from "../../../domain/validation/user/nombreUsuario"
import { RolUsuario } from "../../../domain/validation/user/rolUsuario"


export class ServicioEditarUsuario{
    constructor(private repo:IRepositorioUsuario) {}

    async run(
        id:number,
        cedula:string,
        nombre:string,
        correo:string,
        contrasenia:string,
        rol:string
    ):Promise<void>{
        const usuario=new ClaseUsuario(
            new IdUsuario(id),
            new CedulaUsuario(cedula),
            new NombreUsuario(nombre),
            new CorreoUsuario(correo),
            new ContraseniaUsuario(contrasenia),
            new RolUsuario(rol)
        )

        const existe=await this.repo.getOneById(usuario.id)
        if (!existe) {
            throw new Error(`No se encontró el usuario: ${id}!`)
        }
        return this.repo.edit(usuario)
    }
}
