import { Request, Response, Router } from "express"
import path from "path"
import { ControladorProducto } from "../../modules/product/infrastructure/controller/productoControlador.controller"
import { ControladorProductoMySql } from "../../modules/product/infrastructure/controller/mySqlproducto.controller"

const rutaAdmin=Router()
const controladorPosgreSql=new ControladorProducto()
const controladorMySql=new ControladorProductoMySql()

rutaAdmin.get("/",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","..","..","frontend",
        "public","view","admin","productos.html"))
})

rutaAdmin.get("/api",controladorMySql.getAll)
rutaAdmin.get("/api/:id",controladorMySql.getOneById)
rutaAdmin.post("/api",controladorMySql.create)
rutaAdmin.put("/api/:id",controladorMySql.edit)
rutaAdmin.delete("/api/:id",controladorMySql.delete)

export {rutaAdmin}
