import { ClaseContenedor } from "../../domain/interface/container"
import { IRepositorioContenedor } from "../../domain/repository/contenedor.repositorio"
import { CapacidadMaxContenedor } from "../../domain/validation/capacidadMaxContenedor"
import { CodigoContenedor } from "../../domain/validation/codigoContenedor"
import { DescripcionContenedor } from "../../domain/validation/descripcionContenedor"
import { IdContenedor } from "../../domain/validation/idContenedor"
import { PesoMaxContenedor } from "../../domain/validation/pesoMaxContenedor"

export class ServicioCrearContenedor{
    constructor(private repo:IRepositorioContenedor) {}

    async run(
        id:number,
        codigo:string,
        capacidadMax:number,
        pesoMax:number,
        descripcion?:string
    ):Promise<void>{
        const contenedor=new ClaseContenedor(
            new IdContenedor(id),
            new CodigoContenedor(codigo),
            new CapacidadMaxContenedor(capacidadMax),
            new PesoMaxContenedor(pesoMax),
            descripcion?new DescripcionContenedor(descripcion):undefined
        )

        return this.repo.create(contenedor)
    }
}
