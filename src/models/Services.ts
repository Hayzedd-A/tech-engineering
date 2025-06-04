import { ServiceType } from "@/lib/types";
import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<ServiceType>(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      maxlength: [200, "Service name cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    price: {
      type: String,
      required: [true, "Service price is required"],
      min: [0, "Price cannot be negative"],
    },
    duration: {
      type: String,
      required: [true, "Service duration is required"],
    },
    category: {
      type: String,
      required: [true, "Service category is required"],
      enum: [
        "screen-repair",
        "battery-replacement",
        "water-damage",
        "software-issues",
        "data-recovery",
        "hardware-issues",
        "general-repair",
      ],
    },
    image: {
      type: String,
      required: [true, "Service image is required"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: true,
    },
    deviceTypes: [
      {
        type: String,
        enum: [
          "smartphone",
          "tablet",
          "laptop",
          "smartwatch",
          "gaming-console",
        ],
      },
    ],
    warranty: {
      type: String,
      default: "90 days",
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
ServiceSchema.index({ name: "text", description: "text" });
ServiceSchema.index({ category: 1 });
ServiceSchema.index({ featured: 1 });
ServiceSchema.index({ available: 1 });

export default mongoose.models.Service ||
  mongoose.model<ServiceType>("Service", ServiceSchema);
