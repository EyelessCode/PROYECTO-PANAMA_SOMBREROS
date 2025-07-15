export class TipoTalla{
    talla:string

    constructor(talla:string) {
        this.talla=talla
        this.vacio()
        this.caracteresLimite()
    }
    
    private vacio(){
        if (!this.talla||this.talla.trim()==='') {
            throw new Error(`El talla no puede estar vacío!`)
        }
    }

    private caracteresLimite(){
        if (this.talla.length>=10) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get tallaValor():string{
        return this.talla
    }
}
