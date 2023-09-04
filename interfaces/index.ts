import { PaginationOptions } from '../types';

interface IDatabaseAdapter<T> {
    create(item: T): Promise<T>;
    read(id: string): Promise<T | null>;
    update(id: string, updatedItem: T): Promise<T>;
    delete(id: string): Promise<void>;
    list(paginationOptions?: PaginationOptions): Promise<T[]>;
}

interface IDynamoDBServiceConfig {
    region?: string;
    tableName: string;
}

interface IRDSServiceConfig {
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

interface IAuroraServiceConfig {
    secretArn: string;
    resourceArn: string;
    database: string;
    tableName: string;
    region?: string;
}

interface IRedshiftServiceConfig {
    secretArn: string;
    resourceArn: string;
    database: string;
    tableName: string;
    region?: string;
}

export {
    IDatabaseAdapter,
    IDynamoDBServiceConfig,
    IRDSServiceConfig,
    IAuroraServiceConfig,
    IRedshiftServiceConfig,
};
