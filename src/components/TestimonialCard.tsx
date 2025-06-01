import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Testimonial } from "@/lib/data";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < testimonial.rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-600 mb-4 italic">{testimonial.comment}</p>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">
            {testimonial.name}
          </span>
          <span className="text-sm text-gray-500">{testimonial.date}</span>
        </div>
      </CardContent>
    </Card>
  );
}
