import { Request, Response, Router } from "express"
import path from "path"
import { ControladorUsuario } from "../../modules/user/infrastructure/user/controller/usuarioControlador.controller"
import { ControladorUsuarioMySql } from "../../modules/user/infrastructure/user/controller/mySqlUsuario.controller"
import { RepositorioMySqlUsuario } from "../../modules/user/infrastructure/user/repository/mysql/usuario.Repositorio"

const rutaAdmin=Router()
const controladorPosgreSql=new ControladorUsuario()
const controladorMySql=new ControladorUsuarioMySql()
const repo=new RepositorioMySqlUsuario({
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: process.env.MYSQL_DATABASE!,
    port: Number(process.env.MYSQL_PORT) || 3306
})

rutaAdmin.get("/",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"..","..","..","..","frontend",
        "public","view","admin","login.html"))
})


// rutaAdmin.get("/api",controladorMySql.getAll)
// rutaAdmin.get("/api/:id",controladorMySql.getOneById)
// rutaAdmin.post("/api",controladorMySql.create)
// rutaAdmin.put("/api/:id",controladorMySql.edit)
// rutaAdmin.delete("/api/:id",controladorMySql.delete)

rutaAdmin.post("/", async (req: Request, res: Response) => {
    const { cedula, password } = req.body;

    if (!cedula || !password) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    try {
        const usuario = await repo.getOneByCedula(cedula);

        if (!usuario || usuario.contrasenia.contrasenia !== password) {
            return res.status(401).send("Credenciales inválidas");
        }

        // Aquí puedes guardar sesión, token o redirigir
        return res.redirect("/sombreroPanama/admin/dashboard");
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).send("Error interno del servidor");
    }
});

export {rutaAdmin}
