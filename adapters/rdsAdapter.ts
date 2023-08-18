import { IDatabaseAdapter, IRDSAdapterConfig } from '../interfaces';
import { Pool } from 'pg';
import { PaginationOptions } from '../types';

export default class RDSService<T> implements IDatabaseAdapter<T> {
    private pool: Pool;
    private tableName: string;

    constructor(config: IRDSAdapterConfig) {
        this.pool = new Pool({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port || 5432,
            max: config.max || 20,
            idleTimeoutMillis: config.idleTimeoutMillis || 30000,
            connectionTimeoutMillis: config.connectionTimeoutMillis || 2000,
        });
        if (!config.tableName) throw new Error('Table name is required');
        this.tableName = config.tableName;
    }

    async create(item: T, tableName?: string): Promise<T> {
        const client = await this.pool.connect();
        try {
            const keys = Object.keys(item as object);
            const values = Object.values(item as object);
            const placeholders = keys
                .map((_, index) => `$${index + 1}`)
                .join(',');
            await client.query(
                `INSERT INTO ${this.tableName}(${keys.join(
                    ',',
                )}) VALUES(${placeholders})`,
                values,
            );
            return item;
        } finally {
            client.release();
        }
    }

    async read(id: string, tableName?: string): Promise<T | null> {
        const client = await this.pool.connect();
        try {
            const result = await client.query(
                `SELECT * FROM ${this.tableName} WHERE id = $1`,
                [id],
            );
            return result.rows[0] || null;
        } finally {
            client.release();
        }
    }

    async update(id: string, updatedItem: T, tableName?: string): Promise<T> {
        const client = await this.pool.connect();
        try {
            const keys = Object.keys(updatedItem as object);
            const values = Object.values(updatedItem as object);
            const setString = keys
                .map((key, index) => `${key}=$${index + 1}`)
                .join(',');
            await client.query(
                `UPDATE ${this.tableName} SET ${setString} WHERE id = $${
                    keys.length + 1
                }`,
                [...values, id],
            );
            return this.read(id, tableName) as Promise<T>;
        } finally {
            client.release();
        }
    }

    async delete(id: string, tableName?: string): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [
                id,
            ]);
        } finally {
            client.release();
        }
    }

    async list(
        paginationOptions?: PaginationOptions,
        tableName?: string,
    ): Promise<T[]> {
        const client = await this.pool.connect();
        try {
            const limit = paginationOptions?.limit || 10;
            const offset =
                (parseInt(paginationOptions?.startKey || '0') || 0) * limit;

            const result = await client.query(
                `SELECT * FROM ${this.tableName} LIMIT $1 OFFSET $2`,
                [limit, offset],
            );
            return result.rows;
        } finally {
            client.release();
        }
    }
}
