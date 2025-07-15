export class PrecioUnitarioSombrero{
    precioUnitario:number

    constructor(precioUnitario:number) {
        this.precioUnitario=precioUnitario
        this.numNegativo()
    }

    private numNegativo(){
        if (this.precioUnitario<=0) {
            throw new Error(`El ID no puede ser menor a '0'!`)
        }
    }
}
