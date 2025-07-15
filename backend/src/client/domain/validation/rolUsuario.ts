export class RolUsuario{
    rol:string

    constructor(rol:string) {
        this.rol=rol
        this.vacio()
        this.caracteresLimite()
    }

    private vacio(){
        if (!this.rol||this.rol.trim()==='') {
            throw new Error(`El rol no puede estar vacío!`)
        }
    }

    private caracteresLimite(){
        if (this.rol.length>=25) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get rolValor():string{
        return this.rol
    }
}
