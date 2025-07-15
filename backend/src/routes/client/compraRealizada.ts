import { Request, Response, Router } from "express"
import path from "path"

const rutaClient=Router()

rutaClient.get("/",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","..","..","frontend",
        "public","view","client","compraRealizada.html"))
})

export {rutaClient}
