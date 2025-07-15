export class TipoConsultaAdmin{
    tipoConsulta:string

    constructor(tipoConsulta:string) {
        this.tipoConsulta=tipoConsulta
        this.vacio()
        this.caracteresLimite()
    }

    private vacio(){
        if (!this.tipoConsulta||this.tipoConsulta.trim()==='') {
            throw new Error(`El tipoConsulta no puede estar vacío!`)
        }
    }

    private caracteresLimite(){
        if (this.tipoConsulta.length>100) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get tipoConsultaValor():string{
        return this.tipoConsulta
    }
}
