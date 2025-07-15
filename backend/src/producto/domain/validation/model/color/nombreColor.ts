export class NombreColor{
    color:string

    constructor(color:string) {
        this.color=color
        this.vacio()
        this.caracteresLimite()
    }
    
    private vacio(){
        if (!this.color||this.color.trim()==='') {
            throw new Error(`El color no puede estar vacío!`)
        }
    }

    private caracteresLimite(){
        if (this.color.length>=50) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get colorValor():string{
        return this.color
    }
}
