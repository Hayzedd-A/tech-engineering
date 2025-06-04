// import { Document } from "mongoose";

// export interface Service {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   duration: string;
//   image: string;
//   features: string[];
// }

// export interface Product {
//   id: string;
//   name: string;
//   brand: string;
//   price: number;
//   condition: "new" | "refurbished" | "used";
//   image: string;
//   description: string;
//   specifications: string[];
//   inStock: boolean;
// }

// export interface BlogPost {
//   id: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   author: string;
//   date: string;
//   image: string;
//   tags: string[];
//   category: string;
//   readTime: string;
// }

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  rating: number;
  comment: string;
  image?: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  device?: string;
  message: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  image: string;
}

// Add these to your existing types

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'editor';
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalProducts: number;
  totalServices: number;
  totalBlogPosts: number;
  totalTestimonials: number;
  recentOrders: number;
  monthlyRevenue: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Update existing interfaces with admin fields
// export interface Product {
//   id: string;
//   name: string;
//   brand: string;
//   price: number;
//   condition: 'new' | 'refurbished' | 'used';
//   image: string;
//   images?: string[]; // Multiple images
//   description: string;
//   specifications: string[];
//   inStock: boolean;
//   quantity: number;
//   category: string;
//   featured: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Service extends Document{
//   _id: string;
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   duration: string;
//   image: string;
//   featured: boolean;
//   features: string[];
//   category: string;
//   active: boolean;
//   popular: boolean;
//   createdAt: NativeDate;
//   updatedAt: NativeDate;
// }

// Add BlogPost type to existing types

// export interface BlogPost {
//   id: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   category: string;
//   author: string;
//   image: string;
//   tags: string[];
//   published: boolean;
//   featured: boolean;
//   publishedAt: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// Update PaginatedResponse to be generic
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Update existing types to include MongoDB ObjectId compatibility

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  condition: "New" | "Used" | "Refurbished";
  category: string;
  brand: string;
  image: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  specifications: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceType {
  _id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  image: string;
  featured: boolean;
  available: boolean;
  deviceTypes: string[];
  warranty: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostType {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}


// export interface BlogPost {
//   id: string;
//   title: string;
//   slug: string;
//   excerpt: string;
//   content: string;
//   author: string;
//   date: string;
//   image: string;
//   tags: string[];
//   readTime: string;
//   published: boolean;
//   featured: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  rating: number;
  comment: string;
  image?: string;
  date: string;
  approved: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
