export class SimboloMoneda{
    simbolo:string

    constructor(simbolo:string) {
        this.simbolo=simbolo
        this.vacio()
        this.caracteresLimite()
    }

    private vacio(){
        if (!this.simbolo||this.simbolo.trim()==='') {
            throw new Error(`El simbolo no puede estar vacío!`)
        }
    }

    private caracteresLimite(){
        if (this.simbolo.length>10) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get simboloValor():string{
        return this.simbolo
    }
}
