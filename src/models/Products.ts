import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  image: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  condition: "New" | "Used" | "Refurbished";
  featured: boolean;
  specifications: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: ["smartphones", "tablets", "laptops", "accessories", "parts"],
    },
    brand: {
      type: String,
      required: [true, "Product brand is required"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    images: [
      {
        type: String,
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
    condition: {
      type: String,
      enum: ["New", "Used", "Refurbished"]
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: [0, "Stock quantity cannot be negative"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    specifications: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
ProductSchema.index({ name: "text", description: "text" });
ProductSchema.index({ category: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ inStock: 1 });

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
