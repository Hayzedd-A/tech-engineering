import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { BlogPostType } from "@/lib/types";

interface BlogCardProps {
  post: BlogPostType;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <div className="relative h-48">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>

      <CardHeader className="flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-2 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {post.date}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime}
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog/${post.id}`}>
          <Button variant="outline" className="w-full">
            Read More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
