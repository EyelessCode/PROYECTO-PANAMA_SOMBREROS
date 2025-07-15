export class ValorFleteExportacion{
    valorFlete:number

    constructor(valorFlete:number) {
        this.valorFlete=valorFlete
        this.numNegativo()
    }

    private numNegativo(){
        if (this.valorFlete<0) {
            throw new Error(`El ID no puede ser menor a '0'!`)
        }
    }
}
