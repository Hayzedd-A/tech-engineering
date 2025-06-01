import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Service } from "@/lib/data";
import Link from "next/link";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="text-center">
        <div className="text-4xl mb-2">{service.icon}</div>
        <CardTitle className="text-xl">{service.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Price:</span>
            <span className="text-blue-600 font-bold">{service.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Duration:</span>
            <span>{service.duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/contact" className="w-full">
          <Button className="w-full">Book This Service</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
