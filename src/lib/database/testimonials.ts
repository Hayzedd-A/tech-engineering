import { Testimonial, PaginatedResponse } from "@/lib/types";
import { testimonials as mockTestimonials } from "@/lib/data";

const testimonials: Testimonial[] = mockTestimonials.map(
  (testimonial, index) => ({
    ...testimonial,
    id: (index + 1).toString(),
    approved: Math.random() > 0.2,
    featured: Math.random() > 0.6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
);

interface GetTestimonialsParams {
  page: number;
  limit: number;
  search?: string;
  approved?: boolean;
}

export async function getTestimonials(
  params: GetTestimonialsParams
): Promise<PaginatedResponse<Testimonial>> {
  let filteredTestimonials = [...testimonials];

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredTestimonials = filteredTestimonials.filter(
      (testimonial) =>
        testimonial.name.toLowerCase().includes(searchLower) ||
        testimonial.service.toLowerCase().includes(searchLower) ||
        testimonial.comment.toLowerCase().includes(searchLower)
    );
  }

  if (params.approved !== undefined) {
    filteredTestimonials = filteredTestimonials.filter(
      (testimonial) => testimonial.approved === params.approved
    );
  }

  const total = filteredTestimonials.length;
  const totalPages = Math.ceil(total / params.limit);
  const startIndex = (params.page - 1) * params.limit;
  const endIndex = startIndex + params.limit;
  const paginatedTestimonials = filteredTestimonials.slice(
    startIndex,
    endIndex
  );

  return {
    data: paginatedTestimonials,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages,
    },
  };
}

export async function getTestimonialById(
  id: string
): Promise<Testimonial | null> {
  return testimonials.find((testimonial) => testimonial.id === id) || null;
}

export async function createTestimonial(
  testimonialData: Partial<Testimonial>
): Promise<Testimonial> {
  const newTestimonial: Testimonial = {
    id: (testimonials.length + 1).toString(),
    name: testimonialData.name || "",
    service: testimonialData.service || "",
    rating: testimonialData.rating || 5,
    comment: testimonialData.comment || "",
    image: testimonialData.image || "",
    date: testimonialData.date || new Date().toISOString().split("T")[0],
    approved: testimonialData.approved || false,
    featured: testimonialData.featured || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  testimonials.push(newTestimonial);
  return newTestimonial;
}

export async function updateTestimonial(
  id: string,
  testimonialData: Partial<Testimonial>
): Promise<Testimonial | null> {
  const index = testimonials.findIndex((testimonial) => testimonial.id === id);
  if (index === -1) return null;

  testimonials[index] = {
    ...testimonials[index],
    ...testimonialData,
    updatedAt: new Date().toISOString(),
  };

  return testimonials[index];
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const index = testimonials.findIndex((testimonial) => testimonial.id === id);
  if (index === -1) return false;

  testimonials.splice(index, 1);
  return true;
}

export async function getTestimonialCount(): Promise<number> {
  return testimonials.length;
}
