import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    UpdateItemCommand,
    DeleteItemCommand,
    ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { IDatabaseAdapter, IDynamoDBAdapterConfig } from '../interfaces';
import { PaginationOptions } from '../types';

export default class DynamoDBService<T> implements IDatabaseAdapter<T> {
    private client: DynamoDBClient;
    private tableName: string;

    constructor(config: IDynamoDBAdapterConfig) {
        this.client = new DynamoDBClient({
            region: config.region || 'eu-west-1',
        });
        this.tableName = config.tableName;
    }

    async create(item: T): Promise<T> {
        const params = {
            TableName: this.tableName,
            Item: marshall(item),
        };
        await this.client.send(new PutItemCommand(params));
        return item;
    }

    async read(id: string): Promise<T | null> {
        const params = {
            TableName: this.tableName,
            Key: marshall({ id }),
        };
        const result = await this.client.send(new GetItemCommand(params));
        if (!result.Item) {
            throw new Error('Item not found');
        }
        return unmarshall(result.Item) as T;
    }

    async update(id: string, updatedItem: T): Promise<T> {
        const marshalledItem = marshall(updatedItem);

        let updateExpression = 'SET ';
        const expressionAttributeValues: { [key: string]: any } = {};
        const expressionAttributeNames: { [key: string]: string } = {};

        Object.keys(marshalledItem).forEach((key, index) => {
            const attributeKey = `:val${index}`;
            const attributeName = `#name${index}`;
            updateExpression += `${attributeName} = ${attributeKey},`;
            expressionAttributeValues[attributeKey] = marshalledItem[key];
            expressionAttributeNames[attributeName] = key;
        });

        updateExpression = updateExpression.slice(0, -1);

        const params = {
            TableName: this.tableName,
            Key: marshall({ id }),
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: 'ALL_NEW',
        };

        const result = await this.client.send(new UpdateItemCommand(params));
        if (!result.Attributes) {
            throw new Error('No attributes returned from update operation');
        }
        return unmarshall(result.Attributes) as T;
    }

    async delete(id: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: marshall({ id }),
        };
        await this.client.send(new DeleteItemCommand(params));
    }

    async list(paginationOptions?: PaginationOptions): Promise<T[]> {
        const params = {
            TableName: this.tableName,
            Limit: paginationOptions?.limit || 10,
            ExclusiveStartKey: paginationOptions?.startKey
                ? marshall({ id: paginationOptions.startKey })
                : undefined,
        };
        const result = await this.client.send(new ScanCommand(params));
        return result.Items?.map((item) => unmarshall(item)) as T[];
    }
}
