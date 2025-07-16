import { Request, Response, Router } from "express"
import path from "path"
import { ControladorProducto } from "../../modules/product/infrastructure/controller/productoControlador.controller"

const rutaAdmin=Router()
const controlador=new ControladorProducto()

rutaAdmin.get("/",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","..","..","frontend",
        "public","view","admin","productos.html"))
})

rutaAdmin.get("/api",controlador.getAll)
rutaAdmin.get("/api/:id",controlador.getOneById)
rutaAdmin.post("/api",controlador.create)
rutaAdmin.put("/api/:id",controlador.edit)
rutaAdmin.delete("/api/:id",controlador.delete)

export {rutaAdmin}
