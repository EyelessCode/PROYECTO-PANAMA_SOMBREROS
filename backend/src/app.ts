import express,{NextFunction,Request,Response  } from "express";
import cors from 'cors';
import 'dotenv/config';
import { rutaAdmin } from "./routes/admin";
import { rutaClient } from "./routes/client";
import path from "path";

const app=express()
const PORT=process.env.PORT||7000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"..","..","frontend",'public',
    "static"
)))


// app.use("/test",rutaAdmin)
app.get("/sombreroPanama/admin/dashboard",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","frontend",'public',
    "view","admin","home.html"))
})
app.use("/sombreroPanama/admin",rutaAdmin)
app.use("/sombreroPanama/client",rutaClient)


app.use((err:unknown,req:Request,res:Response,next:NextFunction):any=>{
    if(err instanceof Error){
        console.error(err.stack);
        return res.status(500).json({
            message:err.message
        })
    }

    return res.status(500).json({
        message:`Algo salió mal!`
    })
})

app.listen(PORT,()=>console.log(`=> http://localhost:${PORT}`))
