"use client";

import { blogPost } from "@/lib/data";
import { BlogPostType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Calendar, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

function BlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      const result = await blogPost();
      if (result) setBlogPosts(result);
      setIsLoading(false);
    })();
  },[]);
  if (isLoading)
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <Card key={post._id} className="h-full flex flex-col">
          <div className="relative h-48">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          <CardHeader className="flex-grow">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.updatedAt).toLocaleTimeString()}
            </div>
            <CardTitle className="text-lg">{post.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link href={`/blog/${post._id}`}>
              <Button variant="outline" className="w-full">
                Read More
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default BlogPosts;
