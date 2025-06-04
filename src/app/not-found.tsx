'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="relative -mt-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
          </div>
        </div>

        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg">
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need Help?
          </h3>
          <p className="text-gray-600 mb-4">
            If you're looking for repair services or have questions, we're here
            to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link href="/contact">
              <Button variant="outline" size="sm">
                Contact Us
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="sm">
                View Services
              </Button>
            </Link>
            <a href="tel:+15551234567">
              <Button variant="outline" size="sm">
                Call (555) 123-4567
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
