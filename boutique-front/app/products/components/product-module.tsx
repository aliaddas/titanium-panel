"use client";
import { ProductType } from "@/types/data-types";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { ProductCard } from "@/components/product-card";
import { CornerSmoothing } from "@/components/corner-smoothing";
import { getAllCategories, getProductPriceRange } from "@/lib/products";

interface ProductModuleProps {
  products: ProductType[];
}

const ProductModule: React.FC<ProductModuleProps> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState("featured");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const categories = getAllCategories();

  // Filter products based on search, categories, and price range
  useEffect(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter((product) => {
      const { min, max } = getProductPriceRange(product);
      return min >= priceRange[0] && max <= priceRange[1];
    });

    // Sort products
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => {
        const priceA = getProductPriceRange(a).min;
        const priceB = getProductPriceRange(b).min;
        return priceA - priceB;
      });
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => {
        const priceA = getProductPriceRange(a).min;
        const priceB = getProductPriceRange(b).min;
        return priceB - priceA;
      });
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default: featured
      filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategories, priceRange, sortBy]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-[#1c2620] mt-2 pt-24 pb-16">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#a8d5ba]/30 dark:bg-[#a8d5ba]/20 z-10"></div>
        <Image
          src="/placeholder.svg?height=800&width=1600&text=Our+Products"
          alt="Products Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2c3e2e] dark:text-white mb-4">
              Promotions of the Month
            </h1>
            <p className="text-lg text-[#2c3e2e]/80 dark:text-white/80 max-w-2xl mx-auto px-4">
              Limited-time offers on our top products. Don't miss out—shop now
              and save big!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Search and Filter Bar */}
        <CornerSmoothing
          radius={16}
          className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-4 shadow-sm border border-[#a8d5ba]/20 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#2c3e2e]/50 dark:text-white/50" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm border-[#a8d5ba]/30 text-[#2c3e2e] dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#a8d5ba] text-[#2c3e2e] dark:text-white bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm"
                  >
                    <ChevronDown className="h-4 w-4 mr-2" />
                    {sortBy === "featured" && "Featured"}
                    {sortBy === "price-asc" && "Price: Low to High"}
                    {sortBy === "price-desc" && "Price: High to Low"}
                    {sortBy === "name" && "Name"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white/90 dark:bg-[#2c3e2e]/90 backdrop-blur-sm border-[#a8d5ba]/30"
                >
                  <DropdownMenuItem
                    onClick={() => setSortBy("featured")}
                    className="text-[#2c3e2e] dark:text-white hover:bg-[#a8d5ba]/10"
                  >
                    Featured
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("price-asc")}
                    className="text-[#2c3e2e] dark:text-white hover:bg-[#a8d5ba]/10"
                  >
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("price-desc")}
                    className="text-[#2c3e2e] dark:text-white hover:bg-[#a8d5ba]/10"
                  >
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy("name")}
                    className="text-[#2c3e2e] dark:text-white hover:bg-[#a8d5ba]/10"
                  >
                    Name
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="md:hidden border-[#a8d5ba] text-[#2c3e2e] dark:text-white bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full sm:max-w-md bg-[#f8f5f0] dark:bg-[#1c2620]"
                >
                  <SheetHeader>
                    <SheetTitle className="text-[#2c3e2e] dark:text-[#a8d5ba]">
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    {/* Categories */}
                    <div>
                      <h3 className="text-lg font-medium text-[#2c3e2e] dark:text-white mb-3">
                        Categories
                      </h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <Checkbox
                              id={`mobile-category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                              className="border-[#a8d5ba] data-[state=checked]:bg-[#a8d5ba] data-[state=checked]:text-[#2c3e2e]"
                            />
                            <label
                              htmlFor={`mobile-category-${category}`}
                              className="ml-2 text-[#2c3e2e] dark:text-white"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="text-lg font-medium text-[#2c3e2e] dark:text-white mb-3">
                        Price Range
                      </h3>
                      <Slider
                        defaultValue={[0, 100]}
                        max={100}
                        step={1}
                        value={priceRange}
                        onValueChange={(value) =>
                          setPriceRange(value as [number, number])
                        }
                        className="mb-6"
                      />
                      <div className="flex justify-between text-[#2c3e2e] dark:text-white">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>

                    <SheetClose asChild>
                      <Button className="w-full bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e]">
                        Apply Filters
                      </Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CornerSmoothing>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <CornerSmoothing
                radius={24}
                className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-6 border border-[#a8d5ba]/20"
              >
                <h3 className="text-lg font-medium text-[#2c3e2e] dark:text-white mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        className="border-[#a8d5ba] data-[state=checked]:bg-[#a8d5ba] data-[state=checked]:text-[#2c3e2e]"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-[#2c3e2e] dark:text-white"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </CornerSmoothing>

              {/* Price Range */}
              <CornerSmoothing
                radius={24}
                className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-6 border border-[#a8d5ba]/20"
              >
                <h3 className="text-lg font-medium text-[#2c3e2e] dark:text-white mb-4">
                  Price Range
                </h3>
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={(value) =>
                    setPriceRange(value as [number, number])
                  }
                  className="mb-6"
                />
                <div className="flex justify-between text-[#2c3e2e] dark:text-white">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </CornerSmoothing>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {(selectedCategories.length > 0 ||
              searchQuery ||
              priceRange[0] > 0 ||
              priceRange[1] < 100) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-white border-[#a8d5ba]/30 px-3 py-1"
                  >
                    {category}
                    <button
                      className="ml-2 text-[#2c3e2e]/70 dark:text-white/70 hover:text-[#2c3e2e] dark:hover:text-white"
                      onClick={() => toggleCategory(category)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 100) && (
                  <Badge
                    variant="outline"
                    className="bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-white border-[#a8d5ba]/30 px-3 py-1"
                  >
                    ${priceRange[0]} - ${priceRange[1]}
                    <button
                      className="ml-2 text-[#2c3e2e]/70 dark:text-white/70 hover:text-[#2c3e2e] dark:hover:text-white"
                      onClick={() => setPriceRange([0, 100])}
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {searchQuery && (
                  <Badge
                    variant="outline"
                    className="bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-white border-[#a8d5ba]/30 px-3 py-1"
                  >
                    "{searchQuery}"
                    <button
                      className="ml-2 text-[#2c3e2e]/70 dark:text-white/70 hover:text-[#2c3e2e] dark:hover:text-white"
                      onClick={() => setSearchQuery("")}
                    >
                      ×
                    </button>
                  </Badge>
                )}
                <Button
                  variant="link"
                  className="text-[#2c3e2e] dark:text-white hover:text-[#a8d5ba] dark:hover:text-[#a8d5ba] p-0 h-auto"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 100]);
                    setSearchQuery("");
                  }}
                >
                  Clear All
                </Button>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-[#2c3e2e]/70 dark:text-white/70">
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-[#2c3e2e] dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-[#2c3e2e]/70 dark:text-white/70 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  className="bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e]"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 100]);
                    setSearchQuery("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.ID} product={product} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModule;
