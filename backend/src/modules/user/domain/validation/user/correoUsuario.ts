export class CorreoUsuario{
    correo:string

    constructor(correo:string) {
        this.correo=correo
        this.vacio()
        this.caracteresLimite()
        this.sinArroba()
    }

    private vacio(){
        if (!this.correo||this.correo.trim()==='') {
            throw new Error(`El correo no puede estar vacío!`)
        }
    }

    private sinArroba(){
        if (!this.correo.includes('@')) {
            throw new Error(`El correo debe tener '@'!`)
        }
    }

    private caracteresLimite(){
        if (this.correo.length>=100) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get correoValor():string{
        return this.correo
    }
}
