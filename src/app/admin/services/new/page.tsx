"use client";

import { useState } from "react";
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
import { Service } from "@/lib/types";

export default function NewServicePage() {
  const [service, setService] = useState<Partial<Service>>({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    image: "",
    features: [],
    active: true,
    popular: false,
  });
  const [features, setFeatures] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceData = {
        ...service,
        features: features.split("\n").filter((feature) => feature.trim()),
      };

      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/admin/services");
      } else {
        alert("Failed to create service: " + result.error);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Add New Service</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Name *
                  </label>
                  <Input
                    value={service.name}
                    onChange={(e) =>
                      setService((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                    placeholder="Enter service name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price *
                    </label>
                    <Input
                      value={service.price}
                      onChange={(e) =>
                        setService((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                      required
                      placeholder="$99 - $199"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration *
                    </label>
                    <Input
                      value={service.duration}
                      onChange={(e) =>
                        setService((prev) => ({
                          ...prev,
                          duration: e.target.value,
                        }))
                      }
                      required
                      placeholder="30-60 minutes"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <Select
                      value={service.category}
                      onValueChange={(value) =>
                        setService((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="screen-repair">
                          Screen Repair
                        </SelectItem>
                        <SelectItem value="battery-replacement">
                          Battery Replacement
                        </SelectItem>
                        <SelectItem value="water-damage">
                          Water Damage
                        </SelectItem>
                        <SelectItem value="software-issues">
                          Software Issues
                        </SelectItem>
                        <SelectItem value="hardware-issues">
                          Hardware issues
                        </SelectItem>
                        <SelectItem value="data-recovery">
                          Data Recovery
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    value={service.description}
                    onChange={(e) =>
                      setService((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={4}
                    placeholder="Enter service description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features (one per line)
                  </label>
                  <Textarea
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    rows={6}
                    placeholder="Free diagnosis&#10;90-day warranty&#10;Same-day service"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={service.image}
                  onChange={(url) =>
                    setService((prev) => ({ ...prev, image: url }))
                  }
                  folder="services"
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
                    Active Service
                  </label>
                  <Switch
                    checked={service.active}
                    onCheckedChange={(checked) =>
                      setService((prev) => ({ ...prev, active: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Popular Service
                  </label>
                  <Switch
                    checked={service.popular}
                    onCheckedChange={(checked) =>
                      setService((prev) => ({ ...prev, popular: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Creating..." : "Create Service"}
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
