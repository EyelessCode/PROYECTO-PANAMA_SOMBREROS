import { ClaseContenedor } from "../../domain/interface/container";
import { IRepositorioContenedor } from "../../domain/repository/contenedor.repositorio";

export class ServicioObtenerContenedores{
    constructor(private repo:IRepositorioContenedor) {}

    async run():Promise<ClaseContenedor[]>{
        return this.repo.getAll()
    }
}
