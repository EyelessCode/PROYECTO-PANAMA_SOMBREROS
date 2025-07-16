import { ServicioCrearContenedor } from "../modules/container/app/service/crearContenedor.service"
import { ServicioEditarContenedor } from "../modules/container/app/service/editarContenedor.service"
import { ServicioEliminarContenedor } from "../modules/container/app/service/eliminarContenedor.service"
import { ServicioObtenerContenedores } from "../modules/container/app/service/obtenerContenedores.service"
import { ServicioObtenerUnContenedor } from "../modules/container/app/service/obtenerUnContenedor.service"
import { ServicioCrearDetalleExport } from "../modules/detailExport/app/service/crearDetalleExport.service"
import { ServicioEditarDetalleExport } from "../modules/detailExport/app/service/editarDetalleExport.service"
import { ServicioEliminarDetalleExport } from "../modules/detailExport/app/service/eliminarDetalleExport.service"
import { ServicioObtenerDetallesExport } from "../modules/detailExport/app/service/obtenerDetallesExport.service"
import { ServicioObtenerUnDetalleExport } from "../modules/detailExport/app/service/obtenerUnDetalleExport.service"
import { ServicioCrearExportacion } from "../modules/export/app/service/crearExportacion.service"
import { ServicioEditarExportacion } from "../modules/export/app/service/editarExportacion.service"
import { ServicioEliminarExportacion } from "../modules/export/app/service/eliminarExportacion.service"
import { ServicioObtenerExportaciones } from "../modules/export/app/service/obtenerExportaciones.service"
import { ServicioObtenerUnaExportacion } from "../modules/export/app/service/obtenerUnaExportacion.service"
import { RepositorioPosgreSqlExportacion } from "../modules/export/infrastructure/repository/posgresql/exportacionRepositorio"
import { ServicioObtenerProductos } from '../modules/product/app/service/obtenerProductos.service';
import { RepositorioPosgreSqlProducto } from '../modules/product/infrastructure/repository/postgresql/productoRepositorio';
import { ServicioObtenerUnProducto } from '../modules/product/app/service/obtenerUnProducto.service';
import { ServicioCrearProducto } from "../modules/product/app/service/crearProducto.service"
import { ServicioEditarProducto } from "../modules/product/app/service/editarProducto.service"
import { ServicioEliminarProducto } from "../modules/product/app/service/eliminarProducto.service"
import { RepositorioPosgreSqlUsuario } from "../modules/user/infrastructure/user/repository/postgresql/usuarioRepositorio"
import { ServicioObtenerUsuarios } from '../modules/user/app/service/user/obtenerUsuarios.service';
import { ServicioObtenerUnUsuario } from "../modules/user/app/service/user/obtenerUnUsuario.service"
import { ServicioCrearUsuario } from "../modules/user/app/service/user/crearUsuario.service"
import { ServicioEditarUsuario } from "../modules/user/app/service/user/editarUsuario.service"
import { ServicioEliminarUsuario } from "../modules/user/app/service/user/eliminarUsuario.service"
import { RepositorioPosgreSqlConsultaAdmin } from "../modules/user/infrastructure/consultaAdmin/repository/postgresql/consultaAdminRepositorio"
import { ServicioObtenerConsultasAdmin } from "../modules/user/app/service/consultaAdmin/obtenerConsultasAdmin.service"
import { ServicioCrearConsultaAdmin } from "../modules/user/app/service/consultaAdmin/crearConsultaAdmin.service"
import { ServicioEditarConsultaAdmin } from "../modules/user/app/service/consultaAdmin/editarConsultaAdmin.service"
import { ServicioEliminarConsultaAdmin } from "../modules/user/app/service/consultaAdmin/eliminarConsultaAdmin.service"
import { ServicioObtenerUnaConsultaAdmin } from "../modules/user/app/service/consultaAdmin/obtenerUnaConsultaAdmin.service"
import { RepositorioMySqlConsultaAdmin } from "../modules/user/infrastructure/consultaAdmin/repository/mysql/consultaAdminRepositorio"
import { RepositorioMySqlUsuario } from "../modules/user/infrastructure/user/repository/mysql/usuario.Repositorio"
import { RepositorioMySqlProducto } from "../modules/product/infrastructure/repository/mysql/productoRepositorio"
import { RepositorioMySqlExportacion } from "../modules/export/infrastructure/repository/mysql/exportacionRepositorio"
import { RepositorioPostgreSqlDetallesExport } from "../modules/detailExport/infrastructure/repository/postgresql/detalleExportRepositorio"
import { RepositorioMySqlDetallesExport } from "../modules/detailExport/infrastructure/repository/mysql/detalleExportRepositorio"
import { RepositorioMySqlContenedor } from '../modules/container/infrastructure/repository/mysql/contenedorRepositorio';
import { RepositorioPostgreSqlContenedor } from "../modules/container/infrastructure/repository/postgresql/repositorioContenedorPg"

const repoPostgreSqlContenedor=new RepositorioPostgreSqlContenedor(`${process.env.DATABASE_URL_POSTGRESQL}`)
const repoPostgreSqlDetalleExport=new RepositorioPostgreSqlDetallesExport(`${process.env.DATABASE_URL_POSTGRESQL}`)
const repoPostgreSqlExportacion=new RepositorioPosgreSqlExportacion(`${process.env.DATABASE_URL_POSTGRESQL}`)
const repoPostgreSqlProducto=new RepositorioPosgreSqlProducto(`${process.env.DATABASE_URL_POSTGRESQL}`)
const repoPostgreSqlUsuario=new RepositorioPosgreSqlUsuario(`${process.env.DATABASE_URL_POSTGRESQL}`)
const repoPostgreSqlConsultaAdmin=new RepositorioPosgreSqlConsultaAdmin(`${process.env.DATABASE_URL_POSTGRESQL}`)

const repoMySqlConsultaAdmin = new RepositorioMySqlConsultaAdmin({
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DATABASE!,
    port: Number(process.env.MYSQL_PORT) || 3306
})

const repoMySqlUsuario = new RepositorioMySqlUsuario({
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DATABASE!,
    port: Number(process.env.MYSQL_PORT) || 3306
})

const repoMySqlProducto = new RepositorioMySqlProducto({
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DATABASE!,
    port: Number(process.env.MYSQL_PORT) || 3306
})

const repoMySqlExportacion = new RepositorioMySqlExportacion({
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DATABASE!,
    port: Number(process.env.MYSQL_PORT) || 3306
})

const repoMySqlDetalleExport = new RepositorioMySqlDetallesExport({
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DATABASE!,
    port: Number(process.env.MYSQL_PORT) || 3306
})

const repoMySqlContenedor = new RepositorioMySqlContenedor({
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DATABASE!,
    port: Number(process.env.MYSQL_PORT) || 3306
})

// const repo=new RepositorioEnMemoriaContenedor()

const contenedorServicios={
    contenedor:{
        getAll:new ServicioObtenerContenedores(repoPostgreSqlContenedor),
        getOneById:new ServicioObtenerUnContenedor(repoPostgreSqlContenedor),
        create:new ServicioCrearContenedor(repoPostgreSqlContenedor),
        edit:new ServicioEditarContenedor(repoPostgreSqlContenedor),
        delete:new ServicioEliminarContenedor(repoPostgreSqlContenedor)
    },
    detalleExport:{
        getAll:new ServicioObtenerDetallesExport(repoPostgreSqlDetalleExport),
        getOneById:new ServicioObtenerUnDetalleExport(repoPostgreSqlDetalleExport),
        create:new ServicioCrearDetalleExport(repoPostgreSqlDetalleExport),
        edit:new ServicioEditarDetalleExport(repoPostgreSqlDetalleExport),
        delete:new ServicioEliminarDetalleExport(repoPostgreSqlDetalleExport)
    },
    exportacion:{
        getAll:new ServicioObtenerExportaciones(repoPostgreSqlExportacion),
        getOneById:new ServicioObtenerUnaExportacion(repoPostgreSqlExportacion),
        create:new ServicioCrearExportacion(repoPostgreSqlExportacion),
        edit:new ServicioEditarExportacion(repoPostgreSqlExportacion),
        delete:new ServicioEliminarExportacion(repoPostgreSqlExportacion)
    },
    producto:{
        getAll:new ServicioObtenerProductos(repoPostgreSqlProducto),
        getOneById:new ServicioObtenerUnProducto(repoPostgreSqlProducto),
        create:new ServicioCrearProducto(repoPostgreSqlProducto),
        edit:new ServicioEditarProducto(repoPostgreSqlProducto),
        delete:new ServicioEliminarProducto(repoPostgreSqlProducto)
    },
    usuario:{
        getAll:new ServicioObtenerUsuarios(repoPostgreSqlUsuario),
        getOneById:new ServicioObtenerUnUsuario(repoPostgreSqlUsuario),
        create:new ServicioCrearUsuario(repoPostgreSqlUsuario),
        edit:new ServicioEditarUsuario(repoPostgreSqlUsuario),
        delete:new ServicioEliminarUsuario(repoPostgreSqlUsuario)
    },
    consultaAdmin:{
        getAll:new ServicioObtenerConsultasAdmin(repoPostgreSqlConsultaAdmin),
        getOneById:new ServicioObtenerUnaConsultaAdmin(repoPostgreSqlConsultaAdmin),
        create:new ServicioCrearConsultaAdmin(repoPostgreSqlConsultaAdmin),
        edit:new ServicioEditarConsultaAdmin(repoPostgreSqlConsultaAdmin),
        delete:new ServicioEliminarConsultaAdmin(repoPostgreSqlConsultaAdmin)
    }
}

const contenedorMySqlServicios={
    consultaAdmin:{
        getAll:new ServicioObtenerConsultasAdmin(repoMySqlConsultaAdmin),
        getOneById:new ServicioObtenerUnaConsultaAdmin(repoMySqlConsultaAdmin),
        create:new ServicioCrearConsultaAdmin(repoMySqlConsultaAdmin),
        edit:new ServicioEditarConsultaAdmin(repoMySqlConsultaAdmin),
        delete:new ServicioEliminarConsultaAdmin(repoMySqlConsultaAdmin)
    },
    usuario:{
        getAll:new ServicioObtenerUsuarios(repoMySqlUsuario),
        getOneById:new ServicioObtenerUnUsuario(repoMySqlUsuario),
        create:new ServicioCrearUsuario(repoMySqlUsuario),
        edit:new ServicioEditarUsuario(repoMySqlUsuario),
        delete:new ServicioEliminarUsuario(repoMySqlUsuario)
    },
    producto:{
        getAll:new ServicioObtenerProductos(repoMySqlProducto),
        getOneById:new ServicioObtenerUnProducto(repoMySqlProducto),
        create:new ServicioCrearProducto(repoMySqlProducto),
        edit:new ServicioEditarProducto(repoMySqlProducto),
        delete:new ServicioEliminarProducto(repoMySqlProducto)
    },
    exportacion:{
        getAll:new ServicioObtenerExportaciones(repoMySqlExportacion),
        getOneById:new ServicioObtenerUnaExportacion(repoMySqlExportacion),
        create:new ServicioCrearExportacion(repoMySqlExportacion),
        edit:new ServicioEditarExportacion(repoMySqlExportacion),
        delete:new ServicioEliminarExportacion(repoMySqlExportacion)
    },
    detalleExport:{
        getAll:new ServicioObtenerDetallesExport(repoMySqlDetalleExport),
        getOneById:new ServicioObtenerUnDetalleExport(repoMySqlDetalleExport),
        create:new ServicioCrearDetalleExport(repoMySqlDetalleExport),
        edit:new ServicioEditarDetalleExport(repoMySqlDetalleExport),
        delete:new ServicioEliminarDetalleExport(repoMySqlDetalleExport)
    },
    contenedor:{
        getAll:new ServicioObtenerContenedores(repoMySqlContenedor),
        getOneById:new ServicioObtenerUnContenedor(repoMySqlContenedor),
        create:new ServicioCrearContenedor(repoMySqlContenedor),
        edit:new ServicioEditarContenedor(repoMySqlContenedor),
        delete:new ServicioEliminarContenedor(repoMySqlContenedor)
    }
}

export {contenedorServicios,contenedorMySqlServicios}
