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
import { BlogPostType } from "@/lib/types";

interface EditBlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [tags, setTags] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [postId, setPostId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const initializeParams = async () => {
      const resolvedParams = await params;
      setPostId(resolvedParams.id);
    };

    initializeParams();
  }, [params]);

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/blog/${postId}`);
      const result = await response.json();

      if (result.success) {
        setPost(result.data);
        setTags(result.data.tags?.join(", ") || "");
      } else {
        alert("Blog post not found");
        router.push("/admin/blog");
      }
    } catch (error) {
      console.error("Failed to fetch blog post:", error);
      router.push("/admin/blog");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    setSaving(true);

    try {
      const postData = {
        ...post,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        publishedAt:
          post.published && !post.publishedAt
            ? new Date().toISOString()
            : post.publishedAt,
      };

      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/admin/blog");
      } else {
        alert("Failed to update blog post: " + result.error);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update blog post");
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
        </div>
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-gray-500">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            Blog Post Not Found
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
        <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <Input
                    value={post.title}
                    onChange={(e) =>
                      setPost((prev) =>
                        prev ? { ...prev, title: e.target.value } : null
                      )
                    }
                    required
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt
                  </label>
                  <Textarea
                    value={post.excerpt}
                    onChange={(e) =>
                      setPost((prev) =>
                        prev ? { ...prev, excerpt: e.target.value } : null
                      )
                    }
                    rows={3}
                    placeholder="Brief description of the post"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content *
                  </label>
                  <Textarea
                    value={post.content}
                    onChange={(e) =>
                      setPost((prev) =>
                        prev ? { ...prev, content: e.target.value } : null
                      )
                    }
                    rows={15}
                    required
                    placeholder="Write your blog post content here..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <Select
                      value={post.category}
                      onValueChange={(value) =>
                        setPost((prev) =>
                          prev ? { ...prev, category: value } : null
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="repair-tips">Repair Tips</SelectItem>
                        <SelectItem value="device-reviews">
                          Device Reviews
                        </SelectItem>
                        <SelectItem value="industry-news">
                          Industry News
                        </SelectItem>
                        <SelectItem value="how-to">How To</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="troubleshooting">
                          Troubleshooting
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author
                    </label>
                    <Input
                      value={post.author}
                      onChange={(e) =>
                        setPost((prev) =>
                          prev ? { ...prev, author: e.target.value } : null
                        )
                      }
                      placeholder="Author name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma separated)
                  </label>
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="repair, smartphone, tips"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={post.image}
                  onChange={(url) =>
                    setPost((prev) => (prev ? { ...prev, image: url } : null))
                  }
                  folder="blog"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Publish Post
                  </label>
                  <Switch
                    checked={post.published}
                    onCheckedChange={(checked) =>
                      setPost((prev) =>
                        prev ? { ...prev, published: checked } : null
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Featured Post
                  </label>
                  <Switch
                    checked={post.featured}
                    onCheckedChange={(checked) =>
                      setPost((prev) =>
                        prev ? { ...prev, featured: checked } : null
                      )
                    }
                  />
                </div>
                {post.publishedAt && (
                  <div className="text-sm text-gray-500">
                    Published: {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                )}
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
