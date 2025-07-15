export class ContraseniaUsuario{
    contrasenia:string

    constructor(contrasenia:string) {
        this.contrasenia=contrasenia
        this.vacio()
        this.caracteresLimite()
    }

    private vacio(){
        if (!this.contrasenia||this.contrasenia.trim()==='') {
            throw new Error(`El contrasenia no puede estar vacío!`)
        }
    }

    private caracteresLimite(){
        if (this.contrasenia.length>=255) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get contraseniaValor():string{
        return this.contrasenia
    }
}
