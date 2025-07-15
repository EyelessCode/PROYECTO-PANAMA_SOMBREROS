export class ResultadoConsultaAdmin{
    resultado:string|null

    constructor(resultado?:string) {
        if(resultado&&resultado.length>500){
            throw new Error("Descripción muy larga")
        }
        this.resultado=resultado||null
    }
}
