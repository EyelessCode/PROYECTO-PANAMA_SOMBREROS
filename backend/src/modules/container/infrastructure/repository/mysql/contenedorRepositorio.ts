import { createPool, Pool, PoolConnection, RowDataPacket } from "mysql2/promise";
import { ClaseContenedor } from "../../../domain/interface/container";
import { IRepositorioContenedor } from "../../../domain/repository/contenedor.repositorio";
import { CapacidadMaxContenedor } from "../../../domain/validation/capacidadMaxContenedor";
import { CodigoContenedor } from "../../../domain/validation/codigoContenedor";
import { DescripcionContenedor } from "../../../domain/validation/descripcionContenedor";
import { IdContenedor } from "../../../domain/validation/idContenedor";
import { PesoMaxContenedor } from "../../../domain/validation/pesoMaxContenedor";

type MySqlContenedor = RowDataPacket & {
    id_contenedor: number;
    codigo_contenedor: string;
    capacidad_maxima: number;
    peso_maximo: number;
    descripcion?: string;
};

export class RepositorioMySqlContenedor implements IRepositorioContenedor {
    private pool: Pool;

    constructor(databaseConfig: {
        host: string;
        user: string;
        password: string;
        database: string;
        port?: number;
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

    private mapeoDominio(data: MySqlContenedor): ClaseContenedor {
        return new ClaseContenedor(
            new IdContenedor(data.id_contenedor),
            new CodigoContenedor(data.codigo_contenedor),
            new CapacidadMaxContenedor(data.capacidad_maxima),
            new PesoMaxContenedor(data.peso_maximo),
            new DescripcionContenedor(data.descripcion)
        );
    }

    async getAll(): Promise<ClaseContenedor[]> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            const [rows] = await connection.query<MySqlContenedor[]>("SELECT * FROM contenedor");
            return rows.map((row) => this.mapeoDominio(row));
        } finally {
            if (connection) connection.release();
        }
    }

    async getOneById(id: IdContenedor): Promise<ClaseContenedor | null> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            const [rows] = await connection.query<MySqlContenedor[]>(
                "SELECT * FROM contenedor WHERE id_contenedor = ?",
                [id.id]
            );
            if (rows.length === 0) return null;
            return this.mapeoDominio(rows[0]);
        } finally {
            if (connection) connection.release();
        }
    }

    async create(contenedor: ClaseContenedor): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                `INSERT INTO contenedor (codigo_contenedor, capacidad_maxima, peso_maximo, descripcion)
                 VALUES (?, ?, ?, ?)`,
                [
                    contenedor.codigo.codigo,
                    contenedor.capacidadMax.capacidadMax,
                    contenedor.pesoMax.pesoMax,
                    contenedor.descripcion?.descripcion || null
                ]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async edit(contenedor: ClaseContenedor): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                `UPDATE contenedor SET 
                    codigo_contenedor = ?, capacidad_maxima = ?, peso_maximo = ?, descripcion = ?
                 WHERE id_contenedor = ?`,
                [
                    contenedor.codigo.codigo,
                    contenedor.capacidadMax.capacidadMax,
                    contenedor.pesoMax.pesoMax,
                    contenedor.descripcion?.descripcion || null,
                    contenedor.id.id
                ]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async delete(id: IdContenedor): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query("DELETE FROM contenedor WHERE id_contenedor = ?", [id.id]);
        } finally {
            if (connection) connection.release();
        }
    }

    async close(): Promise<void> {
        await this.pool.end();
    }
}
