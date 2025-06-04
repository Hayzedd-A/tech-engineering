import { Button } from "@/components/ui/button";
import FeaturedBlog from "@/components/FeaturedBlog";
import BlogPosts from "@/components/BlogPosts";

export const metadata = {
  title: "Tech Tips Blog - TechFix Pro",
  description:
    "Expert tips and advice for maintaining and troubleshooting your devices.",
};

export default function BlogPage() {
  
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tech Tips & Advice
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tips and guides to help you get the most out of your devices
          </p>
        </div>

        {/* Featured Post */}
        <FeaturedBlog />

        {/* Blog Posts Grid */}
        <BlogPosts/>
        {/* Newsletter Signup */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6">
            Get the latest tech tips and repair advice delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
