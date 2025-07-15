import { IRepositorioContenedor } from "../../domain/repository/contenedor.repositorio"
import { IdContenedor } from "../../domain/validation/idContenedor"

export class ServicioEliminarContenedor{
    constructor(private repo:IRepositorioContenedor){}

    async run(id:number):Promise<void>{
        const contenedor=new IdContenedor(id)

        const existe=await this.repo.getOneById(contenedor)
        if (!existe) {
            throw new Error(`No se encontró el contenedor: ${id}!`)
        }

        return this.repo.delete(contenedor)
    }
}
