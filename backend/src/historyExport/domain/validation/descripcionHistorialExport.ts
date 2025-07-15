export class DescripcionHistorialExport{
    descripcionCambio:string|null

    constructor(descripcionCambio?:string) {
        if(descripcionCambio&&descripcionCambio.length>500){
            throw new Error("Descripción muy larga")
        }
        this.descripcionCambio=descripcionCambio||null
    }
}
