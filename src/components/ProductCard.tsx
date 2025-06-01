import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new":
        return "bg-green-100 text-green-800";
      case "refurbished":
        return "bg-blue-100 text-blue-800";
      case "used":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-4">
        <div className="relative h-48 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(
              product.condition
            )}`}
          >
            {product.condition}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-2xl font-bold text-blue-600">${product.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 space-y-2 flex gap-2">
        <Link href={`/shop/${product.id}`} className="w-full m-0">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Link href="/contact" className="w-full">
          <Button className="w-full">Contact to Buy</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
