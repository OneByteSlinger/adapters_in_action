import { PaginationOptions } from '../types';

interface IDatabaseAdapter<T> {
    create(item: T, tableName?: string): Promise<T>;
    read(id: string, tableName?: string): Promise<T | null>;
    update(id: string, updatedItem: T, tableName?: string): Promise<T>;
    delete(id: string, tableName?: string): Promise<void>;
    list(
        paginationOptions?: PaginationOptions,
        tableName?: string,
    ): Promise<T[]>;
}

interface IDynamoDBAdapterConfig {
    region?: string;
}

interface IRDSAdapterConfig {
    host: string;
    user: string;
    password: string;
    database: string;
    tableName: string;
    port?: number;
    max?: number;
    idleTimeoutMillis?: number;
    connectionTimeoutMillis?: number;
}

interface IAuroraAdapterConfig {
    secretArn: string;
    resourceArn: string;
    database: string;
    tableName: string;
    region?: string;
}

interface IRedshiftAdapterConfig {
    secretArn: string;
    resourceArn: string;
    database: string;
    tableName: string;
    region?: string;
}

export {
    IDatabaseAdapter,
    IDynamoDBAdapterConfig,
    IRDSAdapterConfig,
    IAuroraAdapterConfig,
    IRedshiftAdapterConfig,
};
