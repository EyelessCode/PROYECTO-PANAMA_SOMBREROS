export class DescripcionContenedor{
    descripcion:string|null

    constructor(descripcion?:string) {
        if(descripcion&&descripcion.length>500){
            throw new Error("Descripción muy larga")
        }
        this.descripcion=descripcion||null
    }
}
