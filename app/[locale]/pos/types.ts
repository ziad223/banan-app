export interface Product {
  id: string;
  name: string;
  barcode: string;
  price: number;
  cost: number;
  stock: number;
  category: string;
  image?: string;
  discount?: number;
  isActive: boolean;
}

export interface InvoiceItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface Invoice {
  id: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'transfer' | 'multiple';
  status: 'pending' | 'completed' | 'cancelled';
  customer?: Customer;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  balance: number;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  isActive: boolean;
}