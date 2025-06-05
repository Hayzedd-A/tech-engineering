"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Phone, Wrench, Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { getFavoriteCount, isClient } = useFavorites();
  
  const favoriteCount = getFavoriteCount();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return pathname.startsWith("/admin") ? null : (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Wrench className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TechFix Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button and Favorites */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Favorites Button */}
            <Link href="/favorites">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-5 w-5" />
                {isClient && favoriteCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {favoriteCount > 99 ? '99+' : favoriteCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {/* Book Repair Button */}
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Phone className="h-4 w-4 mr-2" />
                Book Repair
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Favorites Link */}
              <Link 
                href="/favorites" 
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Favorites
                </div>
                {isClient && favoriteCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {favoriteCount > 99 ? '99+' : favoriteCount}
                  </Badge>
                )}
              </Link>
              
              {/* Mobile Book Repair Button */}
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Book Repair
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
