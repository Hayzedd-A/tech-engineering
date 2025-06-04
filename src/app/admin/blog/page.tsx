'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DataTable from '@/components/admin/DataTable';
import { BlogPostType } from '@/lib/types';
import Image from 'next/image';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, [pagination.page]);

  const fetchPosts = async (search = "") => {
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search,
      });

      const response = await fetch(`/api/admin/blog?${params}`);
      const result = await response.json();

      if (result.success) {
        setPosts(result.data);
        setPagination(result.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (search: string) => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchPosts(search);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleEdit = (post: BlogPostType) => {
    router.push(`/admin/blog/${post.id}/edit`);
  };

  const handleDelete = async (post: BlogPostType) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await fetch(`/api/admin/blog/${post.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Failed to delete blog post:", error);
    }
  };

  const columns = [
    {
      key: "image" as keyof BlogPostType,
      label: "Image",
      render: (value: string) => (
        <div className="w-12 h-12 relative">
          <Image
            src={value || "/placeholder.jpg"}
            alt="Blog post"
            fill
            className="object-cover rounded"
          />
        </div>
      ),
    },
    {
      key: "title" as keyof BlogPostType,
      label: "Title",
      render: (value: string, post: BlogPostType) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{post.category}</div>
        </div>
      ),
    },
    {
      key: "author" as keyof BlogPostType,
      label: "Author",
    },
    {
      key: "publishedAt" as keyof BlogPostType,
      label: "Published",
      render: (value: string) => (
        <span className="text-sm">{new Date(value).toLocaleDateString()}</span>
      ),
    },
    {
      key: "published" as keyof BlogPostType,
      label: "Status",
      render: (value: boolean) => (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "Published" : "Draft"}
        </Badge>
      ),
    },
    {
      key: "featured" as keyof BlogPostType,
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
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
        <div className="bg-white rounded-lg border p-8 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <Button onClick={() => router.push("/admin/blog/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <DataTable
        data={posts}
        columns={columns}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search blog posts..."
      />
    </div>
  );
}

