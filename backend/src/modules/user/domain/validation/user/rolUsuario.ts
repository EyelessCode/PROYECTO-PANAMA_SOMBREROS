export enum RolUsuario{
    USUARIO="usuario",
    ADMINISTRACION="administrador"
}

export function validarRol(rol: string): RolUsuario {
    if (Object.values(RolUsuario).includes(rol as RolUsuario)) {
        return rol as RolUsuario;
    }
    throw new Error(`Rol inválido. Valores permitidos: ${Object.values(RolUsuario).join(", ")}`)
}
