"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BlogPostType } from "@/lib/types";

interface FeaturedBlogProps {
  limit?: number;
}

function FeaturedBlog({ limit = 5 }: FeaturedBlogProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  const fetchFeaturedBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog?featured=true&limit=${limit}`);
      const data = await response.json();
      console.log(data.success)
      if (data.success) {
        setBlogPosts(data.data);
      } else {
        setError(data.error || "Failed to fetch blogs");
      }
      console.log("end of success try")
    } catch (err) {
      // setError("Failed to fetch featured blogs");
      console.error("Error fetching featured blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === blogPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? blogPosts.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (blogPosts.length > 1) {
      const interval = setInterval(nextSlide, 1000 * 10); // Change slide every 10 seconds
      return () => clearInterval(interval);
    }
  }, [blogPosts.length]);

  if (loading) {
    return (
      <div className="mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Blog Posts
          </h2>
          <div className="animate-pulse">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full bg-gray-300"></div>
                <div className="p-8">
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded mb-4"></div>
                  <div className="h-20 bg-gray-300 rounded mb-6"></div>
                  <div className="h-10 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log("error in jsx", error)
    return (
      <div className="mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Blog Posts
          </h2>
          <Card className="p-8">
            <p className="text-red-600">Error: {error}</p>
            <Button onClick={fetchFeaturedBlogs} className="mt-4">
              Try Again
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Blog Posts
          </h2>
          <Card className="p-8">
            <p className="text-gray-600">
              No featured blog posts available at the moment.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const currentBlog = blogPosts[currentIndex];

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Featured Blog Posts
        </h2>
        <p className="text-gray-600 mt-2">
          Stay updated with our latest insights and tips
        </p>
      </div>

      <div className="relative">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-full">
              <Image
                src={currentBlog.image}
                alt={currentBlog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(currentBlog.createdAt).toLocaleDateString()}
                <User className="h-4 w-4 ml-4 mr-2" />
                {currentBlog.author}
                
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {currentBlog.category}
                </span>
                {currentBlog.tags &&
                  currentBlog.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2">
                {currentBlog.title}
              </h2>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {currentBlog.excerpt}
              </p>

              <Link href={`/blog/${currentBlog._id}`}>
                <Button className="group">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Navigation Arrows */}
        {blogPosts.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10"
              aria-label="Previous blog post"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10"
              aria-label="Next blog post"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {blogPosts.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {blogPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-blue-600 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to blog post ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Blog Posts Grid Preview */}
      {/* {blogPosts.length > 1 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            More Featured Posts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1, 4).map((blog, index) => (
              <Card
                key={blog.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative h-48">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    {blog.date}
                    <span className="ml-2">•</span>
                    <span className="ml-2">{blog.readTime}</span>
                  </div>

                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mb-2 inline-block">
                    {blog.category}
                  </span>

                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                    {blog.title}
                  </h4>
                  <p className="text-gray-600 text-xs line-clamp-2 mb-3">
                    {blog.excerpt}
                  </p>

                  <Link href={`/blog/${blog.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Read More
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {blogPosts.length > 4 && (
            <div className="text-center mt-8">
              <Link href="/blog">
                <Button variant="outline">
                  View All Blog Posts
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
}

export default FeaturedBlog;

