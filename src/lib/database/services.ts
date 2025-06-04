// import connectDB from "./connection";
import connectDB from "../connection";
import Service from "@/models/Services";
import { ServiceType, PaginatedResponse } from "@/lib/types";

type QueryType = {
  $text?: { $search: string };
  category?: string;
  featured?: boolean;
};
export async function getServices(params: {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  featured?: boolean;
  filters?: string;
}): Promise<PaginatedResponse<ServiceType> | Error | null> {
  try {
    await connectDB();
    console.log("incomming request to get")

    const { page, limit, search, category, featured } = params;

    const query: QueryType = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    if (featured !== undefined) {
      query.featured = featured;
    }

    const total = await Service.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    const services = await Service.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    return {
      success: true,
      data: services,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return error;
    } else {
      return null;
    }
  }
}

export async function getServiceById(id: string): Promise<ServiceType | null> {
  await connectDB();

  const service = await Service.findById(id)

  if (!service) return null;

  return service
}

export async function createService(
  data: Partial<ServiceType>
): Promise<ServiceType> {
  await connectDB();

  const service = await Service.create(data);

  return {
    ...service.toObject(),
    id: service._id.toString(),
    createdAt: service.createdAt.toISOString(),
    updatedAt: service.updatedAt.toISOString(),
  } as ServiceType;
}

export async function updateService(
  id: string,
  data: Partial<ServiceType>
): Promise<ServiceType | null> {
  await connectDB();

  const service = await Service.findByIdAndUpdate(
    id,
    { ...data, updatedAt: new Date() },
    { new: true, runValidators: true }
  )

  if (!service) return null;

  return service
}

export async function deleteService(id: string): Promise<boolean> {
  await connectDB();

  const result = await Service.findByIdAndDelete(id);
  return !!result;
}

export async function getFeaturedServices(
  limit: number = 6
): Promise<ServiceType[]> {
  await connectDB();

  const services = await Service.find({ featured: true, available: true })
    .sort({ createdAt: -1 })
    .limit(limit)

  return services
}

export async function getServiceCount(): Promise<number> {
  await connectDB();
  const count = await Service.countDocuments({});
  return count;
}
