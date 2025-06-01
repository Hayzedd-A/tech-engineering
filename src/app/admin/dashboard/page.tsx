'use client';

import { useEffect, useState } from 'react';
import { Package, Wrench, FileText, MessageSquare, DollarSign, ShoppingCart } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import { AdminStats } from '@/lib/types';

export default function DashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/dashboard");
      const result = await response.json();

      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Total Products"
            value={stats.totalProducts}
            icon={Package}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Total Services"
            value={stats.totalServices}
            icon={Wrench}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Blog Posts"
            value={stats.totalBlogPosts}
            icon={FileText}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Testimonials"
            value={stats.totalTestimonials}
            icon={MessageSquare}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Recent Orders"
            value={stats.recentOrders}
            icon={ShoppingCart}
            trend={{ value: -3, isPositive: false }}
          />
          <StatsCard
            title="Monthly Revenue"
            value={`$${stats.monthlyRevenue.toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: 7, isPositive: true }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                New product "iPhone 14 Pro" added
              </span>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                Blog post "Phone Repair Tips" published
              </span>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                New testimonial pending approval
              </span>
              <span className="text-xs text-gray-400">6 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <Package className="h-5 w-5 text-blue-600 mb-2" />
              <div className="text-sm font-medium">Add Product</div>
            </button>
            <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <Wrench className="h-5 w-5 text-green-600 mb-2" />
              <div className="text-sm font-medium">Add Service</div>
            </button>
            <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <FileText className="h-5 w-5 text-purple-600 mb-2" />
              <div className="text-sm font-medium">Write Blog</div>
            </button>
            <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <MessageSquare className="h-5 w-5 text-orange-600 mb-2" />
              <div className="text-sm font-medium">View Reviews</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

