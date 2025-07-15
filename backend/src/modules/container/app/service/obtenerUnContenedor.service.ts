import { ClaseContenedor } from "../../domain/interface/container"
import { IRepositorioContenedor } from "../../domain/repository/contenedor.repositorio"
import { IdContenedor } from "../../domain/validation/idContenedor"

export class ServicioObtenerUnContenedor{
    constructor(private repo:IRepositorioContenedor){}

    async run(id:number):Promise<ClaseContenedor>{
        const contenedor=await this.repo.getOneById(new IdContenedor(id))

        if (!contenedor) {
            throw new Error(`No se encontró el contenedor: ${id}!`)
        }

        return contenedor
    }
}
