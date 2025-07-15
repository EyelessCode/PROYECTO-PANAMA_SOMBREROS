export class IdSombrero{
    id:number

    constructor(id:number) {
        this.id=id
        this.numNegativo()
    }

    private numNegativo(){
        if (this.id<0) {
            throw new Error(`El ID no puede ser menor a '0'!`)
        }
    }

    get idValor():number{
        return this.id
    }
}
