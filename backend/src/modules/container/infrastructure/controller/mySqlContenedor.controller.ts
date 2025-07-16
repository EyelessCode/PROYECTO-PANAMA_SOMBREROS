import { NextFunction, Request, Response } from "express";
import { contenedorMySqlServicios } from "../../../../shared/contenedorServicios";

export class ControladorContenedorMySql{
    getAll=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const contenedor=await contenedorMySqlServicios.contenedor.getAll.run()
            console.log(contenedor.map((c)=>c.toPrimitives()));
            return res.json(contenedor.map((c)=>c.toPrimitives())).status(200)
        } catch (error) {
            next(error)
        }
    }

    getOneById=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const contenedor=await contenedorMySqlServicios.contenedor.getOneById.run(Number(req.params.id))
            return res.json(contenedor.toPrimitives()).status(200)
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
            const {id,codigo,capacidadMax,pesoMax,descripcion}=req.body as {
                id:number,
                codigo:string,
                capacidadMax:number,
                pesoMax:number,
                descripcion?:string
            }

            await contenedorMySqlServicios.contenedor.create.run(id,codigo,
                capacidadMax,pesoMax,descripcion)

            return res.status(201).json(req.body).send()
        } catch (error) {
            next(error)
        }
    }

    edit=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const id = parseInt(req.params.id)
            const { codigo, capacidadMax, pesoMax, descripcion } = req.body

            await contenedorMySqlServicios.contenedor.edit.run(id, codigo, capacidadMax, pesoMax, descripcion)

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
            await contenedorMySqlServicios.contenedor.delete.run(Number(req.params.id))
            
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
