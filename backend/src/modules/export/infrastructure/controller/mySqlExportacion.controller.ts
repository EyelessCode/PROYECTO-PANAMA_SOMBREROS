import { NextFunction, Request, Response } from "express";
import { contenedorMySqlServicios } from "../../../../shared/contenedorServicios";

export class ControladorExportacionMySql{
    getAll=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const expor=await contenedorMySqlServicios.exportacion.getAll.run()
            console.log(expor.map((c)=>c.toPrimitives()));
            return res.json(expor.map((c)=>c.toPrimitives())).status(200)
        } catch (error) {
            next(error)
        }
    }

    getOneById=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const expor=await contenedorMySqlServicios.exportacion.getOneById.run(Number(req.params.id))
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
            const {id,idContenedor,idPais,idMoneda,fechaSalida,
                valorFlete,estado,fechaLlegada
            }=req.body as {
                id:number
                idContenedor:number
                idPais:number
                idMoneda:number
                fechaSalida:Date
                valorFlete:number
                estado:string
                fechaLlegada?:Date|string
            }

            await contenedorMySqlServicios.exportacion.create.run(id,idContenedor,
                idPais,idMoneda,fechaSalida,
            valorFlete,estado,fechaLlegada)

            return res.status(201).json(req.body).send()
        } catch (error) {
            next(error)
        }
    }

    edit=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const id = parseInt(req.params.id)
            const { idContenedor,
                idPais,idMoneda,fechaSalida,fechaLlegada,
            valorFlete,estado } = req.body

            await contenedorMySqlServicios.exportacion.edit.run(id, idContenedor,
                idPais,idMoneda,fechaSalida,fechaLlegada,
            valorFlete,estado)

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
            await contenedorMySqlServicios.exportacion.delete.run(Number(req.params.id))
            
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
