import { NextFunction, Request, Response } from "express";
import { contenedorMySqlServicios } from "../../../../../shared/contenedorServicios";

export class ControladorUsuarioMySql{
    getAll=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const expor=await contenedorMySqlServicios.usuario.getAll.run()
            console.log(expor.map((c)=>c.toPrimitives()));
            return res.json(expor.map((c)=>c.toPrimitives())).status(200)
        } catch (error) {
            next(error)
        }
    }

    getOneById=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const expor=await contenedorMySqlServicios.usuario.getOneById.run(Number(req.params.id))
            return res.json(expor.toPrimitives()).status(200)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({
                    message:error.message
                })
            }

            next(error)
        }
    }

    create=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const {id,cedula,nombre,correo,contrasenia,
                rol,
            }=req.body as {
                id:number,
                cedula:string,
                nombre:string,
                correo:string,
                contrasenia:string,
                rol:string
            }

            await contenedorMySqlServicios.usuario.create.run(id,cedula,
                nombre,correo,contrasenia,
                rol,
            )

            return res.status(201).json(req.body).send()
        } catch (error) {
            next(error)
        }
    }

    edit=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const id = parseInt(req.params.id)
            const { cedula,
                nombre,correo,contrasenia,rol } = req.body

            await contenedorMySqlServicios.usuario.edit.run(id, cedula,
                nombre,correo,contrasenia,rol
            )

            return res.status(204).send()
            // return res.status(204).json(req.body).send()
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({
                    message:error.message
                })
            }

            next(error)
        }
    }

    delete=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            await contenedorMySqlServicios.usuario.delete.run(Number(req.params.id))
            
            return res.status(204).send()
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({
                    message:error.message
                })
            }

            next(error)
        }
    }

}
