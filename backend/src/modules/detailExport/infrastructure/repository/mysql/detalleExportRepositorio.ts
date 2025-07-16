import { createPool, Pool, PoolConnection, RowDataPacket } from "mysql2/promise";
import { IRepositorioDetalleExport } from "../../../domain/repository/detalleExport.repositorio";
import { IdDetalleExport } from "../../../domain/validation/idDetalleExport";
import { IdExportacion } from "../../../domain/validation/idExportacion";
import { IdSombrero } from "../../../domain/validation/idSombrero";
import { CantidadDetalleExport } from "../../../domain/validation/cantidadDetalleExport";
import { PrecioVentaDetalleExport } from "../../../domain/validation/precioVentaDetalleExport";
import { ClaseDetalleExport } from "../../../domain/interface/detalleExport";

type MySqlDetalleExport = RowDataPacket & {
    id_detalle_expo: number;
    id_exportacion: number;
    id_sombrero: number;
    cantidad: number;
    precio_venta: number;
};

export class RepositorioMySqlDetallesExport implements IRepositorioDetalleExport {
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

    private mapeoDominio(data: MySqlDetalleExport): ClaseDetalleExport {
        return new ClaseDetalleExport(
            new IdDetalleExport(data.id_detalle_expo),
            new IdExportacion(data.id_exportacion),
            new IdSombrero(data.id_sombrero),
            new CantidadDetalleExport(data.cantidad),
            new PrecioVentaDetalleExport(data.precio_venta)
        );
    }

    async getAll(): Promise<ClaseDetalleExport[]> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            const [rows] = await connection.query<MySqlDetalleExport[]>("SELECT * FROM detalle_exportacion");
            return rows.map((row) => this.mapeoDominio(row));
        } finally {
            if (connection) connection.release();
        }
    }

    async getOneById(id: IdDetalleExport): Promise<ClaseDetalleExport | null> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            const [rows] = await connection.query<MySqlDetalleExport[]>(
                "SELECT * FROM detalle_exportacion WHERE id_detalle_expo = ?",
                [id.id]
            );
            if (rows.length === 0) return null;
            return this.mapeoDominio(rows[0]);
        } finally {
            if (connection) connection.release();
        }
    }

    async create(detalleExport: ClaseDetalleExport): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                `INSERT INTO detalle_exportacion (
                    id_exportacion, id_sombrero, cantidad, precio_venta
                ) VALUES (?, ?, ?, ?)`,
                [
                    detalleExport.idExportacion.id,
                    detalleExport.idSombrero.id,
                    detalleExport.cantidad.cantidad,
                    detalleExport.precioVenta?.precioVenta
                ]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async edit(detalleExport: ClaseDetalleExport): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                `UPDATE detalle_exportacion SET 
                    id_exportacion = ?, id_sombrero = ?, cantidad = ?, precio_venta = ?
                 WHERE id_detalle_expo = ?`,
                [
                    detalleExport.idExportacion.id,
                    detalleExport.idSombrero.id,
                    detalleExport.cantidad.cantidad,
                    detalleExport.precioVenta?.precioVenta,
                    detalleExport.id.id
                ]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async delete(id: IdDetalleExport): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                "DELETE FROM detalle_exportacion WHERE id_detalle_expo = ?",
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
