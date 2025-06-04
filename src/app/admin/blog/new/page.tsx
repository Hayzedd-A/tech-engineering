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
import { BlogPostType } from "@/lib/types";

export default function NewBlogPostPage() {
  const [post, setPost] = useState<Partial<BlogPostType>>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Admin",
    image: "",
    tags: [],
    published: false,
    featured: false,
  });
  const [tags, setTags] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...post,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        publishedAt: post.published ? new Date().toISOString() : undefined,
      };

      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (result.success) {
        router.push("/admin/blog");
      } else {
        alert("Failed to create blog post: " + result.error);
      }
    } catch (error) {
      console.log(error)
      alert("Failed to create blog post");
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
        <h1 className="text-2xl font-bold text-gray-900">
          Create New Blog Post
        </h1>
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
                      setPost((prev) => ({ ...prev, title: e.target.value }))
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
                      setPost((prev) => ({ ...prev, excerpt: e.target.value }))
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
                      setPost((prev) => ({ ...prev, content: e.target.value }))
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
                        setPost((prev) => ({ ...prev, category: value }))
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
                        setPost((prev) => ({ ...prev, author: e.target.value }))
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
                    setPost((prev) => ({ ...prev, image: url }))
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
                      setPost((prev) => ({ ...prev, published: checked }))
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
                      setPost((prev) => ({ ...prev, featured: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Creating..." : "Create Post"}
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
