import { Request, Response, Router } from "express"
import path from "path"
import { ControladorDetalleExport } from "../../modules/detailExport/infrastructure/controller/detalleExportControlador.controller"
import { ControladorExportacion } from "../../modules/export/infrastructure/controller/exportacionControlador.controller"

const rutaAdmin=Router()
// const controladorDetalleExportacion=new ControladorDetalleExport()
const controladorExportacion=new ControladorExportacion()

rutaAdmin.get("/",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","..","..","frontend",
        "public","view","admin","detalleExportaciones.html"))
})

// Detalle export 
// rutaAdmin.get("/api",controladorDetalleExportacion.getAll)
// rutaAdmin.get("/api/:id",controladorDetalleExportacion.getOneById)
// rutaAdmin.post("/api",controladorDetalleExportacion.create)
// rutaAdmin.put("/api/:id",controladorDetalleExportacion.edit)
// rutaAdmin.delete("/api/:id",controladorDetalleExportacion.delete)

// Exportación
rutaAdmin.get("/api",controladorExportacion.getAll)
rutaAdmin.get("/api/:id",controladorExportacion.getOneById)
rutaAdmin.post("/api",controladorExportacion.create)
rutaAdmin.put("/api/:id",controladorExportacion.edit)
rutaAdmin.delete("/api/:id",controladorExportacion.delete)

export {rutaAdmin}
