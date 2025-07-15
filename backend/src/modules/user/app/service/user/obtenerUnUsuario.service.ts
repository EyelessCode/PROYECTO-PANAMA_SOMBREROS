import { ClaseUsuario } from "../../../domain/interface/usuario"
import { IRepositorioUsuario } from "../../../domain/repository/user/usuario.repositorio"
import { IdUsuario } from "../../../domain/validation/user/idUsuario"


export class ServicioObtenerUnUsuario{
    constructor(private repo:IRepositorioUsuario){}

    async run(id:number):Promise<ClaseUsuario>{
        const usuario=await this.repo.getOneById(new IdUsuario(id))

        if (!usuario) {
            throw new Error(`No se encontró el usuario: ${id}!`)
        }

        return usuario
    }
}
