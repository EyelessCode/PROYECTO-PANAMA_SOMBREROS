import { ServicioCrearContenedor } from "../modules/container/app/service/crearContenedor.service"
import { ServicioEditarContenedor } from "../modules/container/app/service/editarContenedor.service"
import { ServicioEliminarContenedor } from "../modules/container/app/service/eliminarContenedor.service"
import { ServicioObtenerContenedores } from "../modules/container/app/service/obtenerContenedores.service"
import { ServicioObtenerUnContenedor } from "../modules/container/app/service/obtenerUnContenedor.service"
import { RepositorioPostgreSqlContenedor } from "../modules/container/infrastructure/repository/postgresql/repositorioContenedorPg"
import { ServicioCrearDetalleExport } from "../modules/detailExport/app/service/crearDetalleExport.service"
import { ServicioEditarDetalleExport } from "../modules/detailExport/app/service/editarDetalleExport.service"
import { ServicioEliminarDetalleExport } from "../modules/detailExport/app/service/eliminarDetalleExport.service"
import { ServicioObtenerDetallesExport } from "../modules/detailExport/app/service/obtenerDetallesExport.service"
import { ServicioObtenerUnDetalleExport } from "../modules/detailExport/app/service/obtenerUnDetalleExport.service"
import { RepositorioPostgreSqlDetallesExport } from "../modules/detailExport/infrastructure/repository/postgresql/repositorioContenedorPg"
import { ServicioCrearExportacion } from "../modules/export/app/service/crearExportacion.service"
import { ServicioEditarExportacion } from "../modules/export/app/service/editarExportacion.service"
import { ServicioEliminarExportacion } from "../modules/export/app/service/eliminarExportacion.service"
import { ServicioObtenerExportaciones } from "../modules/export/app/service/obtenerExportaciones.service"
import { ServicioObtenerUnaExportacion } from "../modules/export/app/service/obtenerUnaExportacion.service"
import { RepositorioPosgreSqlExportacion } from "../modules/export/infrastructure/repository/posgresql/exportacionRepositorio"

const repoContenedor=new RepositorioPostgreSqlContenedor(`${process.env.DATABASE_URL}`)
const repoDetalleExport=new RepositorioPostgreSqlDetallesExport(`${process.env.DATABASE_URL}`)
const repoExportacion=new RepositorioPosgreSqlExportacion(`${process.env.DATABASE_URL}`)
// const repo=new RepositorioEnMemoriaContenedor()

const contenedorServicios={
    contenedor:{
        getAll:new ServicioObtenerContenedores(repoContenedor),
        getOneById:new ServicioObtenerUnContenedor(repoContenedor),
        create:new ServicioCrearContenedor(repoContenedor),
        edit:new ServicioEditarContenedor(repoContenedor),
        delete:new ServicioEliminarContenedor(repoContenedor)
    },
    detalleExport:{
        getAll:new ServicioObtenerDetallesExport(repoDetalleExport),
        getOneById:new ServicioObtenerUnDetalleExport(repoDetalleExport),
        create:new ServicioCrearDetalleExport(repoDetalleExport),
        edit:new ServicioEditarDetalleExport(repoDetalleExport),
        delete:new ServicioEliminarDetalleExport(repoDetalleExport)
    },
    exportacion:{
        getAll:new ServicioObtenerExportaciones(repoExportacion),
        getOneById:new ServicioObtenerUnaExportacion(repoExportacion),
        create:new ServicioCrearExportacion(repoExportacion),
        edit:new ServicioEditarExportacion(repoExportacion),
        delete:new ServicioEliminarExportacion(repoExportacion)
    }
}

export {contenedorServicios}
