export class RolUsuario{
    rol:string

    constructor(rol:string) {
        this.rol=rol
        this.validacion()
        this.caracteresLimite()
    }

    private validacion(){
        const rolValidos = ['usuario', 'administrador']

        if (!rolValidos.includes(this.rol)) {
            this.rol = 'usuario'
        }

    }

    private caracteresLimite(){
        if (this.rol.length>=20) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get rolValor():string{
        return this.rol
    }
}
