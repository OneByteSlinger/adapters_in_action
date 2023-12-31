// DynamoDBAdaptor and DynamoDBServiceConfig to create a DynamoDBService
import DynamoDBService from '../adapters/dynamoDBService';
import { IDynamoDBServiceConfig } from '../interfaces';

// models or entities
import { Customer, CustomerUser } from '../types';

// Config for DynamoDB Service for Customer User table
const dynamoDBServiceCustomerUserConfig: IDynamoDBServiceConfig = {
    tableName: 'customer_user_table',
};

// DynamoDBService to use CustomerUser table in a DynamoDB instance
const dynamoDBServiceCustomerUser = new DynamoDBService<CustomerUser>(
    dynamoDBServiceCustomerUserConfig,
);

// Config for DynamoDB Service for Customer table
const dynamoDBServiceCustomerConfig: IDynamoDBServiceConfig = {
    tableName: 'customer_table',
};

// DynamoDBService to use Customer table in a DynamoDB instance
const dynamoDBServiceCustomer = new DynamoDBService<Customer>(
    dynamoDBServiceCustomerConfig,
);

// A Customer
const customer: Customer = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
};

// A CustomerUser
const customerUser: CustomerUser = {
    id: '1',
    customerId: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '1234567890',
};

// CRUDL (Create, Read, Update, Delete, List) operations for CustomerUser entity using dynamoDBServiceCustomerUser and IIFE (Immediately Invoked Function Expression to handle async/await) - Each service can be used for multiple tables in a DynamoDB instance
(async function DynamoDBCRUDLOperationsCustomerUser() {
    // create a customerUser
    const createdCustomerUser = await dynamoDBServiceCustomerUser.create(
        customerUser,
    );

    console.log('createdCustomerUser', createdCustomerUser);

    // read a customerUser
    const readCustomerUser = await dynamoDBServiceCustomerUser.read(
        customerUser.id,
    );

    console.log('readCustomerUser', dynamoDBServiceCustomerUser);

    // update a customerUser
    const updatedCustomerUser = await dynamoDBServiceCustomerUser.update(
        customerUser.id,
        {
            ...customerUser,
            name: 'Susan Doe',
        },
    );

    console.log('updatedCustomerUser', updatedCustomerUser);

    // delete a customerUser
    await dynamoDBServiceCustomerUser.delete(customerUser.id);

    // read a customerUser
    const readCustomerUserAfterDelete = await dynamoDBServiceCustomerUser.read(
        customerUser.id,
    );

    console.log('readCustomerUserAfterDelete', readCustomerUserAfterDelete);

    // list customerUsers
    const listCustomerUsers = await dynamoDBServiceCustomerUser.list({
        limit: 10,
        startKey: '1',
    });

    console.log('listCustomerUsers', listCustomerUsers);
})();

// CRUDL (Create, Read, Update, Delete, List) operations for Customer entity using dynamoDBServiceCustomer and IIFE (Immediately Invoked Function Expression to handle async/await)
(async function DynamoDBCRUDLOperationsCustomer() {
    // create a customer
    const createdCustomer = await dynamoDBServiceCustomer.create(customer);

    console.log('createdCustomer', createdCustomer);

    // read a customer
    const readCustomer = await dynamoDBServiceCustomer.read(customer.id);

    console.log('readCustomer', readCustomer);

    // update a customer
    const updatedCustomer = await dynamoDBServiceCustomer.update(customer.id, {
        ...customer,
        name: 'Jane Doe',
    });

    console.log('updatedCustomer', updatedCustomer);

    // delete a customer
    await dynamoDBServiceCustomer.delete(customer.id);

    // read a customer
    const readCustomerAfterDelete = await dynamoDBServiceCustomer.read(
        customer.id,
    );

    console.log('readCustomerAfterDelete', readCustomerAfterDelete);

    // list customers - with pagination
    const listCustomers = await dynamoDBServiceCustomer.list({
        limit: 10,
        startKey: '1',
    });

    console.log('listCustomers', listCustomers);
})();
