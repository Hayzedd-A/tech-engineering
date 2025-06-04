'use client'

import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { ServiceType } from "@/lib/types";

// Loading skeleton component
function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

function Allservices() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/services");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result)
        if (result.success) {
          setServices(result.data || []);
        } else {
          throw new Error(result.message || "Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load services"
        );
      } finally {
        setIsLoading(false);
      }
    };

    getServices();
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <p className="text-lg font-semibold">Error loading services</p>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {isLoading ? (
        // Loading skeleton
        Array.from({ length: 6 }).map((_, index) => (
          <ServiceCardSkeleton key={index} />
        ))
      ) : services.length > 0 ? (
        // Actual services
        services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))
      ) : (
        // Empty state
        <div className="col-span-full text-center py-12">
          <div className="text-gray-500">
            <p className="text-lg font-semibold mb-2">No services available</p>
            <p className="text-sm">Check back later for available services.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Allservices;
