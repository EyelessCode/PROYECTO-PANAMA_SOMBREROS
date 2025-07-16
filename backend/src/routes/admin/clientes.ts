import { Request, Response, Router } from "express"
import path from "path"
import { ControladorUsuario } from "../../modules/user/infrastructure/user/controller/usuarioControlador.controller"
import { ControladorUsuarioMySql } from "../../modules/user/infrastructure/user/controller/mySqlUsuario.controller"

const rutaAdmin=Router()
const controladorPosgreSql=new ControladorUsuario()
const controladorMySql=new ControladorUsuarioMySql()

rutaAdmin.get("/",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","..","..","frontend",
        "public","view","admin","clientes.html"))
})

rutaAdmin.get("/api",controladorMySql.getAll)
rutaAdmin.get("/api/:id",controladorMySql.getOneById)
rutaAdmin.post("/api",controladorMySql.create)
rutaAdmin.put("/api/:id",controladorMySql.edit)
rutaAdmin.delete("/api/:id",controladorMySql.delete)

export {rutaAdmin}
