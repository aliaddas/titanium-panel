"use client";

import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Heart,
  Share2,
  ShoppingBag,
  Star,
  Check,
  ArrowLeft,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { getProductById, products } from "@/lib/products";
import { CornerSmoothing } from "@/components/corner-smoothing";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  product: any;
}

export const ProductDetailsComponent: React.FC<ProductDetailsProps> = ({
  product,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  // For variant products
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [selectedCombo, setSelectedCombo] = useState<any>(null);

  // Handle variant selection
  useEffect(() => {
    if (!product || !product.variantLists) return;

    // Initialize with first variant of each type
    const initialVariants: Record<string, string> = {};
    product.variantLists.forEach((list: any) => {
      if (list.variants && list.variants.length > 0) {
        initialVariants[list.type] = list.variants[0].ID;
      }
    });

    setSelectedVariants(initialVariants);
  }, [product]);

  // Find matching variant combo
  useEffect(() => {
    if (
      !product ||
      !product.variantCombos ||
      Object.keys(selectedVariants).length === 0
    )
      return;

    const combo = product.variantCombos.find((combo: any) => {
      // Check if all selected variants are in this combo
      return combo.variants.every((variant: any) => {
        const selectedVariantId = selectedVariants[variant.type];
        return selectedVariantId === variant.ID;
      });
    });

    setSelectedCombo(combo || null);
  }, [product, selectedVariants]);

  // Handle variant selection
  const handleVariantSelect = (type: string, variantId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [type]: variantId,
    }));
  };

  // Get variant name by ID
  const getVariantNameById = (type: string, id: string) => {
    if (!product || !product.variantLists) return "";

    const variantList = product.variantLists.find(
      (list: any) => list.type === type
    );
    if (!variantList) return "";

    const variant = variantList.variants.find((v: any) => v.ID === id);
    return variant ? variant.value : "";
  };

  // Handle quantity changes
  const incrementQuantity = () => {
    if (selectedCombo && quantity >= selectedCombo.quantity) return;
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Get related products (same category)
  const relatedProducts = product
    ? products
        .filter((p) => p.category === product.category && p.ID !== product.ID)
        .slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-[#1c2620] mt-2 pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button
            size={"md"}
            className="text-[#2c3e2e]/70 dark:text-white/70 hover:text-[#2c3e2e] dark:hover:text-white bg-accent"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            <CornerSmoothing
              radius={30}
              className="relative aspect-square mb-4 bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm border border-[#a8d5ba]/20 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={
                      product.imageURLs[currentImageIndex] || "/placeholder.svg"
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image Navigation */}
              {product.imageURLs.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm flex items-center justify-center text-[#2c3e2e] dark:text-white hover:bg-[#a8d5ba]/20 transition-colors z-10"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? product.imageURLs.length - 1 : prev - 1
                      )
                    }
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm flex items-center justify-center text-[#2c3e2e] dark:text-white hover:bg-[#a8d5ba]/20 transition-colors z-10"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === product.imageURLs.length - 1 ? 0 : prev + 1
                      )
                    }
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </CornerSmoothing>

            {/* Thumbnails */}
            {product.imageURLs.length > 1 && (
              <div className="flex gap-3 overflow-x-auto p-2">
                {product.imageURLs.map((image: string, index: number) => (
                  <CornerSmoothing
                    radius={12}
                    className={`relative h-20 w-20 overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? "border-[#a8d5ba] scale-105"
                        : "border-transparent opacity-70"
                    }`}
                  >
                    <button
                      key={index}
                      className={`h-full w-full overflow-hidden`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  </CornerSmoothing>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <CornerSmoothing
              radius={32}
              className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-6 md:p-8 border border-[#a8d5ba]/20"
            >
              {/* Category */}
              {product.category && (
                <Badge className="mb-3 bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-white border-[#a8d5ba]/30">
                  {product.category}
                </Badge>
              )}

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-[#2c3e2e] dark:text-white mb-2">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-4">
                {product.simplePrice ? (
                  <p className="text-2xl font-medium text-[#2c3e2e] dark:text-white">
                    ${product.simplePrice}
                  </p>
                ) : selectedCombo ? (
                  <p className="text-2xl font-medium text-[#2c3e2e] dark:text-white">
                    ${selectedCombo.price}
                  </p>
                ) : (
                  <p className="text-2xl font-medium text-[#2c3e2e] dark:text-white">
                    $
                    {/*product.variantCombos[0].price} - $
                    {
                      /*product.variantCombos[product.variantCombos.length - 1]
                        .price*/}
                  </p>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-[#d4af37]"
                      fill={star <= 4 ? "#d4af37" : "none"}
                    />
                  ))}
                </div>
                <span className="ml-2 text-[#2c3e2e]/70 dark:text-white/70">
                  4.0 (24 reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-[#2c3e2e]/80 dark:text-white/80 mb-8">
                {product.description}
              </p>

              {/* Variant Selection */}
              {product.variantLists && product.variantLists.length > 0 && (
                <div className="space-y-6 mb-8">
                  {product.variantLists.map((variantList: any) => (
                    <div key={variantList.ID}>
                      <h3 className="text-[#2c3e2e] dark:text-white font-medium mb-3 capitalize">
                        {variantList.type}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {variantList.variants.map((variant: any) => {
                          const isSelected =
                            selectedVariants[variantList.type] === variant.ID;

                          return (
                            <button
                              key={variant.ID}
                              className={`px-4 py-2 rounded-full border transition-all ${
                                isSelected
                                  ? "bg-[#a8d5ba] border-[#a8d5ba] text-[#2c3e2e]"
                                  : "bg-white/50 dark:bg-[#2c3e2e]/50 border-[#a8d5ba]/30 text-[#2c3e2e] dark:text-white hover:bg-[#a8d5ba]/20"
                              }`}
                              onClick={() =>
                                handleVariantSelect(
                                  variantList.type,
                                  variant.ID
                                )
                              }
                            >
                              <span className="flex items-center">
                                {isSelected && (
                                  <Check className="h-4 w-4 mr-1" />
                                )}
                                {variant.value}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center h-12 rounded-full border border-[#a8d5ba]/30 bg-white/50 dark:bg-[#2c3e2e]/50 px-2">
                  <button
                    onClick={decrementQuantity}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-[#2c3e2e] dark:text-white hover:bg-[#a8d5ba]/20"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-[#2c3e2e] dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-[#2c3e2e] dark:text-white hover:bg-[#a8d5ba]/20"
                    disabled={
                      selectedCombo && quantity >= selectedCombo.quantity
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  className="flex-1 bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e] h-12 rounded-full"
                  disabled={product.variantLists && !selectedCombo}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full border-[#a8d5ba]/30 text-[#2c3e2e] dark:text-white hover:bg-[#a8d5ba]/20"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? "fill-[#a8d5ba] text-[#a8d5ba]" : ""
                    }`}
                  />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full border-[#a8d5ba]/30 text-[#2c3e2e] dark:text-white hover:bg-[#a8d5ba]/20"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Availability */}
              {selectedCombo ? (
                <p className="text-[#2c3e2e]/80 dark:text-white/80 mb-4">
                  <span className="font-medium">Availability:</span>{" "}
                  {selectedCombo.quantity > 10
                    ? "In Stock"
                    : selectedCombo.quantity > 0
                    ? `Only ${selectedCombo.quantity} left in stock`
                    : "Out of Stock"}
                </p>
              ) : product.simplePrice ? (
                <p className="text-[#2c3e2e]/80 dark:text-white/80 mb-4">
                  <span className="font-medium">Availability:</span> In Stock
                </p>
              ) : null}

              {/* Selected Configuration */}
              {Object.keys(selectedVariants).length > 0 && selectedCombo && (
                <CornerSmoothing
                  radius={16}
                  className="p-4 bg-[#a8d5ba]/10 border border-[#a8d5ba]/20 mb-4"
                >
                  <p className="text-[#2c3e2e] dark:text-white font-medium mb-2">
                    Selected Configuration:
                  </p>
                  <ul className="space-y-1">
                    {Object.entries(selectedVariants).map(
                      ([type, variantId]) => (
                        <li
                          key={type}
                          className="text-[#2c3e2e]/80 dark:text-white/80 text-sm"
                        >
                          <span className="capitalize">{type}:</span>{" "}
                          {getVariantNameById(type, variantId)}
                        </li>
                      )
                    )}
                  </ul>
                </CornerSmoothing>
              )}
            </CornerSmoothing>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm border border-[#a8d5ba]/20 rounded-full p-1 w-full max-w-md mx-auto mb-6">
              <TabsTrigger
                value="details"
                className="rounded-full data-[state=active]:bg-[#a8d5ba] data-[state=active]:text-[#2c3e2e] text-[#2c3e2e] dark:text-white"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-full data-[state=active]:bg-[#a8d5ba] data-[state=active]:text-[#2c3e2e] text-[#2c3e2e] dark:text-white"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-full data-[state=active]:bg-[#a8d5ba] data-[state=active]:text-[#2c3e2e] text-[#2c3e2e] dark:text-white"
              >
                Shipping
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <CornerSmoothing
                radius={32}
                className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-6 md:p-8 border border-[#a8d5ba]/20"
              >
                <h2 className="text-xl font-medium text-[#2c3e2e] dark:text-white mb-4">
                  Product Details
                </h2>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem
                    value="description"
                    className="border-[#a8d5ba]/20"
                  >
                    <AccordionTrigger className="text-[#2c3e2e] dark:text-white hover:text-[#a8d5ba] dark:hover:text-[#a8d5ba]">
                      Description
                    </AccordionTrigger>
                    <AccordionContent className="text-[#2c3e2e]/80 dark:text-white/80">
                      <p className="mb-4">{product.description}</p>
                      <p>
                        Our products are crafted with the highest quality
                        ingredients, sourced ethically and sustainably. We
                        believe in transparency and quality, ensuring that every
                        product meets our exacting standards.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="ingredients"
                    className="border-[#a8d5ba]/20"
                  >
                    <AccordionTrigger className="text-[#2c3e2e] dark:text-white hover:text-[#a8d5ba] dark:hover:text-[#a8d5ba]">
                      Ingredients
                    </AccordionTrigger>
                    <AccordionContent className="text-[#2c3e2e]/80 dark:text-white/80">
                      <p>
                        All natural ingredients, ethically sourced and carefully
                        selected for their quality and efficacy. Our products
                        are free from harmful chemicals, parabens, and synthetic
                        fragrances.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="usage" className="border-[#a8d5ba]/20">
                    <AccordionTrigger className="text-[#2c3e2e] dark:text-white hover:text-[#a8d5ba] dark:hover:text-[#a8d5ba]">
                      How to Use
                    </AccordionTrigger>
                    <AccordionContent className="text-[#2c3e2e]/80 dark:text-white/80">
                      <p>
                        For best results, use as directed. Store in a cool, dry
                        place away from direct sunlight. Consult with a
                        healthcare professional if you have any specific
                        concerns or conditions.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CornerSmoothing>
            </TabsContent>

            <TabsContent value="reviews">
              <CornerSmoothing
                radius={32}
                className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-6 md:p-8 border border-[#a8d5ba]/20"
              >
                <h2 className="text-xl font-medium text-[#2c3e2e] dark:text-white mb-4">
                  Customer Reviews
                </h2>

                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-6 w-6 text-[#d4af37]"
                        fill={star <= 4 ? "#d4af37" : "none"}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-[#2c3e2e] dark:text-white font-medium">
                    4.0 out of 5
                  </span>
                  <span className="ml-2 text-[#2c3e2e]/70 dark:text-white/70">
                    (24 reviews)
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Sample Reviews */}
                  <div className="border-b border-[#a8d5ba]/20 pb-6">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium text-[#2c3e2e] dark:text-white">
                        Emily Johnson
                      </h3>
                      <span className="text-[#2c3e2e]/70 dark:text-white/70 text-sm">
                        2 weeks ago
                      </span>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 text-[#d4af37]"
                          fill={star <= 5 ? "#d4af37" : "none"}
                        />
                      ))}
                    </div>
                    <p className="text-[#2c3e2e]/80 dark:text-white/80">
                      Absolutely love this product! It exceeded my expectations
                      in every way. The quality is outstanding, and it has
                      become an essential part of my daily routine. Highly
                      recommend!
                    </p>
                  </div>

                  <div className="border-b border-[#a8d5ba]/20 pb-6">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium text-[#2c3e2e] dark:text-white">
                        Michael Thompson
                      </h3>
                      <span className="text-[#2c3e2e]/70 dark:text-white/70 text-sm">
                        1 month ago
                      </span>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 text-[#d4af37]"
                          fill={star <= 4 ? "#d4af37" : "none"}
                        />
                      ))}
                    </div>
                    <p className="text-[#2c3e2e]/80 dark:text-white/80">
                      Great product overall. The quality is excellent, and it
                      works as described. The only reason I'm not giving it 5
                      stars is that I wish it came in more size options.
                      Otherwise, very satisfied with my purchase.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium text-[#2c3e2e] dark:text-white">
                        Sarah Williams
                      </h3>
                      <span className="text-[#2c3e2e]/70 dark:text-white/70 text-sm">
                        2 months ago
                      </span>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 text-[#d4af37]"
                          fill={star <= 3 ? "#d4af37" : "none"}
                        />
                      ))}
                    </div>
                    <p className="text-[#2c3e2e]/80 dark:text-white/80">
                      The product is good, but I expected a bit more for the
                      price. The packaging is beautiful, and the quality is
                      decent, but I've used similar products that performed
                      better. It's still worth trying, especially if you're new
                      to this type of product.
                    </p>
                  </div>
                </div>

                <Button className="mt-8 bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e]">
                  Write a Review
                </Button>
              </CornerSmoothing>
            </TabsContent>

            <TabsContent value="shipping">
              <CornerSmoothing
                radius={32}
                className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-6 md:p-8 border border-[#a8d5ba]/20"
              >
                <h2 className="text-xl font-medium text-[#2c3e2e] dark:text-white mb-4">
                  Shipping & Returns
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-[#2c3e2e] dark:text-white mb-2">
                      Shipping Information
                    </h3>
                    <p className="text-[#2c3e2e]/80 dark:text-white/80">
                      We offer free standard shipping on all orders over $50.
                      Orders typically ship within 1-2 business days and arrive
                      within 3-5 business days. Express shipping options are
                      available at checkout.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-[#2c3e2e] dark:text-white mb-2">
                      Return Policy
                    </h3>
                    <p className="text-[#2c3e2e]/80 dark:text-white/80">
                      We accept returns within 30 days of delivery for unused
                      items in their original packaging. Please contact our
                      customer service team to initiate a return. Refunds will
                      be processed within 5-7 business days after we receive the
                      returned item.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-[#2c3e2e] dark:text-white mb-2">
                      International Shipping
                    </h3>
                    <p className="text-[#2c3e2e]/80 dark:text-white/80">
                      We ship to select international destinations.
                      International shipping rates and delivery times vary by
                      location. Please note that customers are responsible for
                      any customs fees or taxes that may apply to international
                      orders.
                    </p>
                  </div>
                </div>
              </CornerSmoothing>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#2c3e2e] dark:text-white mb-8 text-center">
              You May Also Like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.ID} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsComponent;
