"use client";

import { useState, useEffect } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { ProductType } from "@/lib/types";
import { Loader2, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FavoritesPage() {
  const { favoriteProducts, getFavoriteCount, removeFromFavorites } =
    useFavorites();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (favoriteProducts.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // Fetch all favorite products
        const productPromises = favoriteProducts.map((id) =>
          fetch(`/api/products/${id}`).then((res) => res.json())
        );

        const results = await Promise.all(productPromises);
        const validProducts = results
          .filter((result) => result.success)
          .map((result) => result.data);

        setProducts(validProducts);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [favoriteProducts]);

  const handleRemoveFavorite = (productId: string) => {
    removeFromFavorites(productId);
    setProducts(
      products.filter((product) => product._id  !== productId)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading favorites...</span>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Favorites ({getFavoriteCount()})
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No favorite products yet.</p>
            <p className="text-gray-500 mt-2 mb-6">
              Start browsing and add products to your favorites!
            </p>
            <Link href="/shop">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const productId = product._id;
              return (
                <Card
                  key={productId}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <Link href={`/shop/${productId}`}>
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
                      </div>
                    </Link>

                    {/* Remove from favorites button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFavorite(productId)}
                      className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600 rounded-full"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {product.brand}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>

                      <Link href={`/shop/${productId}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-bold text-blue-600">
                          ₦{product.price.toLocaleString()}
                        </span>
                        <Badge
                          variant={product.inStock ? "default" : "destructive"}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Link href={`/shop/${productId}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                        {product.inStock && (
                          <Button size="sm" className="px-3">
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
