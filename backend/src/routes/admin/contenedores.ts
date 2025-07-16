import { Request, Response, Router } from "express"
import path from "path"
import { ControladorContenedor } from "../../modules/container/infrastructure/controller/contenedorControlador.controller"
import { ControladorContenedorMySql } from "../../modules/container/infrastructure/controller/mySqlContenedor.controller"

const rutaAdmin=Router()
const controladorPosgreSql=new ControladorContenedor()
const controladorMySql=new ControladorContenedorMySql()

rutaAdmin.get("/",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","..","..","frontend",
        "public","view","admin","contenedores.html"))
})

rutaAdmin.get("/api",controladorMySql.getAll)
rutaAdmin.get("/api/:id",controladorMySql.getOneById)
rutaAdmin.post("/api",controladorMySql.create)
rutaAdmin.put("/api/:id",controladorMySql.edit)
rutaAdmin.delete("/api/:id",controladorMySql.delete)

export {rutaAdmin}
