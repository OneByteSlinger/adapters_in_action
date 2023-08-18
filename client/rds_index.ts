// RDSAdaptor and RDSAdapterConfig to create a RDSService
import RDSAdapter from '../adapters/rdsAdapter';
import { IRDSAdapterConfig } from '../interfaces';

// models or entities
import { ICustomer } from '../interfaces';
import { ICustomerUser } from '../interfaces';

// Config for Customer Service
const rdsServiceCustomerConfig: IRDSAdapterConfig = {
    host: 'localhost',
    user: 'John Doe',
    password: 'Secure Password',
    database: 'cutomer_database',
    tableName: 'customer_table',
};

// Config for CustomerUser Service
const rdsServiceCustomerUserConfig: IRDSAdapterConfig = {
    host: 'localhost',
    user: 'Jane Doe',
    password: 'Secure Password',
    database: 'cutomer_user_database',
    tableName: 'customer_user_table',
};

// Adaptor! Give me a RDSService with Customer config
const rdsServiceCustomerTable = new RDSAdapter<ICustomer>(
    rdsServiceCustomerConfig,
);

// Adaptor! Give me a RDSService with CustomerUser config
const rdsServiceCustomerUserTable = new RDSAdapter<ICustomerUser>(
    rdsServiceCustomerUserConfig,
);

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

// CRUDL (Create, Read, Update, Delete, List) operations for CustomerUser entity using rdsServiceCustomerUser and IIFE (Immediately Invoked Function Expression to handle async/await)
(async function RDSCRUDLOperationsCustomerUser() {
    // create a customerUser
    const createdCustomerUser = await rdsServiceCustomerUserTable.create(
        customerUser,
    );

    console.log('createdCustomerUser', createdCustomerUser);

    // read a customerUser
    const readCustomerUser = await rdsServiceCustomerUserTable.read(
        customerUser.id,
    );

    console.log('readCustomerUser', readCustomerUser);

    // update a customerUser
    const updatedCustomerUser = await rdsServiceCustomerUserTable.update(
        customerUser.id,
        {
            ...customerUser,
            name: 'Susan Doe',
        },
    );

    console.log('updatedCustomerUser', updatedCustomerUser);

    // delete a customerUser
    await rdsServiceCustomerUserTable.delete(customerUser.id);

    // list customerUsers
    const listCustomerUsers = await rdsServiceCustomerUserTable.list({
        limit: 10,
        startKey: '1',
    });

    console.log('listCustomerUsers', listCustomerUsers);
})();

// CRUDL (Create, Read, Update, Delete, List) operations for Customer entity using rdsServiceCustomer and IIFE (Immediately Invoked Function Expression to handle async/await)
(async function RDSCRUDLOperationsCustomer() {
    // create a customer
    const createdCustomer = await rdsServiceCustomerTable.create(customer);

    console.log('createdCustomer', createdCustomer);

    // read a customer
    const readCustomer = await rdsServiceCustomerTable.read(customer.id);

    console.log('readCustomer', readCustomer);

    // update a customer
    const updatedCustomer = await rdsServiceCustomerTable.update(customer.id, {
        ...customer,
        name: 'Jane Doe',
    });

    console.log('updatedCustomer', updatedCustomer);

    // delete a customer
    await rdsServiceCustomerTable.delete(customer.id);

    // read a customer
    const readCustomerAfterDelete = await rdsServiceCustomerTable.read(
        customer.id,
    );

    console.log('readCustomerAfterDelete', readCustomerAfterDelete);

    // list customers - with pagination
    const listCustomers = await rdsServiceCustomerTable.list({
        limit: 10,
        startKey: '1',
    });

    console.log('listCustomers', listCustomers);
})();
