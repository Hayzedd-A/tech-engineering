"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/admin/DataTable";
import { Product } from "@/lib/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Debounce search term with 500ms delay
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      setPagination((prev) => ({ ...prev, page: 1 }));
      fetchProducts(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchProducts();
  }, [pagination.page]);

  const fetchProducts = async (search = "") => {
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search,
      });

      const response = await fetch(`/api/admin/products?${params}`);
      const result = await response.json();

      if (result.success) {
        setProducts(result.data);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search)
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleEdit = (product: Product) => {
    router.push(`/admin/products/${product.id}/edit`);
  };

  const handleDelete = async (product: Product) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const columns = [
    {
      key: "image" as keyof Product,
      label: "Image",
      render: (value: string) => (
        <div className="w-12 h-12 relative">
          <Image
            src={value || "/placeholder.jpg"}
            alt="Product"
            fill
            className="object-cover rounded"
          />
        </div>
      ),
    },
    {
      key: "name" as keyof Product,
      label: "Name",
      render: (value: string, product: Product) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{product.brand}</div>
        </div>
      ),
    },
    {
      key: "price" as keyof Product,
      label: "Price",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: "condition" as keyof Product,
      label: "Condition",
      render: (value: string) => (
        <Badge variant={value === "new" ? "default" : "secondary"}>
          {value}
        </Badge>
      ),
    },
    {
      key: "inStock" as keyof Product,
      label: "Stock",
      render: (value: boolean, product: Product) => (
        <div>
          <Badge variant={value ? "default" : "destructive"}>
            {value ? "In Stock" : "Out of Stock"}
          </Badge>
          <div className="text-sm text-gray-500">Qty: {product.quantity}</div>
        </div>
      ),
    },
    {
      key: "featured" as keyof Product,
      label: "Featured",
      render: (value: boolean) => (
        <Badge variant={value ? "default" : "outline"}>
          {value ? "Yes" : "No"}
        </Badge>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
        <div className="bg-white rounded-lg border p-8 text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Button onClick={() => router.push("/admin/products/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <DataTable
        data={products}
        columns={columns}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search products..."
      />
    </div>
  );
}
