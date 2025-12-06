'use client';

import { useState, useEffect } from 'react';
import StatusBar from './StatusBar';
import SearchBar from './SearchBar';
import ProductGrid from './ProductGrid';
import InvoicePanel from './InvoicePanel';
import PaymentPanel from './PaymentPanel';

// أنواع البيانات
interface Product {
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

interface InvoiceItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  balance: number;
}

// بيانات افتراضية
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'شاي ليبتون',
    barcode: '62230001',
    price: 25.00,
    cost: 18.00,
    stock: 150,
    category: 'مشروبات',
    discount: 10,
    isActive: true,
  },
  {
    id: '2',
    name: 'قهوة نسكافيه',
    barcode: '62230002',
    price: 45.00,
    cost: 35.00,
    stock: 80,
    category: 'مشروبات',
    isActive: true,
  },
  {
    id: '3',
    name: 'سكر 1 كيلو',
    barcode: '62230003',
    price: 8.00,
    cost: 6.00,
    stock: 200,
    category: 'مواد غذائية',
    isActive: true,
  },
  {
    id: '4',
    name: 'زيت دوار الشمس',
    barcode: '62230004',
    price: 32.00,
    cost: 25.00,
    stock: 5,
    category: 'مواد غذائية',
    discount: 5,
    isActive: true,
  },
  {
    id: '5',
    name: 'معجون أسنان',
    barcode: '62230005',
    price: 15.00,
    cost: 10.00,
    stock: 120,
    category: 'العناية الشخصية',
    isActive: true,
  },
  {
    id: '6',
    name: 'صابون لوكس',
    barcode: '62230006',
    price: 12.00,
    cost: 8.00,
    stock: 300,
    category: 'العناية الشخصية',
    isActive: true,
  },
  {
    id: '7',
    name: 'مناديل ورقية',
    barcode: '62230007',
    price: 18.00,
    cost: 12.00,
    stock: 90,
    category: 'منتجات ورقية',
    discount: 15,
    isActive: true,
  },
  {
    id: '8',
    name: 'ماء معدني',
    barcode: '62230008',
    price: 2.00,
    cost: 1.20,
    stock: 500,
    category: 'مشروبات',
    isActive: true,
  },
];

const mockCustomer: Customer = {
  id: '1',
  name: 'أحمد محمد',
  phone: '0501234567',
  email: 'ahmed@example.com',
  balance: 1250.50,
};

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cartItems, setCartItems] = useState<InvoiceItem[]>([]);
  const [customer, setCustomer] = useState<Customer | undefined>(mockCustomer);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // الكشف عن حجم الشاشة
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    const filtered = products.filter(
      (product) =>
        product.name.includes(query) ||
        product.barcode.includes(query) ||
        product.category.includes(query)
    );
    
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (filter: string) => {
    let filtered = [...products];
    
    switch (filter) {
      case 'popular':
        filtered = filtered.sort((a, b) => b.stock - a.stock);
        break;
      case 'discount':
        filtered = filtered.filter(p => p.discount && p.discount > 0);
        break;
      case 'low-stock':
        filtered = filtered.filter(p => p.stock < 10);
        break;
    }
    
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      handleUpdateQuantity(product.id, existingItem.quantity + 1);
    } else {
      const newItem: InvoiceItem = {
        product,
        quantity: 1,
        unitPrice: product.price,
        discount: product.discount || 0,
        total: product.price * (1 - (product.discount || 0) / 100),
      };
      
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.product.id === productId) {
          const newQuantity = Math.max(1, Math.min(quantity, item.product.stock));
          const newTotal = newQuantity * item.unitPrice * (1 - item.discount / 100);
          return { ...item, quantity: newQuantity, total: newTotal };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(items => items.filter(item => item.product.id !== productId));
  };

  const handlePayment = (method: string, amount: number) => {
    console.log('Processing payment:', { method, amount, cartItems });
    alert('تم إتمام عملية الدفع بنجاح!');
    setCartItems([]);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveDraft = () => {
    localStorage.setItem('draftInvoice', JSON.stringify(cartItems));
    alert('تم حفظ الفاتورة كمسودة');
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 w-full p-0">
      <StatusBar />

      <div className="w-full px-0">
        <div className="">
          <SearchBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        </div>

<div className="grid grid-cols-1 lg:grid-cols-1 gap-4 lg:gap-6 ">
          <div className="l">
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>

          <div className="space-y-4 lg:space-y-6">
            <div className={isSmallScreen ? "h-auto" : "h-max"}>
              <InvoicePanel
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onSelectCustomer={() => setCustomer(mockCustomer)}
                customer={customer}
              />
            </div>
            
            <div>
              <PaymentPanel
                totalAmount={totalAmount}
                onPayment={handlePayment}
                onPrint={handlePrint}
                onSaveDraft={handleSaveDraft}
              />
            </div>
          </div>
        </div>

    
      </div>
    </div>
  );
}