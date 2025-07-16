import { NextFunction, Request, Response } from "express";
import { contenedorMySqlServicios } from "../../../../../shared/contenedorServicios";

export class ControladorConsultaAdminMySql{
    getAll=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const expor=await contenedorMySqlServicios.consultaAdmin.getAll.run()
            console.log(expor.map((c)=>c.toPrimitives()));
            return res.json(expor.map((c)=>c.toPrimitives())).status(200)
        } catch (error) {
            next(error)
        }
    }

    getOneById=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const expor=await contenedorMySqlServicios.consultaAdmin.getOneById.run(Number(req.params.id))
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
            const {id,idAdmin,tipoConsulta,resultado}=req.body as {
                id:number
                idAdmin:number
                tipoConsulta:string
                resultado?:string
            }

            await contenedorMySqlServicios.consultaAdmin.create.run(id,idAdmin,tipoConsulta,resultado)

            return res.status(201).json(req.body).send()
        } catch (error) {
            next(error)
        }
    }

    edit=async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
        try {
            const id = parseInt(req.params.id)
            const { idAdmin,tipoConsulta,resultado } = req.body

            await contenedorMySqlServicios.consultaAdmin.edit.run(id, idAdmin,tipoConsulta,resultado)

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
            await contenedorMySqlServicios.consultaAdmin.delete.run(Number(req.params.id))
            
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