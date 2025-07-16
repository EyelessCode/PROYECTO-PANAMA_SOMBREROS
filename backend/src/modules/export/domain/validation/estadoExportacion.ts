export class EstadoExportacion{
    estado:string

    constructor(estado:string) {
        this.estado=estado
        this.validacion()
        this.caracteresLimite()
    }

    private validacion(){
        const estadosValidos = ['pendiente', 'en_transito', 'entregado', 'cancelado'];

        if (!estadosValidos.includes(this.estado)) {
            this.estado = 'pendiente';
        }

    }

    private caracteresLimite(){
        if (this.estado.length>=20) {
            throw new Error(`La cantidad de caracteres sobrepasaron `+
                `un límite. No lo excedas!`)
        }
    }

    get estadoValor():string{
        return this.estado
    }
}
