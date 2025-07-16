import { NextFunction, Request, Response } from "express";
import { contenedorServicios } from "../../../../shared/contenedorServicios"

export class ControladorDetalleExport{
    getAll=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const detalleExport=await contenedorServicios.detalleExport.getAll.run()
            console.log(detalleExport.map((c)=>c.toPrimitives()));
            return res.json(detalleExport.map((c)=>c.toPrimitives())).status(200)
        } catch (error) {
            next(error)
        }
    }

    getOneById=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const detalleExport=await contenedorServicios.detalleExport.getOneById.run(Number(req.params.id))
            return res.json(detalleExport.toPrimitives()).status(200)
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
            const {id,idExportacion,idSombrero,cantidad,precioVenta}=req.body as {
                id:number,
                idExportacion:number,
                idSombrero:number,
                cantidad:number,
                precioVenta:number
            }

            await contenedorServicios.detalleExport.create.run(id,idExportacion,
                idSombrero,cantidad,precioVenta)

            return res.status(201).json(req.body).send()
        } catch (error) {
            next(error)
        }
    }

    edit=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const id = parseInt(req.params.id)
            const { idExportacion, idSombrero, cantidad, precioVenta } = req.body

            await contenedorServicios.detalleExport.edit.run(id, idExportacion,
                idSombrero, cantidad, precioVenta)

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
            await contenedorServicios.detalleExport.delete.run(Number(req.params.id))
            
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
