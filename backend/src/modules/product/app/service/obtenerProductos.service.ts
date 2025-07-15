import { ClaseProducto } from "../../domain/interface/producto";
import { IRepositorioProducto } from "../../domain/repository/producto.repositorio";

export class ServicioObtenerProductos{
    constructor(private repo:IRepositorioProducto) {}

    async run():Promise<ClaseProducto[]>{
        return this.repo.getAll()
    }
}
