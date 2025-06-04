"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search } from "lucide-react";
import { PaginatedResponse, ProductType } from "@/lib/types";

export default function ShopPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  // Available filter options
  const categories = [
    "all",
    "smartphones",
    "tablets",
    "laptops",
    "accessories",
    "parts",
  ];
  const [brands, setBrands] = useState<string[]>(["all"]);
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under $300", value: "0-300" },
    { label: "$300 - $600", value: "300-600" },
    { label: "$600 - $900", value: "600-900" },
    { label: "Over $900", value: "900+" },
  ];

  // Fetch products from API
  const fetchProducts = async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
      });

      if (searchTerm) params.append("search", searchTerm);
      if (selectedCategory !== "all")
        params.append("category", selectedCategory);

      const response = await fetch(`/api/products?${params.toString()}`);
      const result: PaginatedResponse<ProductType> = await response.json();

      if (result.success) {
        let filteredProducts = result.data;

        // Apply client-side filters (brand and price)
        if (selectedBrand !== "all") {
          filteredProducts = filteredProducts.filter(
            (p) => p.brand === selectedBrand
          );
        }

        if (priceRange !== "all") {
          const [min, max] = priceRange
            .split("-")
            .map((p) => p.replace("+", ""));
          filteredProducts = filteredProducts.filter((p) => {
            if (priceRange === "900+") return p.price >= 900;
            return p.price >= parseInt(min) && p.price <= parseInt(max);
          });
        }

        setProducts(filteredProducts);
        setPagination(result.pagination);

        // Extract unique brands from all products for filter options
        const uniqueBrands = [
          "all",
          ...Array.from(new Set(result.data.map((p) => p.brand))),
        ];
        setBrands(uniqueBrands);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts(1);
  }, []);

  // Refetch when filters change
  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1);
  }, [searchTerm, selectedCategory]);

  // Refetch when page changes
  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(currentPage);
    }
  }, [currentPage]);

  // Apply client-side filters when they change
  useEffect(() => {
    fetchProducts(currentPage);
  }, [selectedBrand, priceRange]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setPriceRange("all");
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

                {/* Search Filter */}
                <div className="mb-6">
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </Label>
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="sm" disabled={loading}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </Label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={loading}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all"
                          ? "All Categories"
                          : category.charAt(0).toUpperCase() +
                            category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </Label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={loading}
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand === "all" ? "All Brands" : brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </Label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={loading}
                  >
                    {priceRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="w-full"
                    disabled={loading}
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
                {loading
                  ? "Loading products..."
                  : `Showing ${products.length} of ${pagination.total} products`}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading products...</span>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || loading}
                    >
                      Previous
                    </Button>

                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        disabled={loading}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={
                        currentPage === pagination.totalPages || loading
                      }
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
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
