export class CedulaUsuario{
    cedula:string

    constructor(cedula:string) {
        this.cedula=cedula
        this.vacio()
        this.caracteresLimite()
    }

    private vacio(){
        if (!this.cedula||this.cedula.trim()==='') {
            throw new Error(`El cedula no puede estar vacío!`)
        }
    }

    private caracteresLimite(){
        if (this.cedula.length!==10) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get cedulaValor():string{
        return this.cedula
    }
}
