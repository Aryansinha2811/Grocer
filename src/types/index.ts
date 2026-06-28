export interface Category {
    id: string;
    name: string;
    image: string;
}

export interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    mrp?: number;
    unit: string; // e.g. "500g", "1L", "1 dozen"
    category: string;
    merchantId: string;
    merchantName?: string;
    inStock: boolean;
    rating?: number;
    deliveryEta?: string; // e.g. "9 mins"
}

export interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    phone: string;
    addresses?: Address[];
}

export interface Address {
    id: string;
    label: string;
    line1: string;
    line2?: string;
    city: string;
    pincode: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    status: "placed" | "packed" | "out_for_delivery" | "delivered" | "cancelled";
    total: number;
    createdAt: string;
}