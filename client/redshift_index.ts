// RedshiftAdaptor and RedshiftServiceConfig to create a RedshiftService
import RedshiftService from '../adapters/redshiftService';
import { IRedshiftServiceConfig } from '../interfaces';

// models or entities
import { Customer, CustomerUser } from '../types';

// Config for Customer Service
const redshiftServiceCustomerConfig: IRedshiftServiceConfig = {
    secretArn: 'secretArn',
    resourceArn: 'resourceArn',
    database: 'cutomer_database',
    tableName: 'customer_table',
};

// Config for CustomerUser Service
const redshiftServiceCustomerUserConfig: IRedshiftServiceConfig = {
    secretArn: 'secretArn',
    resourceArn: 'resourceArn',
    database: 'cutomer_user_database',
    tableName: 'customer_user_table',
};

// Adaptor! Give me a RedshiftService with Customer config
const redshiftServiceCustomerTable = new RedshiftService<Customer>(
    redshiftServiceCustomerConfig,
);

// Adaptor! Give me a RedshiftService with CustomerUser config
const redshiftServiceCustomerUserTable = new RedshiftService<CustomerUser>(
    redshiftServiceCustomerUserConfig,
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

// CRUDL (Create, Read, Update, Delete, List) operations for CustomerUser entity using redshiftServiceCustomerUser and IIFE (Immediately Invoked Function Expression to handle async/await)
(async function RedshiftCRUDLOperationsCustomerUser() {
    // create a customerUser
    const createdCustomerUser = await redshiftServiceCustomerUserTable.create(
        customerUser,
    );

    console.log('createdCustomerUser', createdCustomerUser);

    // read a customerUser
    const readCustomerUser = await redshiftServiceCustomerUserTable.read(
        customerUser.id,
    );

    console.log('readCustomerUser', readCustomerUser);

    // update a customerUser
    const updatedCustomerUser = await redshiftServiceCustomerUserTable.update(
        customerUser.id,
        {
            ...customerUser,
            name: 'Susan Doe',
        },
    );

    console.log('updatedCustomerUser', updatedCustomerUser);

    // delete a customerUser
    await redshiftServiceCustomerUserTable.delete(customerUser.id);

    // list customerUsers
    const listCustomerUsers = await redshiftServiceCustomerUserTable.list({
        limit: 10,
        startKey: '1',
    });

    console.log('listCustomerUsers', listCustomerUsers);
})();

// CRUDL (Create, Read, Update, Delete, List) operations for Customer entity using redshiftServiceCustomer and IIFE (Immediately Invoked Function Expression to handle async/await)
(async function RedshiftCRUDLOperationsCustomer() {
    // create a customer
    const createdCustomer = await redshiftServiceCustomerTable.create(customer);

    console.log('createdCustomer', createdCustomer);

    // read a customer
    const readCustomer = await redshiftServiceCustomerTable.read(customer.id);

    console.log('readCustomer', readCustomer);

    // update a customer
    const updatedCustomer = await redshiftServiceCustomerTable.update(
        customer.id,
        {
            ...customer,
            name: 'Jane Doe',
        },
    );

    console.log('updatedCustomer', updatedCustomer);

    // delete a customer
    await redshiftServiceCustomerTable.delete(customer.id);

    // read a customer
    const readCustomerAfterDelete = await redshiftServiceCustomerTable.read(
        customer.id,
    );

    console.log('readCustomerAfterDelete', readCustomerAfterDelete);

    // list customers - with pagination
    const listCustomers = await redshiftServiceCustomerTable.list({
        limit: 10,
        startKey: '1',
    });

    console.log('listCustomers', listCustomers);
})();
