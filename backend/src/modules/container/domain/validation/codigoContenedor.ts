export class CodigoContenedor{
    codigo:string

    constructor(codigo:string) {
        this.codigo=codigo
        this.vacio()
        this.caracteresLimite()
    }

    private vacio(){
        if (!this.codigo||this.codigo.trim()==='') {
            throw new Error(`El codigo no puede estar vacío!`)
        }
    }

    private caracteresLimite(){
        if (this.codigo.length>50) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get codigoValor():string{
        return this.codigo
    }
}
