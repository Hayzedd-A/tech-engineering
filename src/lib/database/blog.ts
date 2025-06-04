import connectDB from "@/lib/connection";
import BlogPost from "@/models/BlogPost";
import { BlogPostType, PaginatedResponse } from "@/lib/types";

type QueryType = {
  $text?: { $search: string };
  category?: string;
  published?: boolean;
  featured?: boolean
};

export async function getBlogPosts(params: {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  published?: boolean;
  featured?: boolean
}): Promise<PaginatedResponse<BlogPostType>> {
  await connectDB();

  const { page, limit, search, category, published, featured } = params;

  const query: QueryType = {};

  if (search) {
    query.$text = { $search: search };
  }

  if (category) {
    query.category = category;
  }

  if (published !== undefined) {
    query.published = published;
  }

  if (featured === true) {
    query.featured = true
  }

  const total = await BlogPost.countDocuments(query);
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;

  const posts = await BlogPost.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)

  return {
    success: true,
    data: posts,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

export async function getBlogPostById(
  id: string
): Promise<BlogPostType | null> {
  await connectDB();

  const post = await BlogPost.findById(id)

  if (!post) return null;

  return post
}

export async function createBlogPost(
  data: Partial<BlogPostType>
): Promise<BlogPostType> {
  await connectDB();

  const postData = {
    ...data,
    publishedAt: data.published ? new Date() : undefined,
  };

  const post = await BlogPost.create(postData);

  return {
    ...post.toObject(),
    id: post._id.toString(),
    publishedAt: post.publishedAt?.toISOString() || null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  } as BlogPostType;
}

export async function updateBlogPost(
  id: string,
  data: Partial<BlogPostType>
): Promise<BlogPostType | null> {
  await connectDB();

  const updateData = {
    ...data,
    updatedAt: new Date(),
  };

  // Set publishedAt if publishing for the first time
  if (data.published && !data.publishedAt) {
    updateData.publishedAt = new Date();
  }

  const post = await BlogPost.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })

  if (!post) return null;

  return post
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  await connectDB();

  const result = await BlogPost.findByIdAndDelete(id);
  return !!result;
}

export async function getPublishedBlogPosts(params: {
  page: number;
  limit: number;
  category?: string;
}): Promise<PaginatedResponse<BlogPostType>> {
  return getBlogPosts({ ...params, published: true });
}

export async function getFeaturedBlogPosts(
  limit: number = 3
): Promise<BlogPostType[]> {
  await connectDB();

  const posts = await BlogPost.find({ published: true, featured: true })
    .sort({ publishedAt: -1 })
    .limit(limit)

  return posts
}

export async function getBlogCategories(): Promise<string[]> {
  await connectDB();

  const categories = await BlogPost.distinct("category", { published: true });
  return categories;
}

export async function getBlogPostCount(): Promise<number> {
  return await BlogPost.countDocuments();
}
