export class NombrePais{
    pais:string

    constructor(pais:string) {
        this.pais=pais
        this.vacio()
        this.caracteresLimite()
    }

    private vacio(){
        if (!this.pais||this.pais.trim()==='') {
            throw new Error(`El pais no puede estar vacío!`)
        }
    }

    private caracteresLimite(){
        if (this.pais.length>=100) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get paisValor():string{
        return this.pais
    }
}
