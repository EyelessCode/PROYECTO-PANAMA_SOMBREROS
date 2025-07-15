import { IdTipo } from "./idTipo"
import { NombreTipo } from "./nombreTipo"

export class Tipo{
    id:IdTipo
    nombre:NombreTipo

    constructor(id:IdTipo,nombre:NombreTipo) {
        this.id=id
        this.nombre=nombre
    }

    toPrimitives() {
        return {
            id: this.id.id,
            nombre: this.nombre
        }
    }

    static fromPrimitives(data: any): Tipo {
        return new Tipo(
            new IdTipo(data.id),
            new NombreTipo(data.nombre)
        )
    }

}
