import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Users, Clock, Star } from 'lucide-react';

export const metadata = {
  title: 'About Us - TechFix Pro',
  description: 'Learn about our experienced team and commitment to quality phone and gadget repair services.',
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About TechFix Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for professional phone and gadget repair
            services since 2014
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Meet Our Expert
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Hi, I'm Alex Johnson, the founder and lead technician at TechFix
              Pro. With over 10 years of experience in mobile device repair,
              I've dedicated my career to helping people get their devices back
              to perfect working condition.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              What started as a passion for understanding how technology works
              has evolved into a full-service repair shop that serves hundreds
              of satisfied customers every month. I believe in providing honest,
              transparent service with fair pricing and quality workmanship.
            </p>
            <p className="text-lg text-gray-600">
              When I'm not fixing phones, you can find me staying up-to-date
              with the latest technology trends and repair techniques to ensure
              we can handle any device that comes through our doors.
            </p>
          </div>
          <div className="relative h-96 lg:h-full">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"
              alt="Alex Johnson - TechFix Pro Owner"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-blue-600">
                10+
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Years of Experience</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-blue-600">
                5000+
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Devices Repaired</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Star className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-blue-600">
                4.9
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Average Rating</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-3xl font-bold text-blue-600">
                98%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Certifications */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Certifications & Training
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Apple Certified Technician</h4>
              <p className="text-sm text-gray-600">
                Authorized iPhone & iPad repair
              </p>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Samsung Certified</h4>
              <p className="text-sm text-gray-600">Galaxy device specialist</p>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Micro-soldering Expert</h4>
              <p className="text-sm text-gray-600">
                Board-level repair specialist
              </p>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Data Recovery Certified</h4>
              <p className="text-sm text-gray-600">
                Professional data recovery
              </p>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Business License</h4>
              <p className="text-sm text-gray-600">Fully licensed & insured</p>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold">Continuing Education</h4>
              <p className="text-sm text-gray-600">
                Always learning new techniques
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            At TechFix Pro, our mission is to provide fast, reliable, and
            affordable repair services while maintaining the highest standards
            of quality and customer satisfaction. We believe that everyone
            deserves access to professional repair services without breaking the
            bank, and we're committed to extending the life of your devices
            through expert craftsmanship and genuine care.
          </p>
        </div>
      </div>
    </div>
  );
}
