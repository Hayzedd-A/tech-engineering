import { Service, PaginatedResponse } from "@/lib/types";
import { services as mockServices } from "@/lib/data";

const services: Service[] = mockServices.map((service, index) => ({
  ...service,
  id: (index + 1).toString(),
  active: true,
  popular: Math.random() > 0.6,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

interface GetServicesParams {
  page: number;
  limit: number;
  search?: string;
}

export async function getServices(
  params: GetServicesParams
): Promise<PaginatedResponse<Service>> {
  let filteredServices = [...services];

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredServices = filteredServices.filter(
      (service) =>
        service.name.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower)
    );
  }

  const total = filteredServices.length;
  const totalPages = Math.ceil(total / params.limit);
  const startIndex = (params.page - 1) * params.limit;
  const endIndex = startIndex + params.limit;
  const paginatedServices = filteredServices.slice(startIndex, endIndex);

  return {
    data: paginatedServices,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages,
    },
  };
}

export async function getServiceById(id: string): Promise<Service | null> {
  return services.find((service) => service.id === id) || null;
}

export async function createService(
  serviceData: Partial<Service>
): Promise<Service> {
  const newService: Service = {
    id: (services.length + 1).toString(),
    name: serviceData.name || "",
    description: serviceData.description || "",
    price: serviceData.price || "",
    duration: serviceData.duration || "",
    image: serviceData.image || "",
    features: serviceData.features || [],
    category: serviceData.category || "",
    active: serviceData.active ?? true,
    popular: serviceData.popular || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  services.push(newService);
  return newService;
}

export async function updateService(
  id: string,
  serviceData: Partial<Service>
): Promise<Service | null> {
  const index = services.findIndex((service) => service.id === id);
  if (index === -1) return null;

  services[index] = {
    ...services[index],
    ...serviceData,
    updatedAt: new Date().toISOString(),
  };

  return services[index];
}

export async function deleteService(id: string): Promise<boolean> {
  const index = services.findIndex((service) => service.id === id);
  if (index === -1) return false;

  services.splice(index, 1);
  return true;
}

export async function getServiceCount(): Promise<number> {
  return services.length;
}
