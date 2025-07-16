import { createPool, Pool, PoolConnection, RowDataPacket } from "mysql2/promise";
import { IRepositorioUsuario } from "../../../../domain/repository/user/usuario.repositorio";
import { ClaseUsuario } from "../../../../domain/interface/usuario";
import { IdUsuario } from "../../../../domain/validation/user/idUsuario";
import { CedulaUsuario } from "../../../../domain/validation/user/cedulaUsuario";
import { ContraseniaUsuario } from "../../../../domain/validation/user/contraseniaUsuario";
import { CorreoUsuario } from "../../../../domain/validation/user/correoUsuario";
import { NombreUsuario } from "../../../../domain/validation/user/nombreUsuario";
import { RolUsuario } from "../../../../domain/validation/user/rolUsuario";

type MySqlUsuario = RowDataPacket & {
    id_usuario: number,
    cedula: string,
    nombre: string,
    correo: string,
    contrasenia: string,
    rol: string
};

export class RepositorioMySqlUsuario implements IRepositorioUsuario {
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

    private mapeoDominio(data: MySqlUsuario): ClaseUsuario {
        return new ClaseUsuario(
            new IdUsuario(data.id_usuario),
            new CedulaUsuario(data.cedula),
            new NombreUsuario(data.nombre),
            new CorreoUsuario(data.correo),
            new ContraseniaUsuario(data.contrasenia),
            new RolUsuario(data.rol)
        );
    }

    async getAll(): Promise<ClaseUsuario[]> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            const [rows] = await connection.query<MySqlUsuario[]>("SELECT * FROM usuario");
            return rows.map((row) => this.mapeoDominio(row));
        } finally {
            if (connection) connection.release();
        }
    }

    async getOneById(id: IdUsuario): Promise<ClaseUsuario | null> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            const [rows] = await connection.query<MySqlUsuario[]>(
                "SELECT * FROM usuario WHERE id_usuario = ?",
                [id.id]
            );
            if (rows.length === 0) return null;
            return this.mapeoDominio(rows[0]);
        } finally {
            if (connection) connection.release();
        }
    }

    async create(usuario: ClaseUsuario): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                `INSERT INTO usuario (cedula, nombre, correo, contrasenia, rol)
                 VALUES (?, ?, ?, ?, ?)`,
                [
                    usuario.cedula.cedula,
                    usuario.nombre.nombre,
                    usuario.correo.correo,
                    usuario.contrasenia.contrasenia,
                    usuario.rol.rol
                ]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async edit(usuario: ClaseUsuario): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                `UPDATE usuario SET cedula = ?, nombre = ?, correo = ?, contrasenia = ?, rol = ?
                 WHERE id_usuario = ?`,
                [
                    usuario.cedula.cedula,
                    usuario.nombre.nombre,
                    usuario.correo.correo,
                    usuario.contrasenia.contrasenia,
                    usuario.rol.rol,
                    usuario.id.id
                ]
            );
        } finally {
            if (connection) connection.release();
        }
    }

    async delete(id: IdUsuario): Promise<void> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            await connection.query(
                "DELETE FROM usuario WHERE id_usuario = ?",
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
