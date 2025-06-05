import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/lib/types";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {

  return (
    <Link href={`/shop/${product._id}`}>
      <Card className="group hover:shadow-lg  transition-shadow duration-300 cursor-pointer">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-blue-600">
              Featured
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {product.brand}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
            </div>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">
                  ₦{product.price.toLocaleString()}
                </span>
              </div>
              {product.stockQuantity > 0 && (
                <Badge variant="outline" className="text-xs">
                  {product.stockQuantity} left
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
