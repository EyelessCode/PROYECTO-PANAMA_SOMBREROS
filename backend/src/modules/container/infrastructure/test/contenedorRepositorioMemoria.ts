import { ClaseContenedor } from "../../domain/interface/container"
import { IRepositorioContenedor } from "../../domain/repository/contenedor.repositorio"
import { IdContenedor } from "../../domain/validation/idContenedor"

export class RepositorioEnMemoriaContenedor implements IRepositorioContenedor{
    private contenedor:ClaseContenedor[]=[]

    async getAll(): Promise<ClaseContenedor[]> {
        return this.contenedor
    }

    async getOneById(id: IdContenedor): Promise<ClaseContenedor | null> {
        return this.contenedor.find((container)=>container.id.id===id.id)||null
    }

    async create(container: ClaseContenedor): Promise<void> {
        this.contenedor.push(container)
    }

    async edit(container: ClaseContenedor): Promise<void> {
        if(!container.id)throw new Error(`No se encontró el contenedor ${container.id}!`)

        const index=this.contenedor.findIndex((e)=>e.id.id===container.id.id)
        this.contenedor[index]=container
    }

    async delete(id: IdContenedor): Promise<void> {
        if(!id.id)throw new Error(`No se encontró el contenedor ${id.id}!`)
        
        this.contenedor=this.contenedor.filter((container)=>container.id.id!==id.id)
    }
}
