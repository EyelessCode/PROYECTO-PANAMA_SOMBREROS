import { ClaseUsuario } from "../../../domain/interface/usuario";
import { IRepositorioUsuario } from "../../../domain/repository/user/usuario.repositorio";

export class ServicioObtenerUsuarios{
    constructor(private repo:IRepositorioUsuario) {}

    async run():Promise<ClaseUsuario[]>{
        return this.repo.getAll()
    }
}
