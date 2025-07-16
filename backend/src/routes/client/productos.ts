import { Request, Response, Router } from "express"
import path from "path"
import { ControladorProducto } from "../../modules/product/infrastructure/controller/productoControlador.controller"
import { rutaAdmin } from "../admin"
import { ControladorProductoMySql } from "../../modules/product/infrastructure/controller/mySqlproducto.controller"

const rutaClient=Router()
const controladorPosgreSql=new ControladorProducto()
const controladorMySql=new ControladorProductoMySql()

rutaClient.get("/",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","..","..","frontend",
        "public","view","client","productos.html"))
})

rutaAdmin.get("/api",controladorMySql.getAll)
rutaAdmin.get("/api/:id",controladorMySql.getOneById)
rutaAdmin.post("/api",controladorMySql.create)
rutaAdmin.put("/api/:id",controladorMySql.edit)
rutaAdmin.delete("/api/:id",controladorMySql.delete)

export {rutaClient}
