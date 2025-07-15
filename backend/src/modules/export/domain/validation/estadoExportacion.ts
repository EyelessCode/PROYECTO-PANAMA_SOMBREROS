export enum EstadoExportacion{
    PENDIENTE="pendiente",
    EN_TRANSITO="en_transito",
    ENTREGADO="entregado",
    CANCELADO="cancelado"
}

export function validarEstado(estado: string): EstadoExportacion {
    if (Object.values(EstadoExportacion).includes(estado as EstadoExportacion)) {
        return estado as EstadoExportacion;
    }
    throw new Error(`Estado inválido. Valores permitidos: ${Object.values(EstadoExportacion).join(", ")}`)
}
