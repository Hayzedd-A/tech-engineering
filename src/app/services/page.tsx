import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Repair Services - TechFix Pro",
  description:
    "Professional phone and gadget repair services including screen repair, battery replacement, water damage repair, and more.",
};

export default function ServicesPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Repair Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional repair services for all your devices with fast
            turnaround times and warranty included
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">90</span>
              </div>
              <h3 className="font-semibold mb-2">90-Day Warranty</h3>
              <p className="text-gray-600">
                All repairs come with our comprehensive warranty
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Fast Service</h3>
              <p className="text-gray-600">
                Most repairs completed while you wait
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="font-semibold mb-2">Quality Parts</h3>
              <p className="text-gray-600">
                We use only genuine and high-quality replacement parts
              </p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Repair Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Diagnosis</h3>
              <p className="text-gray-600">
                Free diagnostic to identify the issue
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Quote</h3>
              <p className="text-gray-600">
                Transparent pricing with no hidden fees
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Repair</h3>
              <p className="text-gray-600">Expert repair using quality parts</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Testing</h3>
              <p className="text-gray-600">Thorough testing before return</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Your Device Fixed?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact us today for a free diagnostic and quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Book a Repair</Button>
            </Link>
            <Link href="tel:+15551234567">
              <Button size="lg" variant="outline">
                Call (555) 123-4567
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
