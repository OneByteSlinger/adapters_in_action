// DynamoDBAdaptor and DynamoDBAdapterConfig to create a DynamoDBService
import DynamoDBAdapter from '../adapters/dynamoDBAdapter';
import { IDynamoDBAdapterConfig } from '../interfaces';

// models or entities
import { ICustomer } from '../types';
import { ICustomerUser } from '../types';

// Config for Customer Service
const dynamoDBServiceConfig: IDynamoDBAdapterConfig = {};

// DynamoDBService to use any table in a DynamoDB instance
const dynamoDBService = new DynamoDBAdapter<ICustomer>(dynamoDBServiceConfig);

// A Customer
const customer: ICustomer = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
};

// A CustomerUser
const customerUser: ICustomerUser = {
    id: '1',
    customerId: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '1234567890',
};

// CRUDL (Create, Read, Update, Delete, List) operations for CustomerUser entity using dynamoDBServiceCustomerUser and IIFE (Immediately Invoked Function Expression to handle async/await) - Each service can be used for multiple tables in a DynamoDB instance
(async function DynamoDBCRUDLOperationsCustomerUser() {
    // create a customerUser
    const createdCustomerUser = await dynamoDBService.create(
        customerUser,
        'customer_user_table',
    );

    console.log('createdCustomerUser', createdCustomerUser);

    // read a customerUser
    const readCustomerUser = await dynamoDBService.read(
        customerUser.id,
        'customer_user_table',
    );

    console.log('readCustomerUser', readCustomerUser);

    // update a customerUser
    const updatedCustomerUser = await dynamoDBService.update(
        customerUser.id,
        {
            ...customerUser,
            name: 'Susan Doe',
        },
        'customer_user_table',
    );

    console.log('updatedCustomerUser', updatedCustomerUser);

    // delete a customerUser
    await dynamoDBService.delete(customerUser.id, 'customer_user_table');

    // read a customerUser
    const readCustomerUserAfterDelete = await dynamoDBService.read(
        customerUser.id,
        'customer_user_table',
    );

    console.log('readCustomerUserAfterDelete', readCustomerUserAfterDelete);

    // list customerUsers
    const listCustomerUsers = await dynamoDBService.list(
        {
            limit: 10,
            startKey: '1',
        },
        'customer_user_table',
    );

    console.log('listCustomerUsers', listCustomerUsers);
})();

// CRUDL (Create, Read, Update, Delete, List) operations for Customer entity using dynamoDBServiceCustomer and IIFE (Immediately Invoked Function Expression to handle async/await)
(async function DynamoDBCRUDLOperationsCustomer() {
    // create a customer
    const createdCustomer = await dynamoDBService.create(
        customer,
        'customer_table',
    );

    console.log('createdCustomer', createdCustomer);

    // read a customer
    const readCustomer = await dynamoDBService.read(
        customer.id,
        'customer_table',
    );

    console.log('readCustomer', readCustomer);

    // update a customer
    const updatedCustomer = await dynamoDBService.update(
        customer.id,
        {
            ...customer,
            name: 'Jane Doe',
        },
        'customer_table',
    );

    console.log('updatedCustomer', updatedCustomer);

    // delete a customer
    await dynamoDBService.delete(customer.id, 'customer_table');

    // read a customer
    const readCustomerAfterDelete = await dynamoDBService.read(
        'customer_table',
        customer.id,
    );

    console.log('readCustomerAfterDelete', readCustomerAfterDelete);

    // list customers - with pagination
    const listCustomers = await dynamoDBService.list(
        {
            limit: 10,
            startKey: '1',
        },
        'customer_table',
    );

    console.log('listCustomers', listCustomers);
})();
