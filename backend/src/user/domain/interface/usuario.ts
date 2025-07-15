import { CedulaUsuario } from "../validation/cedulaUsuario"
import { ContraseniaUsuario } from "../validation/contraseniaUsuario"
import { CorreoUsuario } from "../validation/correoUsuario"
import { IdUsuario } from "../validation/idUsuario"
import { NombreUsuario } from "../validation/nombreUsuario"
import { RolUsuario } from "../validation/rolUsuario"

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
        rol:RolUsuario=RolUsuario.USUARIO
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
            rol:this.rol
        };
    }

    static fromPrimitives(data: any): ClaseUsuario {
        return new ClaseUsuario(
            new IdUsuario(data.id),
            new CedulaUsuario(data.cedula),
            new NombreUsuario(data.nombre),
            new CorreoUsuario(data.correo),
            new ContraseniaUsuario(data.contrasenia),
            data.rol as RolUsuario
        )
    }
}
