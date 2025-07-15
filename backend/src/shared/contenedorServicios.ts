import { ServicioCrearContenedor } from "../modules/container/app/service/crearContenedor.service"
import { ServicioEditarContenedor } from "../modules/container/app/service/editarContenedor.service"
import { ServicioEliminarContenedor } from "../modules/container/app/service/eliminarContenedor.service"
import { ServicioObtenerContenedores } from "../modules/container/app/service/obtenerContenedores.service"
import { ServicioObtenerUnContenedor } from "../modules/container/app/service/obtenerUnContenedor.service"
import { RepositorioEnMemoriaContenedor } from "../modules/container/infrastructure/repository/test/contenedorRepositorioMemoria"

// const repo=new RepositoryPostgresStudent(`postgresql://eyelesscode:cris03022@localhost:5432/student_temp`)
const repo=new RepositorioEnMemoriaContenedor()

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
