import { CodigoIsoMoneda } from "./codigoIsoMoneda"
import { IdMoneda } from "./idMoneda"
import { NombreMoneda } from "./nombreMoneda"
import { SimboloMoneda } from "./simboloMoneda"

export class Moneda{
    id:IdMoneda
    nombre:NombreMoneda
    codigoIso:CodigoIsoMoneda
    simbolo:SimboloMoneda

    constructor(id:IdMoneda,nombre:NombreMoneda,codigoIso:CodigoIsoMoneda,
        simbolo:SimboloMoneda
    ) {
        this.id=id
        this.nombre=nombre
        this.codigoIso=codigoIso
        this.simbolo=simbolo
    }

    toPrimitives() {
        return {
            id: this.id.id,
            nombre: this.nombre.nombre,
            codigoIso: this.codigoIso.codigoIso,
            simbolo: this.simbolo.simbolo
        }
    }

    static fromPrimitives(data: any): Moneda {
        return new Moneda(
            new IdMoneda(data.id),
            new NombreMoneda(data.nombre),
            new CodigoIsoMoneda(data.codigoIso),
            new SimboloMoneda(data.simbolo)
        )
    }

}
