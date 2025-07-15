import { ServicioCrearContenedor } from "../modules/container/app/service/crearContenedor.service"
import { ServicioEditarContenedor } from "../modules/container/app/service/editarContenedor.service"
import { ServicioEliminarContenedor } from "../modules/container/app/service/eliminarContenedor.service"
import { ServicioObtenerContenedores } from "../modules/container/app/service/obtenerContenedores.service"
import { ServicioObtenerUnContenedor } from "../modules/container/app/service/obtenerUnContenedor.service"
import { RepositorioPostgreSqlContenedor } from "../modules/container/infrastructure/repository/postgresql/repositorioContenedorPg"
import { RepositorioEnMemoriaContenedor } from "../modules/container/infrastructure/test/contenedorRepositorioMemoria"

const repo=new RepositorioPostgreSqlContenedor(`${process.env.DATABASE_URL}`)
// const repo=new RepositorioEnMemoriaContenedor()

const contenedorServicios={
    contenedor:{
        getAll:new ServicioObtenerContenedores(repo),
        getOneById:new ServicioObtenerUnContenedor(repo),
        create:new ServicioCrearContenedor(repo),
        edit:new ServicioEditarContenedor(repo),
        delete:new ServicioEliminarContenedor(repo),
    }
}

export {contenedorServicios}
