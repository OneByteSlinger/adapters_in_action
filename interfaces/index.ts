import { PaginationOptions } from '../types';

interface IDatabaseAdapter<T> {
    create(item: T): Promise<T>;
    read(id: string): Promise<T | null>;
    update(id: string, updatedItem: T): Promise<T>;
    delete(id: string): Promise<void>;
    list(paginationOptions?: PaginationOptions): Promise<T[]>;
}

interface IDynamoDBAdapterConfig {
    region?: string;
    tableName: string;
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
