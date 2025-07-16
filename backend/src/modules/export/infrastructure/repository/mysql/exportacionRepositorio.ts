import { createPool, Pool, PoolConnection, RowDataPacket } from "mysql2/promise";
import { ClaseExportacion } from "../../../domain/interface/exportacion";
import { IRepositorioExportacion } from "../../../domain/repository/exportacion.repositorio";
import { IdContenedor } from "../../../domain/validation/idContenedor";
import { IdExportacion } from "../../../domain/validation/idExportacion";
import { IdMoneda } from "../../../domain/validation/idMoneda";
import { IdPais } from "../../../domain/validation/idPais";
import { ValorFleteExportacion } from "../../../domain/validation/valorFleteExportacion";
import { EstadoExportacion } from "../../../domain/validation/estadoExportacion";

type MySqlExportacion = RowDataPacket & {
    id_exportacion: number;
    id_contenedor: number;
    id_pais_destino: number;
    id_moneda: number;
    fecha_salida: Date;
    fecha_llegada_estimada?: Date;
    valor_flete: number;
    estado: string;
    fecha_registro: Date;
};

export class RepositorioMySqlExportacion implements IRepositorioExportacion {
    private pool: Pool;

    constructor(databaseConfig: {
        host: string,
        user: string,
        password: string,
        database: string,
        port?: number
    }) {
        this.pool = createPool({
            host: databaseConfig.host,
            user: databaseConfig.user,
            password: databaseConfig.password,
            database: databaseConfig.database,
            port: databaseConfig.port || 3306,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    private mapeoDominio(data: MySqlExportacion): ClaseExportacion {
        return new ClaseExportacion(
            new IdExportacion(data.id_exportacion),
            new IdContenedor(data.id_contenedor),
            new IdPais(data.id_pais_destino),
            new IdMoneda(data.id_moneda),
            new Date(data.fecha_salida),
            new ValorFleteExportacion(data.valor_flete),
            new EstadoExportacion(data.estado),
            new Date(data.fecha_registro)
        );
    }

    async getAll(): Promise<ClaseExportacion[]> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            const [rows] = await connection.query<MySqlExportacion[]>("SELECT * FROM exportacion");
            return rows.map((row) => this.mapeoDominio(row));
        } finally {
            if (connection) connection.release();
        }
    }

    async getOneById(id: IdExportacion): Promise<ClaseExportacion | null> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            const [rows] = await connection.query<MySqlExportacion[]>(
                "SELECT * FROM exportacion WHERE id_exportacion = ?",
                [id.id]
            );
            if (rows.length === 0) return null;
            return this.mapeoDominio(rows[0]);
        } finally {
            if (connection) connection.release();
        }
    }

    async create(exportacion: ClaseExportacion): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                `INSERT INTO exportacion (
                    id_contenedor, id_pais_destino, id_moneda, 
                    fecha_salida, fecha_llegada_estimada,
                    valor_flete, estado, fecha_registro
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    exportacion.idContenedor.id,
                    exportacion.idPais.id,
                    exportacion.idMoneda.id,
                    exportacion.fechaSalida,
                    exportacion.fechaLlegada ?? null,
                    exportacion.valorFlete.valorFlete,
                    exportacion.estado.estado,
                    exportacion.fechaRegistro
                ]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async edit(exportacion: ClaseExportacion): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                `UPDATE exportacion SET
                    id_contenedor = ?, id_pais_destino = ?, id_moneda = ?,
                    fecha_salida = ?, fecha_llegada_estimada = ?,
                    valor_flete = ?, estado = ?, fecha_registro = ?
                 WHERE id_exportacion = ?`,
                [
                    exportacion.idContenedor.id,
                    exportacion.idPais.id,
                    exportacion.idMoneda.id,
                    exportacion.fechaSalida,
                    exportacion.fechaLlegada ?? null,
                    exportacion.valorFlete.valorFlete,
                    exportacion.estado.estado,
                    exportacion.fechaRegistro,
                    exportacion.id.id
                ]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async delete(id: IdExportacion): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                "DELETE FROM exportacion WHERE id_exportacion = ?",
                [id.id]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async close(): Promise<void> {
        await this.pool.end();
    }
}
