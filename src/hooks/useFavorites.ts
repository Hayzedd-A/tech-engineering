"use client";

import { useLocalStorage } from "./useLocalStarage";
import { useState, useEffect } from "react";

export function useFavorites() {
  const [favoriteProducts, setFavoriteProducts] = useLocalStorage<string[]>("favoriteProducts", []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addToFavorites = (productId: string) => {
    if (!favoriteProducts.includes(productId)) {
      const updatedFavorites = [...favoriteProducts, productId];
      setFavoriteProducts(updatedFavorites);
      
      // Show success message (optional)
      if (isClient && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('favoriteAdded', { 
          detail: { productId } 
        }));
      }
    }
  };

  const removeFromFavorites = (productId: string) => {
    const updatedFavorites = favoriteProducts.filter(id => id !== productId);
    setFavoriteProducts(updatedFavorites);
    
    // Show removal message (optional)
    if (isClient && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('favoriteRemoved', { 
        detail: { productId } 
      }));
    }
  };

  const toggleFavorite = (productId: string) => {
    if (favoriteProducts.includes(productId)) {
      removeFromFavorites(productId);
      return false; // removed
    } else {
      addToFavorites(productId);
      return true; // added
    }
  };

  const isFavorited = (productId: string) => {
    return favoriteProducts.includes(productId);
  };

  const getFavoriteCount = () => {
    return favoriteProducts.length;
  };

  const clearFavorites = () => {
    setFavoriteProducts([]);
    
    if (isClient && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('favoritesCleared'));
    }
  };

  const getFavoriteProducts = () => {
    return favoriteProducts;
  };

  return {
    favoriteProducts,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorited,
    getFavoriteCount,
    clearFavorites,
    getFavoriteProducts,
    isClient, // useful for preventing hydration issues
  };
}
