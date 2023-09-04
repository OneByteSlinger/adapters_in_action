type Customer = {
    id: string;
    name: string;
    email: string;
};

type CustomerUser = {
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

export { Customer, CustomerUser, PaginationOptions };
