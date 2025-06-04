"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPostType } from "@/lib/types";
import { blogPost } from "@/lib/data";

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState("");
  const [mounted, setMounted] = useState(false);
  const [relatedPost, setRelatedPost] = useState<BlogPostType[]>([]);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const initializeParams = async () => {
      const resolvedParams = await params;
      setPostId(resolvedParams.id);
    };

    initializeParams();
  }, [params]);

  useEffect(() => {
    if (!postId || !mounted) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${postId}`);
        const result = await response.json();

        if (result?.data) {
          setPost(result.data);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    (async () => {
      const result = await blogPost();
      if (result) setRelatedPost(result);
    })();
    fetchPost();
  }, [postId, mounted]);

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid place-content-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <LoaderCircle className="h-8 w-8 animate-spin" />
              <p>Loading blog post...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            {post.publishedAt && (
              <time dateTime={post.publishedAt + ""}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            <User className="h-4 w-4 ml-4 mr-2" />
            {post.author}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          <div className="relative h-64 md:h-96 mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, "<br/>"),
            }}
          />
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Need Professional Help?
          </h3>
          <p className="text-gray-600 mb-6">
            If you're experiencing issues with your device, our expert
            technicians are here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Book a Repair</Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">
                View Our Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPost.length ? (
              relatedPost.slice(0,4).map((rPost) => {
                if (post._id !== rPost._id) {
                  return (
                    <div key={rPost._id} className="border rounded-lg overflow-hidden">
                      <div className="relative h-32">
                        <Image
                          src={rPost.image}
                          alt={rPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold mb-2">{rPost.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {rPost.excerpt}
                        </p>
                        <Link href={`/blog/${rPost._id}`}>
                          <Button variant="outline" size="sm">
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <>
                <p>No related post</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
