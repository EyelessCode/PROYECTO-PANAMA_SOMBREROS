import { Request, Response, Router } from "express"
import path from "path"

const rutaAdmin=Router()

rutaAdmin.get("/",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","..","..","frontend",
        "public","view","admin","login.html"))
})

export {rutaAdmin}
