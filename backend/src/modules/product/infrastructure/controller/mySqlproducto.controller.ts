import { NextFunction, Request, Response } from "express";
import { contenedorMySqlServicios } from "../../../../shared/contenedorServicios";

export class ControladorProductoMySql{
    getAll=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const expor=await contenedorMySqlServicios.producto.getAll.run()
            return res.status(200).json(expor)
        } catch (error) {
            next(error)
        }
    }

    getOneById=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const expor=await contenedorMySqlServicios.producto.getOneById.run(Number(req.params.id))
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
            const {id,idTipo,idTalla,idColor,precioUnitario,
                descripcion,activo
            }=req.body as {
                id:number,
                idTipo:number,
                idTalla:number,
                idColor:number,
                precioUnitario:number,
                descripcion?:string,
                activo:boolean
            }

            await contenedorMySqlServicios.producto.create.run(id,idTipo,
                idTalla,idColor,precioUnitario,
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
            const { idTipo,
                idTalla,idColor,precioUnitario,activo,
            descripcion,fechaCreacion } = req.body

            await contenedorMySqlServicios.producto.edit.run(id, idTipo,
                idTalla,idColor,precioUnitario,
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
            await contenedorMySqlServicios.producto.delete.run(Number(req.params.id))
            
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
