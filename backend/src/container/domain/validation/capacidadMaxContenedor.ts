export class CapacidadMaxContenedor{
    capacidadMax:number

    constructor(capacidadMax:number) {
        this.capacidadMax=capacidadMax
        this.numNegativo()
    }

    private numNegativo(){
        if (this.capacidadMax<=0) {
            throw new Error(`El ID no puede ser menor a '0'!`)
        }
    }
}
