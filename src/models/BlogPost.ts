import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
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

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: [true, "Blog post title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    excerpt: {
      type: String,
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Blog post content is required"],
    },
    category: {
      type: String,
      required: [true, "Blog post category is required"],
      enum: [
        "repair-tips",
        "device-reviews",
        "industry-news",
        "how-to",
        "maintenance",
        "troubleshooting",
      ],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      default: "Admin",
    },
    image: {
      type: String,
      required: [true, "Blog post image is required"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
BlogPostSchema.index({ title: "text", content: "text", excerpt: "text" });
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ published: 1 });
BlogPostSchema.index({ featured: 1 });
BlogPostSchema.index({ publishedAt: -1 });
BlogPostSchema.index({ tags: 1 });

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
