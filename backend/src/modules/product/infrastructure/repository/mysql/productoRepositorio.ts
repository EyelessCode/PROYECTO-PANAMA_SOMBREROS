import { createPool, Pool, PoolConnection, RowDataPacket } from "mysql2/promise";
import { IRepositorioProducto } from "../../../domain/repository/producto.repositorio";
import { ClaseProducto } from "../../../domain/interface/producto";
import { IdSombrero } from "../../../domain/validation/model/idSombrero";
import { IdTipo } from "../../../domain/validation/model/idTipo";
import { IdTalla } from "../../../domain/validation/model/idTalla";
import { IdColor } from "../../../domain/validation/model/idColor";
import { PrecioUnitarioSombrero } from "../../../domain/validation/model/precioUnitarioSombrero";
import { DescripcionSombrero } from "../../../domain/validation/model/descripcionSombrero";

type MySqlProducto = RowDataPacket & {
    id_sombrero: number;
    id_tipo: number;
    id_talla: number;
    id_color: number;
    precio_unitario: number;
    descripcion?: string;
    fecha_creacion: Date;
    activo: boolean;
};

export class RepositorioMySqlProducto implements IRepositorioProducto {
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

    private mapeoDominio(data: MySqlProducto): ClaseProducto {
        return new ClaseProducto(
            new IdSombrero(data.id_sombrero),
            new IdTipo(data.id_tipo),
            new IdTalla(data.id_talla),
            new IdColor(data.id_color),
            new PrecioUnitarioSombrero(data.precio_unitario),
            new DescripcionSombrero(data?.descripcion),
            data.activo,
        );
    }

async getAll(): Promise<any[]> {
    let connection: PoolConnection | null = null;
    try {
        connection = await this.pool.getConnection();
        const [rows] = await connection.query<any>(`
            SELECT 
                s.id_sombrero,
                ts.nombre_tipo AS tipo,
                t.valor_talla AS talla,
                c.nombre_color AS color,
                s.precio_unitario,
                s.descripcion,
                s.fecha_creacion,
                s.activo
            FROM sombrero s
            JOIN tipo_sombrero ts ON s.id_tipo = ts.id_tipo_sombrero
            JOIN talla t ON s.id_talla = t.id_talla
            JOIN color c ON s.id_color = c.id_color;
        `);
        return rows;
    } finally {
        if (connection) connection.release();
    }
}

    async getOneById(id: IdSombrero): Promise<ClaseProducto | null> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            const [rows] = await connection.query<MySqlProducto[]>(
                "SELECT * FROM sombrero WHERE id_sombrero = ?",
                [id.id]
            );
            if (rows.length === 0) return null;
            return this.mapeoDominio(rows[0]);
        } finally {
            if (connection) connection.release();
        }
    }

    async create(producto: ClaseProducto): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                `INSERT INTO sombrero (
                    id_tipo, id_talla, id_color, precio_unitario, descripcion,
                    fecha_creacion, activo
                ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    producto.idTipo.id,
                    producto.idTalla.id,
                    producto.idColor.id,
                    producto.precioUnitario.precioUnitario,
                    producto?.descripcion?.descripcion ?? null,
                    producto.fechaCreacion,
                    producto.activo
                ]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async edit(producto: ClaseProducto): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                `UPDATE sombrero SET 
                    id_tipo = ?, id_talla = ?, id_color = ?, 
                    precio_unitario = ?, descripcion = ?, 
                    fecha_creacion = ?, activo = ?
                 WHERE id_sombrero = ?`,
                [
                    producto.idTipo.id,
                    producto.idTalla.id,
                    producto.idColor.id,
                    producto.precioUnitario.precioUnitario,
                    producto?.descripcion?.descripcion ?? null,
                    producto.fechaCreacion,
                    producto.activo,
                    producto.id.id
                ]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async delete(id: IdSombrero): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                "DELETE FROM sombrero WHERE id_sombrero = ?",
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
