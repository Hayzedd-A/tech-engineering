export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  condition: "new" | "refurbished" | "used";
  image: string;
  description: string;
  specifications: string[];
  inStock: boolean;
}

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

export interface ApiResponse<T = any> {
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
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  condition: 'new' | 'refurbished' | 'used';
  image: string;
  images?: string[]; // Multiple images
  description: string;
  specifications: string[];
  inStock: boolean;
  quantity: number;
  category: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  features: string[];
  category: string;
  active: boolean;
  popular: boolean;
  createdAt: string;
  updatedAt: string;
}

// Add BlogPost type to existing types

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

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
