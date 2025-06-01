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
import { Service } from "@/lib/types";

interface EditServicePageProps {
  params: {
    id: string;
  };
}

export default function EditServicePage({ params }: EditServicePageProps) {
  const [service, setService] = useState<Service | null>(null);
  const [features, setFeatures] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchService();
  }, [params.id]);

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/admin/services/${params.id}`);
      const result = await response.json();

      if (result.success) {
        setService(result.data);
        setFeatures(result.data.features?.join("\n") || "");
      } else {
        alert("Service not found");
        router.push("/admin/services");
      }
    } catch (error) {
      console.error("Failed to fetch service:", error);
      router.push("/admin/services");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;

    setSaving(true);

    try {
      const serviceData = {
        ...service,
        features: features.split("\n").filter((feature) => feature.trim()),
      };

      const response = await fetch(`/api/admin/services/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/admin/services");
      } else {
        alert("Failed to update service: " + result.error);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update service");
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Service</h1>
        </div>
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-gray-500">Loading service...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            Service Not Found
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
        <h1 className="text-2xl font-bold text-gray-900">Edit Service</h1>
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
                      setService((prev) =>
                        prev ? { ...prev, name: e.target.value } : null
                      )
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
                        setService((prev) =>
                          prev ? { ...prev, price: e.target.value } : null
                        )
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
                        setService((prev) =>
                          prev ? { ...prev, duration: e.target.value } : null
                        )
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
                        setService((prev) =>
                          prev ? { ...prev, category: value } : null
                        )
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
                        <SelectItem value="hardware-repair">
                          Hardware Repair
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
                      setService((prev) =>
                        prev ? { ...prev, description: e.target.value } : null
                      )
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
                    setService((prev) =>
                      prev ? { ...prev, image: url } : null
                    )
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
                      setService((prev) =>
                        prev ? { ...prev, active: checked } : null
                      )
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
                      setService((prev) =>
                        prev ? { ...prev, popular: checked } : null
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
