import { IRepositorioUsuario } from "../../../domain/repository/user/usuario.repositorio"
import { IdUsuario } from "../../../domain/validation/user/idUsuario"


export class ServicioEliminarUsuario{
    constructor(private repo:IRepositorioUsuario){}

    async run(id:number):Promise<void>{
        const usuario=new IdUsuario(id)

        const existe=await this.repo.getOneById(usuario)
        if (!existe) {
            throw new Error(`No se encontró el usuario: ${id}!`)
        }

        return this.repo.delete(usuario)
    }
}
