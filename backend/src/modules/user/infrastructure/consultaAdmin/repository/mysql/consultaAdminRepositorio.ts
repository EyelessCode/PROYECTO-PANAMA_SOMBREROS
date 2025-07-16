import { createPool, Pool, PoolConnection, RowDataPacket } from "mysql2/promise";
import { IRepositorioConsultaAdmin } from "../../../../domain/repository/consultaAdmin/consultaAdmin.repositorio";
import { ClaseConsultaAdmin } from "../../../../domain/interface/consultaAdmin";
import { IdConsultaAdmin } from "../../../../domain/validation/consultaAdmin/idConsultaAdmin";
import { ResultadoConsultaAdmin } from "../../../../domain/validation/consultaAdmin/resultadoConsultaAdmin";
import { TipoConsultaAdmin } from "../../../../domain/validation/consultaAdmin/tipoConsultaAdmin";
import { IdUsuario } from "../../../../domain/validation/consultaAdmin/idUsuario";

type mysqlConsultaAdmin=RowDataPacket & {
    id_consulta: number,
    id_admin: number,
    fecha_consulta: Date,
    tipo_consulta: string,
    resultado: string,
};

export class RepositorioMySqlConsultaAdmin implements IRepositorioConsultaAdmin {
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

    private mapeoDominio(data: mysqlConsultaAdmin): ClaseConsultaAdmin {
        return new ClaseConsultaAdmin(
            new IdConsultaAdmin(data.id_consulta),
            new IdUsuario(data.id_admin),
            new TipoConsultaAdmin(data.tipo_consulta),
            data.resultado ? new ResultadoConsultaAdmin(data.resultado) : undefined
        );
    }

    async getAll(): Promise<ClaseConsultaAdmin[]> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            const [rows] = await connection.query<mysqlConsultaAdmin[]>("SELECT * FROM consultas_admin");
            return rows.map(row => this.mapeoDominio(row));
        } finally {
            if (connection) connection.release();
        }
    }

    async getOneById(id: IdConsultaAdmin): Promise<ClaseConsultaAdmin | null> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            const [rows] = await connection.query<mysqlConsultaAdmin[]>(
                "SELECT * FROM consultas_admin WHERE id_consulta = ?", 
                [id.id]
            );
            
            if (rows.length === 0) return null;
            
            return this.mapeoDominio(rows[0]);
        } finally {
            if (connection) connection.release();
        }
    }

    async create(consultaAdmin: ClaseConsultaAdmin): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                `INSERT INTO consultas_admin 
                (id_admin, fecha_consulta, tipo_consulta, resultado) 
                VALUES(?, ?, ?, ?)`,
                [
                    consultaAdmin.idAdmin.id,
                    consultaAdmin.fechaConsulta,
                    consultaAdmin.tipoConsulta.tipoConsulta,
                    consultaAdmin?.resultado?.resultado
                ]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async edit(consultaAdmin: ClaseConsultaAdmin): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                `UPDATE consultas_admin SET 
                id_admin = ?, fecha_consulta = ?, tipo_consulta = ?, resultado = ? 
                WHERE id_consulta = ?`,
                [
                    consultaAdmin.idAdmin.id,
                    consultaAdmin.fechaConsulta,
                    consultaAdmin.tipoConsulta.tipoConsulta,
                    consultaAdmin?.resultado?.resultado,
                    consultaAdmin.id.id
                ]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async delete(id: IdConsultaAdmin): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                "DELETE FROM consultas_admin WHERE id_consulta = ?",
                [id.id]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    // Cierra el pool cuando ya no se necesite
    async close(): Promise<void> {
        await this.pool.end();
    }
}