import { Request, Response, Router } from "express"
import path from "path"
import { ControladorContenedor } from "../../modules/container/infrastructure/controller/contenedorControlador.controller"

const rutaAdmin=Router()
const controlador=new ControladorContenedor()

rutaAdmin.get("/",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","..","..","frontend",
        "public","view","admin","contenedores.html"))
})

rutaAdmin.get("/api",controlador.getAll)
rutaAdmin.get("/api/:id",controlador.getOneById)
rutaAdmin.post("/api",controlador.create)
rutaAdmin.put("/api/:id",controlador.edit)
rutaAdmin.delete("/api/:id",controlador.delete)

export {rutaAdmin}
