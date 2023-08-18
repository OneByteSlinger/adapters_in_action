type ICustomer = {
    id: string;
    name: string;
    email: string;
};

type ICustomerUser = {
    id: string;
    customerId: string;
    name: string;
    email: string;
    phone: string;
};
type PaginationOptions = {
    limit?: number;
    startKey?: string;
};

export { ICustomer, ICustomerUser, PaginationOptions };
