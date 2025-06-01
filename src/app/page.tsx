import { Phone, ShoppingBag, Wrench, Clock, Shield } from "lucide-react";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}

      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/phone-banner.jpeg"
            alt="Phone repair background"
            fill
            className="object-cover scale-105"
            priority
          />
        </div>

        {/* Multiple Overlay Layers for Better Text Visibility */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-transparent to-blue-900/70 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-10"></div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="backdrop-blur-sm bg-black/20 p-8 rounded-2xl border border-white/20">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl text-shadow-lg">
                Professional Phone & Gadget Repair
              </h1>
              <p className="text-xl mb-8 text-blue-100 drop-shadow-lg">
                Expert repair services with over 10 years of experience. Fast,
                reliable, and affordable repairs with warranty included.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Book a Repair
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 backdrop-blur-md bg-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-96 lg:h-full">
              <Image
                src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600"
                alt="Phone repair service"
                fill
                className="object-cover rounded-lg shadow-2xl border border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose TechFix Pro?
            </h2>
            <p className="text-lg text-gray-600">
              We provide the best repair services in town
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Fast Service</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Most repairs completed within 30-60 minutes while you wait.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>90-Day Warranty</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  All repairs come with a comprehensive 90-day warranty.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Wrench className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Expert Technicians</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Certified professionals with over 10 years of experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-blue-600 text-white">
              <CardContent className="p-8">
                <Wrench className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Repair Services</h3>
                <p className="mb-6">
                  Screen repairs, battery replacements, water damage fixes, and
                  more.
                </p>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    View All Services
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-green-600 text-white">
              <CardContent className="p-8">
                <ShoppingBag className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Device Shop</h3>
                <p className="mb-6">
                  Quality refurbished phones and gadgets at competitive prices.
                </p>
                <Link href="/shop">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-green-600"
                  >
                    Browse Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Check out our latest devices for sale
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/shop">
              <Button size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Don&apos;t just take our word for it
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Fix Your Device?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get a free quote today and experience our professional repair
            services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Get Free Quote
              </Button>
            </Link>
            <Link href="tel:+15551234567">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Call Now: (555) 123-4567
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
