"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/admin/DataTable";
import { ServiceType } from "@/lib/types";
import Image from "next/image";

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchServices();
  }, [pagination.page]);

  const fetchServices = async (search = "") => {
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search,
      });

      const response = await fetch(`/api/admin/services?${params}`);
      const result = await response.json();

      if (result.success) {
        setServices(result.data);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (search: string) => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchServices(search);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleEdit = (service: ServiceType) => {
    router.push(`/admin/services/${service._id}/edit`);
  };

  const handleDelete = async (service: ServiceType) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`/api/admin/services/${service._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const columns = [
    {
      key: "image" as keyof ServiceType,
      label: "Image",
      render: (value: string) => (
        <div className="w-12 h-12 relative">
          <Image
            src={value || "/placeholder.jpg"}
            alt="Service"
            fill
            className="object-cover rounded"
          />
        </div>
      ),
    },
    {
      key: "name" as keyof ServiceType,
      label: "Service Name",
      render: (value: string, service: ServiceType) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{service.category}</div>
        </div>
      ),
    },
    {
      key: "price" as keyof ServiceType,
      label: "Price",
    },
    {
      key: "duration" as keyof ServiceType,
      label: "Duration",
    },
    {
      key: "active" as keyof ServiceType,
      label: "Status",
      render: (value: boolean) => (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "popular" as keyof ServiceType,
      label: "Popular",
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
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
        <div className="bg-white rounded-lg border p-8 text-center">
          <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <Button onClick={() => router.push("/admin/services/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <DataTable
        data={services}
        columns={columns}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search services..."
      />
    </div>
  );
}
