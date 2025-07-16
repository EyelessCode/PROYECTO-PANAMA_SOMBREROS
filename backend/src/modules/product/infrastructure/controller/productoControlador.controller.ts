import { NextFunction, Request, Response } from "express";
import { contenedorServicios } from "../../../../shared/contenedorServicios"

export class ControladorProducto{
    getAll=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const expor=await contenedorServicios.producto.getAll.run()
            console.log(expor.map((c)=>c.toPrimitives()));
            return res.json(expor.map((c)=>c.toPrimitives())).status(200)
        } catch (error) {
            next(error)
        }
    }

    getOneById=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const expor=await contenedorServicios.producto.getOneById.run(Number(req.params.id))
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
            const {id,tipoId,tallaId,colorId,precioUnitario,
                descripcion,activo
            }=req.body as {
                id:number,
                tipoId:number,
                tallaId:number,
                colorId:number,
                precioUnitario:number,
                descripcion?:string,
                activo:boolean
            }

            await contenedorServicios.producto.create.run(id,tipoId,
                tallaId,colorId,precioUnitario,
                activo,descripcion,
            )

            return res.status(201).json(req.body).send()
        } catch (error) {
            next(error)
        }
    }

    edit=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const id = parseInt(req.params.id)
            const { tipoId,
                tallaId,colorId,precioUnitario,activo,
            descripcion,fechaCreacion } = req.body

            await contenedorServicios.producto.edit.run(id, tipoId,
                tallaId,colorId,precioUnitario,
                activo,descripcion
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
            await contenedorServicios.producto.delete.run(Number(req.params.id))
            
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
