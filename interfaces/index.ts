export interface IDatabaseAdapter<T> {
    create(item: T, tableName?: string): Promise<T>;
    read(id: string, tableName?: string): Promise<T | null>;
    update(id: string, updatedItem: T, tableName?: string): Promise<T>;
    delete(id: string, tableName?: string): Promise<void>;
    list(
        paginationOptions?: PaginationOptions,
        tableName?: string,
    ): Promise<T[]>;
}

export interface ICustomer {
    id: string;
    name: string;
    email: string;
}

export interface ICustomerUser {
    id: string;
    customerId: string;
    name: string;
    email: string;
    phone: string;
}

export interface IDynamoDBAdapterConfig {
    region?: string;
}

export interface IRDSAdapterConfig {
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

export interface IAuroraAdapterConfig {
    secretArn: string;
    resourceArn: string;
    database: string;
    tableName: string;
    region?: string;
}

export interface IRedshiftAdapterConfig {
    secretArn: string;
    resourceArn: string;
    database: string;
    tableName: string;
    region?: string;
}

export type PaginationOptions = {
    limit?: number;
    startKey?: string;
};
