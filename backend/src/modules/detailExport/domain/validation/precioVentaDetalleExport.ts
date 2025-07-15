export class PrecioVentaDetalleExport{
    precioVenta:number

    constructor(precioVenta:number) {
        this.precioVenta=precioVenta
        this.numNegativo()
    }

    private numNegativo(){
        if (this.precioVenta<=0) {
            throw new Error(`El ID no puede ser menor a '0'!`)
        }
    }
}
