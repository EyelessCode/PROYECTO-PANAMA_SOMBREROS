import { IdTalla } from "../idTalla"
import { TipoTalla } from "./tipoTalla"

export class Talla{
    id:IdTalla
    talla:TipoTalla

    constructor(id:IdTalla,talla:TipoTalla) {
        this.id=id
        this.talla=talla
    }

    toPrimitives() {
        return {
            id: this.id.id,
            talla: this.talla
        }
    }

    static fromPrimitives(data: any): Talla {
        return new Talla(
            new IdTalla(data.id),
            new TipoTalla(data.talla)
        )
    }

}
