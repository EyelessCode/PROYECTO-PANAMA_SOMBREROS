export class CodigoIsoMoneda{
    codigoIso:string|null

    constructor(codigoIso?:string|null) {
        this.codigoIso=codigoIso||null
        
        if (!this.codigoIso!==null) {
            this.validar()
        }
    }

    private validar(){
        if (this.codigoIso&&this.codigoIso.length>3) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get codigoIsoValor():string|null{
        return this.codigoIso
    }
}
