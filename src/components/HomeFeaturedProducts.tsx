"use client";

import { ProductType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Button } from "./ui/button";

// Loading skeleton component
function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

function HomeFeaturedProducts() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [featuredProducts, setFeaturedProduct] = useState<ProductType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`api/products?featured=true`);
      try {
        const result = await response.json();
        if (result.success) {
          setFeaturedProduct(result.data.slice(0, 6));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600">
            Check out our latest devices for sale
          </p>
        </div>

        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          // Actual products
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/shop">
            <Button size="lg" disabled={isLoading}>
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeFeaturedProducts;
