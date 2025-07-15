export class PesoMaxContenedor{
    pesoMax:number

    constructor(pesoMax:number) {
        this.pesoMax=pesoMax
        this.numNegativo()
    }

    private numNegativo(){
        if (this.pesoMax<=0) {
            throw new Error(`El ID no puede ser menor a '0'!`)
        }
    }
}
