export class NombreMoneda{
    nombre:string

    constructor(nombre:string) {
        this.nombre=nombre
        this.vacio()
        this.caracteresLimite()
    }

    private vacio(){
        if (!this.nombre||this.nombre.trim()==='') {
            throw new Error(`El nombre no puede estar vacío!`)
        }
    }

    private caracteresLimite(){
        if (this.nombre.length>=100) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get nombreValor():string{
        return this.nombre
    }
}
