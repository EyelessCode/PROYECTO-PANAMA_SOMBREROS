import { CodigoIsoPais } from "./codigoIsoPais"
import { IdPais } from "./idPais"
import { NombrePais } from "./nombrePais"

export class Pais{
    id:IdPais
    pais:NombrePais
    codigoIso:CodigoIsoPais

    constructor(id:IdPais,pais:NombrePais,codigoIso:CodigoIsoPais) {
        this.id=id
        this.pais=pais
        this.codigoIso=codigoIso
    }

    toPrimitives() {
        return {
            id: this.id.id,
            pais: this.pais.pais,
            codigoIso: this.codigoIso.codigoIso
        }
    }

    static fromPrimitives(data: any): Pais {
        return new Pais(
            new IdPais(data.id),
            new NombrePais(data.pais),
            new CodigoIsoPais(data.codigoIso)
        )
    }

}
