import { Request, Response, Router } from "express"
import path from "path"
import { ControladorConsultaAdmin } from "../../modules/user/infrastructure/consultaAdmin/controller/consultaAdminControlador.controller"
import { ControladorConsultaAdminMySql } from '../../modules/user/infrastructure/consultaAdmin/controller/mySqlConsulta.controller';

const rutaAdmin=Router()
const controladorPosgreSql=new ControladorConsultaAdmin()
const controladorMySql=new ControladorConsultaAdminMySql()

rutaAdmin.get("/",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","..","..","frontend",
        "public","view","admin","consultas.html"))
})

rutaAdmin.get("/api",controladorMySql.getAll)
rutaAdmin.get("/api/:id",controladorMySql.getOneById)
rutaAdmin.post("/api",controladorMySql.create)
rutaAdmin.put("/api/:id",controladorMySql.edit)
rutaAdmin.delete("/api/:id",controladorMySql.delete)

export {rutaAdmin}
