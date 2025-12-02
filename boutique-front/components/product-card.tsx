"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProductPriceRange } from "@/lib/products";
import { CornerSmoothing } from "@/components/corner-smoothing";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { min, max } = getProductPriceRange(product);
  const hasVariants = !product.simplePrice;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    hover: {
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <CornerSmoothing
        radius={24}
        className="relative bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#a8d5ba]/20"
      >
        {/* Product Image */}
        <Link
          href={`/products/${product.ID}`}
          className="block relative aspect-square overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#a8d5ba]/5 z-10"></div>
          <Image
            src={product.imageURLs[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm flex items-center justify-center text-[#2c3e2e] dark:text-white hover:bg-[#a8d5ba]/20 transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-[#a8d5ba] text-[#a8d5ba]" : ""
              }`}
            />
          </button>

          {/* Category Badge */}
          {product.category && (
            <Badge className="absolute top-4 left-4 z-20 bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm text-[#2c3e2e] dark:text-white border-[#a8d5ba]/30">
              {product.category}
            </Badge>
          )}
        </Link>

        {/* Product Info */}
        <div className="p-5">
          <Link href={`/products/${product.ID}`} className="block">
            <h3 className="text-lg font-medium text-[#2c3e2e] dark:text-white mb-1 truncate">
              {product.name}
            </h3>
            <p className="text-[#2c3e2e]/70 dark:text-white/70 text-sm line-clamp-2 mb-3 h-10">
              {product.description}
            </p>
          </Link>

          <div className="flex justify-between items-center">
            <div>
              {hasVariants ? (
                <p className="font-medium text-[#2c3e2e] dark:text-white">
                  $
                  {min === max
                    ? `${min.toFixed(2)}`
                    : `${min.toFixed(2)} - ${max.toFixed(2)}`}
                </p>
              ) : (
                <p className="font-medium text-[#2c3e2e] dark:text-white">
                  ${product.simplePrice}
                </p>
              )}
            </div>

            <Button
              size="sm"
              className="bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e]"
              onClick={() => {
                router.push(`/products/${product.ID}`);
              }}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              {hasVariants ? "Options" : "Add"}
            </Button>
          </div>
        </div>
      </CornerSmoothing>
    </motion.div>
  );
}
