import { Request, Response, Router } from "express"
import path from "path"
import { ControladorDetalleExport } from "../../modules/detailExport/infrastructure/controller/detalleExportControlador.controller"
import { ControladorExportacion } from "../../modules/export/infrastructure/controller/exportacionControlador.controller"
import { ControladorDetalleExportMySql } from '../../modules/detailExport/infrastructure/controller/mySqlDetalleExport.controller';
import { ControladorExportacionMySql } from "../../modules/export/infrastructure/controller/mySqlExportacion.controller";

const rutaAdmin=Router()
const controladorPosgreSqlDetalleExportacion=new ControladorDetalleExport()
const controladorPosgreSqlExportacion=new ControladorExportacion()
const controladorMySqlDetalleExportacion=new ControladorDetalleExportMySql()
const controladorMySqlExportacion=new ControladorExportacionMySql()

rutaAdmin.get("/",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","..","..","frontend",
        "public","view","admin","detalleExportaciones.html"))
})

rutaAdmin.get("/api",controladorMySqlExportacion.getAll)
rutaAdmin.get("/api/:id",controladorMySqlExportacion.getOneById)
rutaAdmin.post("/api",controladorMySqlExportacion.create)
rutaAdmin.put("/api/:id",controladorMySqlExportacion.edit)
rutaAdmin.delete("/api/:id",controladorMySqlExportacion.delete)

export {rutaAdmin}
