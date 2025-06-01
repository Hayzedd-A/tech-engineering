"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "@/components/admin/ImageUpload";
import { Product } from "@/lib/types";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [specifications, setSpecifications] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${params.id}`);
      const result = await response.json();

      if (result.success) {
        setProduct(result.data);
        setSpecifications(result.data.specifications?.join("\n") || "");
      } else {
        alert("Product not found");
        router.push("/admin/products");
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
      router.push("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setSaving(true);

    try {
      const productData = {
        ...product,
        specifications: specifications
          .split("\n")
          .filter((spec) => spec.trim()),
      };

      const response = await fetch(`/api/admin/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/admin/products");
      } else {
        alert("Failed to update product: " + result.error);
      }
    } catch (error) {
      console.log(error)
      alert("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        </div>
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <Input
                      value={product.name}
                      onChange={(e) =>
                        setProduct((prev) =>
                          prev ? { ...prev, name: e.target.value } : null
                        )
                      }
                      required
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand *
                    </label>
                    <Input
                      value={product.brand}
                      onChange={(e) =>
                        setProduct((prev) =>
                          prev ? { ...prev, brand: e.target.value } : null
                        )
                      }
                      required
                      placeholder="Enter brand name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price *
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={product.price}
                      onChange={(e) =>
                        setProduct((prev) =>
                          prev
                            ? { ...prev, price: parseFloat(e.target.value) }
                            : null
                        )
                      }
                      required
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Condition
                    </label>
                    <Select
                      value={product.condition}
                      onValueChange={(value) =>
                        setProduct((prev) =>
                          prev ? { ...prev, condition: value as any } : null
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="used">Used</SelectItem>
                        <SelectItem value="refurbished">Refurbished</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <Input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        setProduct((prev) =>
                          prev
                            ? { ...prev, quantity: parseInt(e.target.value) }
                            : null
                        )
                      }
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <Select
                    value={product.category}
                    onValueChange={(value) =>
                      setProduct((prev) =>
                        prev ? { ...prev, category: value } : null
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smartphones">Smartphones</SelectItem>
                      <SelectItem value="tablets">Tablets</SelectItem>
                      <SelectItem value="laptops">Laptops</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="parts">Parts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    value={product.description}
                    onChange={(e) =>
                      setProduct((prev) =>
                        prev ? { ...prev, description: e.target.value } : null
                      )
                    }
                    rows={4}
                    placeholder="Enter product description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specifications (one per line)
                  </label>
                  <Textarea
                    value={specifications}
                    onChange={(e) => setSpecifications(e.target.value)}
                    rows={6}
                    placeholder="Screen: 6.1 inches&#10;Storage: 128GB&#10;Camera: 48MP"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={product.image}
                  onChange={(url) =>
                    setProduct((prev) =>
                      prev ? { ...prev, image: url } : null
                    )
                  }
                  folder="products"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    In Stock
                  </label>
                  <Switch
                    checked={product.inStock}
                    onCheckedChange={(checked) =>
                      setProduct((prev) =>
                        prev ? { ...prev, inStock: checked } : null
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Featured Product
                  </label>
                  <Switch
                    checked={product.featured}
                    onCheckedChange={(checked) =>
                      setProduct((prev) =>
                        prev ? { ...prev, featured: checked } : null
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button type="submit" disabled={saving} className="flex-1">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
