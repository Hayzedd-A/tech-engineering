import { Product, PaginatedResponse } from "@/lib/types";
import { products as mockProducts } from "@/lib/data";

// Mock database - replace with actual database implementation
const products: Product[] = mockProducts.map((product, index) => ({
  ...product,
  id: (index + 1).toString(),
  quantity: Math.floor(Math.random() * 50) + 1,
  featured: Math.random() > 0.7,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

interface GetProductsParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}

export async function getProducts(
  params: GetProductsParams
): Promise<PaginatedResponse<Product>> {
  let filteredProducts = [...products];

  // Apply search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply category filter
  if (params.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === params.category
    );
  }

  // Calculate pagination
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / params.limit);
  const startIndex = (params.page - 1) * params.limit;
  const endIndex = startIndex + params.limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    data: paginatedProducts,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages,
    },
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  return products.find((product) => product.id === id) || null;
}

export async function createProduct(
  productData: Partial<Product>
): Promise<Product> {
  const newProduct: Product = {
    id: (products.length + 1).toString(),
    name: productData.name || "",
    brand: productData.brand || "",
    price: productData.price || 0,
    condition: productData.condition || "new",
    image: productData.image || "",
    images: productData.images || [],
    description: productData.description || "",
    specifications: productData.specifications || [],
    inStock: productData.inStock ?? true,
    quantity: productData.quantity || 0,
    category: productData.category || "",
    featured: productData.featured || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  products.push(newProduct);
  return newProduct;
}

export async function updateProduct(
  id: string,
  productData: Partial<Product>
): Promise<Product | null> {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...productData,
    updatedAt: new Date().toISOString(),
  };

  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return false;

  products.splice(index, 1);
  return true;
}

export async function getProductCount(): Promise<number> {
  return products.length;
}
