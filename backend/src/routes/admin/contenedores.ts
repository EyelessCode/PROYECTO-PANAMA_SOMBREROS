import { Request, Response, Router } from "express"
import path from "path"
import { ControladorContenedor } from "../../modules/container/infrastructure/controller/contenedorControlador.controller"

const rutaAdmin=Router()
const controlador=new ControladorContenedor()

rutaAdmin.get("/",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","..","..","frontend",
        "public","view","admin","contenedores.html"))
})

rutaAdmin.get("/",controlador.getAll)
rutaAdmin.get("/:id",controlador.getOneById)
rutaAdmin.post("/",controlador.create)
rutaAdmin.put("/:id",controlador.edit)
rutaAdmin.delete("/:id",controlador.delete)


export {rutaAdmin}
