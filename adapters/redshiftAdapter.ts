import {
    RDSDataClient,
    ExecuteStatementCommand,
} from '@aws-sdk/client-rds-data';
import {
    IDatabaseAdapter,
    IRedshiftAdapterConfig,
} from '../interfaces';

import { PaginationOptions } from '../types';

export default class RedshiftService<T> implements IDatabaseAdapter<T> {
    private client: RDSDataClient;
    private secretArn: string;
    private resourceArn: string;
    private database: string;
    private tableName: string;

    constructor(config: IRedshiftAdapterConfig) {
        this.client = new RDSDataClient({
            region: config.region || 'eu-west-1',
        });
        this.secretArn = config.secretArn;
        this.resourceArn = config.resourceArn;
        this.database = config.database;
        if(!config.tableName) 
            throw new Error('Table name is required');
        
        this.tableName = config.tableName;
    }

    private async executeSql(sql: string, parameters?: any[]): Promise<any> {
        const params = {
            secretArn: this.secretArn,
            resourceArn: this.resourceArn,
            database: this.database,
            sql,
            parameters: parameters?.map((value) => ({ value })),
        };

        const response = await this.client.send(
            new ExecuteStatementCommand(params),
        );
        return response.records;
    }

    async create(item: T,tableName?: string ): Promise<T> {
        const keys = Object.keys(item as object);
        const values = Object.values(item as object)) ;
        const placeholders = keys.map((_, index) => `$${index + 1}`).join(',');

        const sql = `INSERT INTO ${this.tableName}(${keys.join(
            ',',
        )}) VALUES(${placeholders})`;
        await this.executeSql(sql, values);
        return item;
    }

    async read(id: string,tableName?: string): Promise<T | null> {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = $1`;
        const result = await this.executeSql(sql, [id]);
        return result[0] || null;
    }

    async update( id: string, updatedItem: T,tableName?: string): Promise<T> {
        const keys = Object.keys(updatedItem as object);
        const values = Object.values(updatedItem as object);
        const setString = keys
            .map((key, index) => `${key}=$${index + 1}`)
            .join(',');

        const sql = `UPDATE ${this.tableName} SET ${setString} WHERE id = $${
            keys.length + 1
        }`;
        await this.executeSql(sql, [...values, id]);
        return this.read(this.tableName, id) as Promise<T>;
    }

    async delete(id: string,tableName?: string): Promise<void> {
        const sql = `DELETE FROM ${this.tableName} WHERE id = $1`;
        await this.executeSql(sql, [id]);
    }

    async list(
        paginationOptions?: PaginationOptions,
        tableName?: string
    ): Promise<T[]> {
        const limit = paginationOptions?.limit || 10;
        const offset =
            (parseInt(paginationOptions?.startKey || '0') || 0) * limit;

        const sql = `SELECT * FROM ${this.tableName} LIMIT $1 OFFSET $2`;
        const result = await this.executeSql(sql, [limit, offset]);
        return result;
    }
}
