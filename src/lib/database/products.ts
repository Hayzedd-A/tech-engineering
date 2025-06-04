import connectDB from "@/lib/connection";
import Product from "@/models/Products";
import { ProductType as ProductType, PaginatedResponse } from "@/lib/types";

export async function getProducts(params: {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  featured?: boolean;
}): Promise<PaginatedResponse<ProductType>> {
  await connectDB();

  const { page, limit, search, category, featured } = params;

  // Build query
  const query: any = {};

  if (search) {
    query.$text = { $search: search };
  }

  if (category) {
    query.category = category;
  }

  if (featured !== undefined) {
    query.featured = featured;
  }

  const total = await Product.countDocuments(query);
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)

  return {
    success: true,
    data: products,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

export async function getProductById(id: string): Promise<ProductType | null> {
  await connectDB();

  const product = await Product.findById(id)

  if (!product) return null;

  return product
}

export async function createProduct(
  data: Partial<ProductType>
): Promise<ProductType> {
  await connectDB();

  const product = await Product.create(data);

  return {
    ...product.toObject(),
  } as ProductType;
}

export async function updateProduct(
  id: string,
  data: Partial<ProductType>
): Promise<ProductType | null> {
  await connectDB();

  const product = await Product.findByIdAndUpdate(
    id,
    { ...data, updatedAt: new Date() },
    { new: true, runValidators: true }
  )

  if (!product) return null;

  return product
}

export async function deleteProduct(id: string): Promise<boolean> {
  await connectDB();

  const result = await Product.findByIdAndDelete(id);
  return !!result;
}

export async function getFeaturedProducts(
  limit: number = 8
): Promise<ProductType[]> {
  await connectDB();

  const products = await Product.find({ featured: true, inStock: true })
    .sort({ createdAt: -1 })
    .limit(limit);

  return products
}
export async function getProductsByCategory(
  category: string,
  limit: number = 12
): Promise<ProductType[]> {
  await connectDB();

  const products = await Product.find({ category, inStock: true })
    .sort({ createdAt: -1 })
    .limit(limit)

  return products 
}

export async function getProductCount(): Promise<number> {
  await connectDB();
  const count = await Product.countDocuments({})
  return count
}
