"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/lib/data";

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const brands = ["all", ...Array.from(new Set(products.map((p) => p.brand)))];
  const conditions = ["all", "new", "refurbished", "used"];
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under $300", value: "0-300" },
    { label: "$300 - $600", value: "300-600" },
    { label: "$600 - $900", value: "600-900" },
    { label: "Over $900", value: "900+" },
  ];

  const applyFilters = () => {
    let filtered = products;

    if (selectedBrand !== "all") {
      filtered = filtered.filter((p) => p.brand === selectedBrand);
    }

    if (selectedCondition !== "all") {
      filtered = filtered.filter((p) => p.condition === selectedCondition);
    }

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map((p) => p.replace("+", ""));
      filtered = filtered.filter((p) => {
        if (priceRange === "900+") return p.price >= 900;
        return p.price >= parseInt(min) && p.price <= parseInt(max);
      });
    }

    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setSelectedBrand("all");
    setSelectedCondition("all");
    setPriceRange("all");
    setFilteredProducts(products);
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Device Shop</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quality refurbished phones and gadgets at competitive prices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>

                {/* Brand Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand === "all" ? "All Brands" : brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition === "all"
                          ? "All Conditions"
                          : condition.charAt(0).toUpperCase() +
                            condition.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {priceRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Button onClick={applyFilters} className="w-full">
                    Apply Filters
                  </Button>
                  <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching your filters.
                </p>
                <Button onClick={resetFilters} className="mt-4">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
