import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/lib/data";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

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
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/shop"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative h-96 lg:h-[500px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(
                  product.condition
                )}`}
              >
                {product.condition}
              </span>
            </div>

            <p className="text-4xl font-bold text-blue-600 mb-6">
              ${product.price}
            </p>

            <p className="text-gray-600 mb-8">{product.description}</p>

            {/* Specifications */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Contact Buttons */}
            <div className="space-y-4">
              <Link href="/contact" className="block">
                <Button size="lg" className="w-full">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact to Purchase
                </Button>
              </Link>
              <Link href="tel:+15551234567" className="block">
                <Button size="lg" variant="outline" className="w-full">
                  <Phone className="h-5 w-5 mr-2" />
                  Call (555) 123-4567
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Purchase Information</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 30-day return policy</li>
                <li>• Thoroughly tested and cleaned</li>
                <li>• Includes charger and basic accessories</li>
                <li>• Local pickup or shipping available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
              .filter((p) => p.id !== product.id && p.brand === product.brand)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Card key={relatedProduct.id}>
                  <CardContent className="p-4">
                    <div className="relative h-48 mb-4">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-blue-600 font-bold mb-2">
                      ${relatedProduct.price}
                    </p>
                    <Link href={`/shop/${relatedProduct.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
