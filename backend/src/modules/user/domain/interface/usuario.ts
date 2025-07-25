import { CedulaUsuario } from "../validation/user/cedulaUsuario"
import { ContraseniaUsuario } from "../validation/user/contraseniaUsuario"
import { CorreoUsuario } from "../validation/user/correoUsuario"
import { IdUsuario } from "../validation/user/idUsuario"
import { NombreUsuario } from "../validation/user/nombreUsuario"
import { RolUsuario } from "../validation/user/rolUsuario"

export class ClaseUsuario{
    id:IdUsuario
    cedula:CedulaUsuario
    nombre:NombreUsuario
    correo:CorreoUsuario
    contrasenia:ContraseniaUsuario
    rol:RolUsuario

    constructor(
        id:IdUsuario,
        cedula:CedulaUsuario,
        nombre:NombreUsuario,
        correo:CorreoUsuario,
        contrasenia:ContraseniaUsuario,
        rol:RolUsuario
    ) {
        this.id=id
        this.cedula=cedula
        this.nombre=nombre
        this.correo=correo
        this.contrasenia=contrasenia
        this.rol=rol
    }

    public toPrimitives() {
        return {
            id:this.id.id,
            cedula:this.cedula.cedula,
            nombre:this.nombre.nombre,
            correo:this.correo.correo,
            contrasenia:this.contrasenia.contrasenia,
            rol:this.rol.rol
        };
    }

    static fromPrimitives(data: any): ClaseUsuario {
        return new ClaseUsuario(
            new IdUsuario(data.id),
            new CedulaUsuario(data.cedula),
            new NombreUsuario(data.nombre),
            new CorreoUsuario(data.correo),
            new ContraseniaUsuario(data.contrasenia),
            new RolUsuario(data.rol)
        )
    }
}
