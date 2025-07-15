export class CantidadDetalleExport{
    cantidad:number

    constructor(cantidad:number) {
        this.cantidad=cantidad
        this.numNegativo()
    }

    private numNegativo(){
        if (this.cantidad<=0) {
            throw new Error(`El ID no puede ser menor a '0'!`)
        }
    }
}
