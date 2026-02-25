export interface Item {
    name: string,
    sku: string,
    quantity: number,
    price: number,
    category: string,
    createdAt: Date,
    updatedAt: Date,
    id: string
};

export interface CreateItem {
    name: string,
    sku: string,
    quantity: number,
    price: number,
    category: string
};

export interface UpdateItem {
    name: string,
    quantity: number,
    price: number,
    category: string
};