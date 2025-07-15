import { Router } from "express";
import { readdirSync } from "fs";

const rutaAdmin=Router()
const PATH=`${__dirname}`

const cortar=(file:string)=>{
    const cortarArchivo=file.split('.').shift()
    return cortarArchivo
}

readdirSync(PATH).filter((file)=>{
    const purificar=cortar(file)

    if (purificar!=='index') {
        import (`./${purificar}`).then((modulo)=>{
            console.log(`Ruta administradores: ${purificar}`);
            rutaAdmin.use(`/${purificar}`,modulo.rutaAdmin)
        })
    }
})

export {rutaAdmin}
