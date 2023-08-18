// AuroraAdaptor and AuroraAdapterConfig to create a AuroraService
import AuroraAdapter from '../adapters/auroraAdapter';
import { IAuroraAdapterConfig } from '../interfaces';

// models or entities
import { ICustomer } from '../interfaces';
import { ICustomerUser } from '../interfaces';

// Config for Customer Service
const auroraServiceCustomerConfig: IAuroraAdapterConfig = {
    secretArn: 'secretArn',
    resourceArn: 'resourceArn',
    database: 'cutomer_database',
    tableName: 'customer_table',
};

// Config for CustomerUser Service
const auroraServiceCustomerUserConfig: IAuroraAdapterConfig = {
    secretArn: 'secretArn',
    resourceArn: 'resourceArn',
    database: 'cutomer_user_database',
    tableName: 'customer_user_table',
};

// Adaptor! Give me a AuroraService with Customer config
const auroraServiceCustomerTable = new AuroraAdapter<ICustomer>(
    auroraServiceCustomerConfig,
);

// Adaptor! Give me a AuroraService with CustomerUser config
const auroraServiceCustomerUserTable = new AuroraAdapter<ICustomerUser>(
    auroraServiceCustomerUserConfig,
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

// CRUDL (Create, Read, Update, Delete, List) operations for CustomerUser entity using auroraServiceCustomerUser and IIFE (Immediately Invoked Function Expression to handle async/await)
(async function AuroraCRUDLOperationsCustomerUser() {
    // create a customerUser
    const createdCustomerUser = await auroraServiceCustomerUserTable.create(
        customerUser,
    );

    console.log('createdCustomerUser', createdCustomerUser);

    // read a customerUser
    const readCustomerUser = await auroraServiceCustomerUserTable.read(
        customerUser.id,
    );

    console.log('readCustomerUser', readCustomerUser);

    // update a customerUser
    const updatedCustomerUser = await auroraServiceCustomerUserTable.update(
        customerUser.id,
        {
            ...customerUser,
            name: 'Susan Doe',
        },
    );

    console.log('updatedCustomerUser', updatedCustomerUser);

    // delete a customerUser
    await auroraServiceCustomerUserTable.delete(customerUser.id);

    // list customerUsers
    const listCustomerUsers = await auroraServiceCustomerUserTable.list({
        limit: 10,
        startKey: '1',
    });

    console.log('listCustomerUsers', listCustomerUsers);
})();

// CRUDL (Create, Read, Update, Delete, List) operations for Customer entity using auroraServiceCustomer and IIFE (Immediately Invoked Function Expression to handle async/await)
(async function AuroraCRUDLOperationsCustomer() {
    // create a customer
    const createdCustomer = await auroraServiceCustomerTable.create(customer);

    console.log('createdCustomer', createdCustomer);

    // read a customer
    const readCustomer = await auroraServiceCustomerTable.read(customer.id);

    console.log('readCustomer', readCustomer);

    // update a customer
    const updatedCustomer = await auroraServiceCustomerTable.update(
        customer.id,
        {
            ...customer,
            name: 'Jane Doe',
        },
    );

    console.log('updatedCustomer', updatedCustomer);

    // delete a customer
    await auroraServiceCustomerTable.delete(customer.id);

    // read a customer
    const readCustomerAfterDelete = await auroraServiceCustomerTable.read(
        customer.id,
    );

    console.log('readCustomerAfterDelete', readCustomerAfterDelete);

    // list customers - with pagination
    const listCustomers = await auroraServiceCustomerTable.list({
        limit: 10,
        startKey: '1',
    });

    console.log('listCustomers', listCustomers);
})();
