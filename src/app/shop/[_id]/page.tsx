"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2, Loader2 } from "lucide-react";
import { ProductType } from "@/lib/types";
// import { useLocalStorage } from "@/hooks/useLocalStarage";
import { useFavorites } from "@/hooks/useFavorites";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { isFavorited, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params._id}`);
        const result = await response.json();

        if (result.success) {
          setProduct(result.data);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params._id) {
      fetchProduct();
    }
  }, [params._id]);

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const shareToSocial = async (platform: string) => {
    if (!product) return;

    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(`${product.name} - TechFix Pro`);
    const shareText = encodeURIComponent(
      `Check out this ${product.brand} ${
        product.name
      } for ₦${product.price.toLocaleString()}`
    );

    let url = "";

    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${shareText}%20${shareUrl}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${shareUrl}&text=${shareText}`;
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert("Link copied to clipboard!");
          setShowShareMenu(false);
          return;
        } catch (error) {
          console.error("Copy failed:", error);
          return;
        }
      case "native":
        try {
          if (navigator.share) {
            await navigator.share({
              title: decodeURIComponent(shareTitle),
              text: decodeURIComponent(shareText),
              url: window.location.href,
            });
            setShowShareMenu(false);
            return;
          }
        } catch (error) {
          console.error("Native share failed:", error);
          return;
        }
        break;
    }

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      setShowShareMenu(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading product...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist or is no longer
            available.
          </p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  // const handleAddToCart = () => {
  //   // TODO: Implement cart functionality
  //   console.log("Add to cart:", { product, quantity });
  //   alert("Product added to cart!");
  // };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-blue-600">
                  Featured
                </Badge>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded border-2 transition-colors ${
                      selectedImage === index
                        ? "border-blue-600"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">{product.brand}</Badge>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            <Separator />

            <div className="space-y-4 flex flex-col md:flex-row justify-between gap-1">
              <div className="right">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-blue-600">
                    ₦{product.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                  {product.inStock && (
                    <span className="text-sm text-gray-600">
                      {product.stockQuantity} available
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  variant={"outline"}
                  onClick={() => toggleFavorite(product._id)}
                  size="lg"
                  // className={
                  //   isFavorited ? "bg-red-500 hover:bg-red-600 text-white" : ""
                  // }
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorited(product._id) ? "fill-current" : ""
                    }`}
                  />
                </Button>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleShare}
                    title="Share product"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>

                  {showShareMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          onClick={() => shareToSocial("native")}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Share via...
                        </button>

                        <button
                          onClick={() => shareToSocial("whatsapp")}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          WhatsApp
                        </button>
                        <button
                          onClick={() => shareToSocial("twitter")}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Twitter
                        </button>
                        <button
                          onClick={() => shareToSocial("facebook")}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Facebook
                        </button>
                        <button
                          onClick={() => shareToSocial("telegram")}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Telegram
                        </button>
                        <button
                          onClick={() => shareToSocial("copy")}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Copy Link
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* <Separator /> */}

            {/* Quantity and Add to Cart */}
            {product.inStock && (
              <div className="space-y-4">
                {/* <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium">Quantity:</label>
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x">{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity(
                          Math.min(product.stockQuantity, quantity + 1)
                        )
                      }
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div> */}

                {/* <Button
                    onClick={handleAddToCart}
                    className="flex-1"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                    </Button> */}
              </div>
            )}

            {/* Specifications */}
            {product.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Specifications
                    </h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          {Object.entries(product.specifications).map(
                            ([key, value]) => (
                              <div key={key} className="flex justify-between">
                                {/* <span className="font-medium capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}:
                                </span> */}
                                <span className="text-gray-600">{value}</span>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
