"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPostType } from "@/lib/types";
import { useEffect, useState } from "react";

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPostType>();
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState("")

  useEffect(() => {

    const initializeParams = async () => {
      const resolvedParams = await params;
      setPostId(resolvedParams.id);
    };

    initializeParams();
  }, [params])

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/blog/${postId}`);
      const result = await response.json();
      setLoading(false);
      if (result) setPost({...result, updatedAt: new Date(result.updatedAt).toLocaleDateString()});
    })();
  }, [postId]);

  if (!post) {
    notFound();
  }

  if (loading) {
    return (
      <div className="grid place-content-center">
        <LoaderCircle />
        <p>Loading blog, please wait...</p>
      </div>
    );
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
            {/* {`${post.updatedAt}`} */}
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
            {post && (
              <div key={post._id} className="border rounded-lg overflow-hidden">
                <div className="relative h-32">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">{post.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
                  <Link href={`/blog/${post._id}`}>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
