export class CodigoIsoPais{
    codigoIso:string

    constructor(codigoIso:string) {
        this.codigoIso=codigoIso
        this.vacio()
        this.caracteresLimite()
    }

    private vacio(){
        if (!this.codigoIso||this.codigoIso.trim()==='') {
            throw new Error(`El codigoIso no puede estar vacío!`)
        }
    }

    private caracteresLimite(){
        if (this.codigoIso.length>3) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get codigoIsoValor():string{
        return this.codigoIso
    }
}
