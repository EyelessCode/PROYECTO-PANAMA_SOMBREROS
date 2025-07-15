export class AccionHistorialExport{
    accion:string

    constructor(accion:string) {
        this.accion=accion
        this.vacio()
        this.caracteresLimite()
    }

    private vacio(){
        if (!this.accion||this.accion.trim()==='') {
            throw new Error(`El accion no puede estar vacío!`)
        }
    }

    private caracteresLimite(){
        if (this.accion.length>50) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get accionValor():string{
        return this.accion
    }
}
