"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  User,
  Star,
  Calendar,
  Bookmark,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CornerSmoothing } from "@/components/corner-smoothing";

// Mock data for forum posts
const forumPosts = [
  {
    id: 1,
    title: "My experience with the Wellness Tincture",
    content:
      "I've been using the Wellness Tincture for about a month now, and I'm absolutely loving the results. It's helped me with my sleep quality and overall sense of calm throughout the day.",
    author: {
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Wellness",
    product: "Wellness Tincture",
    likes: 24,
    comments: 8,
    shares: 3,
    date: "2 days ago",
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
  },
  {
    id: 2,
    title: "Review: Luxury Bath Bombs",
    content:
      "The Luxury Bath Bombs are a game-changer for my self-care routine. The lavender scent is perfect for unwinding after a long day, and they leave my skin feeling incredibly soft.",
    author: {
      name: "Michael Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Bath & Body",
    product: "Luxury Bath Bombs",
    likes: 18,
    comments: 5,
    shares: 2,
    date: "3 days ago",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4,
  },
  {
    id: 3,
    title: "Artisanal Chocolates - Worth Every Penny",
    content:
      "I treated myself to the Artisanal Chocolate Collection last weekend, and I'm still thinking about them! The flavor combinations are unique and sophisticated. Definitely ordering more for gifts.",
    author: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Edibles",
    product: "Artisanal Chocolate Collection",
    likes: 32,
    comments: 12,
    shares: 7,
    date: "1 week ago",
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
  },
  {
    id: 4,
    title: "Disappointed with the Facial Serum",
    content:
      "I had high hopes for the Rejuvenating Facial Serum, but after two weeks of use, I haven't noticed any significant difference in my skin. The packaging is beautiful, but the product itself is underwhelming for the price point.",
    author: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Skincare",
    product: "Rejuvenating Facial Serum",
    likes: 7,
    comments: 15,
    shares: 1,
    date: "5 days ago",
    image: "/placeholder.svg?height=300&width=400",
    rating: 2,
  },
  {
    id: 5,
    title: "The Perfect Gift Set",
    content:
      "I purchased the Relaxation Gift Set for my mother's birthday, and she absolutely loved it! The presentation was elegant, and each item was of exceptional quality. Will definitely be shopping here again for special occasions.",
    author: {
      name: "Jessica Miller",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Gift Sets",
    product: "Relaxation Gift Set",
    likes: 29,
    comments: 6,
    shares: 8,
    date: "2 weeks ago",
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
  },
  {
    id: 6,
    title: "Elegant Candle Collection",
    content:
      "The Seasonal Scent Candle Collection has transformed my living space. Each candle burns evenly and the scents are subtle yet noticeable. The glass containers are also beautiful enough to repurpose after the candle is finished.",
    author: {
      name: "Robert Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Home",
    product: "Seasonal Scent Candle Collection",
    likes: 15,
    comments: 4,
    shares: 2,
    date: "1 week ago",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4,
  },
];

// Categories for the forum
const categories = [
  { name: "All", count: 24 },
  { name: "Wellness", count: 8 },
  { name: "Bath & Body", count: 5 },
  { name: "Skincare", count: 4 },
  { name: "Edibles", count: 3 },
  { name: "Home", count: 2 },
  { name: "Gift Sets", count: 2 },
];

export default function CommunityPage() {
  const [currentView, setCurrentView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const postsPerPage = 6;
  const totalPages = Math.ceil(forumPosts.length / postsPerPage);

  // Filter posts based on category and search query
  const filteredPosts = forumPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort posts based on selected sort option
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "newest") return b.id - a.id;
    if (sortBy === "popular") return b.likes - a.likes;
    if (sortBy === "discussed") return b.comments - a.comments;
    return 0;
  });

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-[#1c2620] transition-colors duration-300 mt-2">
      {/* Community Forum */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#2c3e2e] dark:text-[#f8f5f0] mb-4">
                  Community Forum
                </h2>
                <p className="text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 mb-4">
                  Join our community of enthusiasts to share experiences and
                  discover new products.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e]">
                      <Plus className="h-4 w-4 mr-2" /> New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-[#f8f5f0] dark:bg-[#1c2620]">
                    <DialogHeader>
                      <DialogTitle className="text-[#2c3e2e] dark:text-[#f8f5f0]">
                        Create a New Post
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label
                          htmlFor="title"
                          className="text-[#2c3e2e] dark:text-[#f8f5f0] font-medium"
                        >
                          Title
                        </label>
                        <Input
                          id="title"
                          placeholder="Enter a title for your post"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="product"
                          className="text-[#2c3e2e] dark:text-[#f8f5f0] font-medium"
                        >
                          Product
                        </label>
                        <Input
                          id="product"
                          placeholder="Which product are you discussing?"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="category"
                          className="text-[#2c3e2e] dark:text-[#f8f5f0] font-medium"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select a category</option>
                          {categories.map(
                            (category) =>
                              category.name !== "All" && (
                                <option
                                  key={category.name}
                                  value={category.name}
                                >
                                  {category.name}
                                </option>
                              )
                          )}
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="content"
                          className="text-[#2c3e2e] dark:text-[#f8f5f0] font-medium"
                        >
                          Content
                        </label>
                        <Textarea
                          id="content"
                          placeholder="Share your experience..."
                          rows={5}
                        />
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="image"
                          className="text-[#2c3e2e] dark:text-[#f8f5f0] font-medium"
                        >
                          Add Image (optional)
                        </label>
                        <Input id="image" type="file" />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-[#2c3e2e] dark:text-[#f8f5f0] font-medium">
                          Rating
                        </label>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-5 w-5 text-[#d4af37] cursor-pointer"
                              fill="#d4af37"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e]">
                        Post
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <CornerSmoothing
                radius={16}
                className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-4 shadow-sm border border-[#a8d5ba]/20"
              >
                <h3 className="font-medium text-[#2c3e2e] dark:text-[#f8f5f0] mb-3">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left flex justify-between items-center py-1 px-2 rounded-md transition-colors ${
                          selectedCategory === category.name
                            ? "bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-[#f8f5f0] font-medium"
                            : "hover:bg-[#a8d5ba]/10 text-[#2c3e2e]/80 dark:text-[#f8f5f0]/80"
                        }`}
                      >
                        <span>{category.name}</span>
                        <Badge
                          variant="outline"
                          className="bg-[#a8d5ba]/10 text-[#2c3e2e] dark:text-[#f8f5f0]"
                        >
                          {category.count}
                        </Badge>
                      </button>
                    </li>
                  ))}
                </ul>
              </CornerSmoothing>

              <CornerSmoothing
                radius={16}
                className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-4 shadow-sm border border-[#a8d5ba]/20"
              >
                <h3 className="font-medium text-[#2c3e2e] dark:text-[#f8f5f0] mb-3">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/30 cursor-pointer">
                    #wellness
                  </Badge>
                  <Badge className="bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/30 cursor-pointer">
                    #selfcare
                  </Badge>
                  <Badge className="bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/30 cursor-pointer">
                    #organic
                  </Badge>
                  <Badge className="bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/30 cursor-pointer">
                    #luxury
                  </Badge>
                  <Badge className="bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/30 cursor-pointer">
                    #artisanal
                  </Badge>
                  <Badge className="bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/30 cursor-pointer">
                    #natural
                  </Badge>
                </div>
              </CornerSmoothing>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filters and Search */}
            <CornerSmoothing
              radius={16}
              className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-4 shadow-sm border border-[#a8d5ba]/20 mb-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#2c3e2e]/50 dark:text-[#f8f5f0]/50" />
                  <Input
                    placeholder="Search discussions..."
                    className="pl-10 bg-white dark:bg-[#2c3e2e] text-[#2c3e2e] dark:text-[#f8f5f0] border-[#a8d5ba]/30"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                <div className="flex gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-[#a8d5ba] text-[#2c3e2e] dark:text-[#f8f5f0] bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm"
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        {sortBy === "newest"
                          ? "Newest"
                          : sortBy === "popular"
                          ? "Most Popular"
                          : "Most Discussed"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-white/90 dark:bg-[#2c3e2e]/90 backdrop-blur-sm border-[#a8d5ba]/30"
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          setSortBy("newest");
                          setCurrentPage(1);
                        }}
                        className="text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/10"
                      >
                        Newest
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSortBy("popular");
                          setCurrentPage(1);
                        }}
                        className="text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/10"
                      >
                        Most Popular
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSortBy("discussed");
                          setCurrentPage(1);
                        }}
                        className="text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/10"
                      >
                        Most Discussed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="flex border rounded-md overflow-hidden">
                    <button
                      className={`px-3 py-2 ${
                        currentView === "grid"
                          ? "bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-[#f8f5f0]"
                          : "bg-white dark:bg-[#2c3e2e] text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:bg-[#a8d5ba]/10"
                      }`}
                      onClick={() => setCurrentView("grid")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>
                    </button>
                    <button
                      className={`px-3 py-2 ${
                        currentView === "masonry"
                          ? "bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-[#f8f5f0]"
                          : "bg-white dark:bg-[#2c3e2e] text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:bg-[#a8d5ba]/10"
                      }`}
                      onClick={() => setCurrentView("masonry")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="6" />
                        <rect x="3" y="15" width="18" height="6" />
                        <rect x="3" y="9" width="6" height="6" />
                        <rect x="9" y="9" width="12" height="6" />
                      </svg>
                    </button>
                    <button
                      className={`px-3 py-2 ${
                        currentView === "list"
                          ? "bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-[#f8f5f0]"
                          : "bg-white dark:bg-[#2c3e2e] text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:bg-[#a8d5ba]/10"
                      }`}
                      onClick={() => setCurrentView("list")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </CornerSmoothing>

            {/* Tabs for different views */}
            <Tabs defaultValue="discussions" className="mb-6">
              <TabsList className="bg-[#a8d5ba]/10 p-1">
                <TabsTrigger
                  value="discussions"
                  className="data-[state=active]:bg-[#a8d5ba]/30 data-[state=active]:text-[#2c3e2e] dark:data-[state=active]:text-[#f8f5f0] data-[state=active]:shadow-none text-[#2c3e2e] dark:text-[#f8f5f0]"
                >
                  Discussions
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-[#a8d5ba]/30 data-[state=active]:text-[#2c3e2e] dark:data-[state=active]:text-[#f8f5f0] data-[state=active]:shadow-none text-[#2c3e2e] dark:text-[#f8f5f0]"
                >
                  Product Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="questions"
                  className="data-[state=active]:bg-[#a8d5ba]/30 data-[state=active]:text-[#2c3e2e] dark:data-[state=active]:text-[#f8f5f0] data-[state=active]:shadow-none text-[#2c3e2e] dark:text-[#f8f5f0]"
                >
                  Questions & Answers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="discussions" className="mt-4">
                {/* Grid View */}
                {currentView === "grid" && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <AnimatePresence>
                      {currentPosts.map((post) => (
                        <motion.div
                          key={post.id}
                          variants={itemVariants}
                          layout
                        >
                          <CornerSmoothing
                            radius={16}
                            className="h-full bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm border border-[#a8d5ba]/20 hover:border-[#a8d5ba]/50 transition-all hover:shadow-md"
                          >
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage
                                      src={
                                        post.author.avatar || "/placeholder.svg"
                                      }
                                      alt={post.author.name}
                                    />
                                    <AvatarFallback>
                                      {post.author.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-[#2c3e2e] dark:text-[#f8f5f0]">
                                      {post.author.name}
                                    </div>
                                    <div className="text-xs text-[#2c3e2e]/60 dark:text-[#f8f5f0]/60 flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {post.date}
                                    </div>
                                  </div>
                                </div>
                                <Badge className="bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/30">
                                  {post.category}
                                </Badge>
                              </div>
                              <div className="mt-3">
                                <h3 className="text-lg font-semibold text-[#2c3e2e] dark:text-[#f8f5f0]">
                                  {post.title}
                                </h3>
                                <div className="text-sm text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 mt-1">
                                  Product: {post.product}
                                </div>
                                <div className="flex mt-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-4 w-4"
                                      fill={
                                        i < post.rating ? "#d4af37" : "none"
                                      }
                                      stroke={
                                        i < post.rating ? "#d4af37" : "#d4af37"
                                      }
                                    />
                                  ))}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-3">
                              {post.image && (
                                <div className="mb-3 rounded-md overflow-hidden">
                                  <Image
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    width={400}
                                    height={200}
                                    className="w-full h-40 object-cover"
                                  />
                                </div>
                              )}
                              <p className="text-[#2c3e2e]/80 dark:text-[#f8f5f0]/80 line-clamp-3">
                                {post.content}
                              </p>
                            </CardContent>
                            <CardFooter>
                              <div className="flex justify-between items-center w-full">
                                <div className="flex gap-4">
                                  <button className="flex items-center gap-1 text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                                    <Heart className="h-4 w-4" />
                                    <span className="text-xs">
                                      {post.likes}
                                    </span>
                                  </button>
                                  <button className="flex items-center gap-1 text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                                    <MessageCircle className="h-4 w-4" />
                                    <span className="text-xs">
                                      {post.comments}
                                    </span>
                                  </button>
                                  <button className="flex items-center gap-1 text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                                    <Share2 className="h-4 w-4" />
                                    <span className="text-xs">
                                      {post.shares}
                                    </span>
                                  </button>
                                </div>
                                <button className="text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                                  <Bookmark className="h-4 w-4" />
                                </button>
                              </div>
                            </CardFooter>
                          </CornerSmoothing>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Masonry View */}
                {currentView === "masonry" && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="columns-1 md:columns-2 gap-6 space-y-6"
                  >
                    <AnimatePresence>
                      {currentPosts.map((post) => (
                        <motion.div
                          key={post.id}
                          variants={itemVariants}
                          className="break-inside-avoid mb-6"
                        >
                          <CornerSmoothing
                            radius={16}
                            className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm border border-[#a8d5ba]/20 hover:border-[#a8d5ba]/50 transition-all hover:shadow-md"
                          >
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage
                                      src={
                                        post.author.avatar || "/placeholder.svg"
                                      }
                                      alt={post.author.name}
                                    />
                                    <AvatarFallback>
                                      {post.author.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-[#2c3e2e] dark:text-[#f8f5f0]">
                                      {post.author.name}
                                    </div>
                                    <div className="text-xs text-[#2c3e2e]/60 dark:text-[#f8f5f0]/60 flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {post.date}
                                    </div>
                                  </div>
                                </div>
                                <Badge className="bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/30">
                                  {post.category}
                                </Badge>
                              </div>
                              <div className="mt-3">
                                <h3 className="text-lg font-semibold text-[#2c3e2e] dark:text-[#f8f5f0]">
                                  {post.title}
                                </h3>
                                <div className="text-sm text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 mt-1">
                                  Product: {post.product}
                                </div>
                                <div className="flex mt-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-4 w-4"
                                      fill={
                                        i < post.rating ? "#d4af37" : "none"
                                      }
                                      stroke={
                                        i < post.rating ? "#d4af37" : "#d4af37"
                                      }
                                    />
                                  ))}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-3">
                              {post.image && (
                                <div className="mb-3 rounded-md overflow-hidden">
                                  <Image
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    width={400}
                                    height={200}
                                    className="w-full h-auto object-cover"
                                  />
                                </div>
                              )}
                              <p className="text-[#2c3e2e]/80 dark:text-[#f8f5f0]/80">
                                {post.content}
                              </p>
                            </CardContent>
                            <CardFooter>
                              <div className="flex justify-between items-center w-full">
                                <div className="flex gap-4">
                                  <button className="flex items-center gap-1 text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                                    <Heart className="h-4 w-4" />
                                    <span className="text-xs">
                                      {post.likes}
                                    </span>
                                  </button>
                                  <button className="flex items-center gap-1 text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                                    <MessageCircle className="h-4 w-4" />
                                    <span className="text-xs">
                                      {post.comments}
                                    </span>
                                  </button>
                                  <button className="flex items-center gap-1 text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                                    <Share2 className="h-4 w-4" />
                                    <span className="text-xs">
                                      {post.shares}
                                    </span>
                                  </button>
                                </div>
                                <button className="text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                                  <Bookmark className="h-4 w-4" />
                                </button>
                              </div>
                            </CardFooter>
                          </CornerSmoothing>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* List View */}
                {currentView === "list" && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    <AnimatePresence>
                      {currentPosts.map((post) => (
                        <motion.div key={post.id} variants={itemVariants}>
                          <CornerSmoothing
                            radius={16}
                            className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm border border-[#a8d5ba]/20 hover:border-[#a8d5ba]/50 transition-all hover:shadow-md"
                          >
                            <div className="flex flex-col md:flex-row">
                              {post.image && (
                                <div className="md:w-1/4 shrink-0">
                                  <Image
                                    src={post.image || "/placeholder.svg"}
                                    alt={post.title}
                                    width={300}
                                    height={200}
                                    className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                                  />
                                </div>
                              )}
                              <div className="flex-1 p-6">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex items-center gap-3">
                                    <Avatar>
                                      <AvatarImage
                                        src={
                                          post.author.avatar ||
                                          "/placeholder.svg"
                                        }
                                        alt={post.author.name}
                                      />
                                      <AvatarFallback>
                                        {post.author.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium text-[#2c3e2e] dark:text-[#f8f5f0]">
                                        {post.author.name}
                                      </div>
                                      <div className="text-xs text-[#2c3e2e]/60 dark:text-[#f8f5f0]/60 flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {post.date}
                                      </div>
                                    </div>
                                  </div>
                                  <Badge className="bg-[#a8d5ba]/20 text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/30">
                                    {post.category}
                                  </Badge>
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-[#2c3e2e] dark:text-[#f8f5f0] mb-1">
                                    {post.title}
                                  </h3>
                                  <div className="text-sm text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 mb-1">
                                    Product: {post.product}
                                  </div>
                                  <div className="flex mb-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className="h-4 w-4"
                                        fill={
                                          i < post.rating ? "#d4af37" : "none"
                                        }
                                        stroke={
                                          i < post.rating
                                            ? "#d4af37"
                                            : "#d4af37"
                                        }
                                      />
                                    ))}
                                  </div>
                                  <p className="text-[#2c3e2e]/80 dark:text-[#f8f5f0]/80 line-clamp-2 mb-4">
                                    {post.content}
                                  </p>
                                  <div className="flex justify-between items-center">
                                    <div className="flex gap-4">
                                      <button className="flex items-center gap-1 text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                                        <Heart className="h-4 w-4" />
                                        <span className="text-xs">
                                          {post.likes}
                                        </span>
                                      </button>
                                      <button className="flex items-center gap-1 text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                                        <MessageCircle className="h-4 w-4" />
                                        <span className="text-xs">
                                          {post.comments}
                                        </span>
                                      </button>
                                      <button className="flex items-center gap-1 text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                                        <Share2 className="h-4 w-4" />
                                        <span className="text-xs">
                                          {post.shares}
                                        </span>
                                      </button>
                                    </div>
                                    <button className="text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                                      <Bookmark className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CornerSmoothing>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="border-[#a8d5ba] text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/10"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <Button
                          key={index}
                          variant={
                            currentPage === index + 1 ? "default" : "outline"
                          }
                          onClick={() => paginate(index + 1)}
                          className={
                            currentPage === index + 1
                              ? "bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e]"
                              : "border-[#a8d5ba] text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/10"
                          }
                        >
                          {index + 1}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          paginate(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="border-[#a8d5ba] text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/10"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <CornerSmoothing
                  radius={16}
                  className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-8 shadow-sm border border-[#a8d5ba]/20 text-center"
                >
                  <h3 className="text-xl font-medium text-[#2c3e2e] dark:text-[#f8f5f0] mb-2">
                    Product Reviews
                  </h3>
                  <p className="text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 mb-4">
                    Discover detailed reviews of our products from our community
                    members.
                  </p>
                  <Button className="bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e]">
                    Browse Reviews
                  </Button>
                </CornerSmoothing>
              </TabsContent>
              <TabsContent value="questions" className="mt-4">
                <CornerSmoothing
                  radius={16}
                  className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-8 shadow-sm border border-[#a8d5ba]/20 text-center"
                >
                  <h3 className="text-xl font-medium text-[#2c3e2e] dark:text-[#f8f5f0] mb-2">
                    Questions & Answers
                  </h3>
                  <p className="text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 mb-4">
                    Get answers to your questions from our community and
                    experts.
                  </p>
                  <Button className="bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e]">
                    Ask a Question
                  </Button>
                </CornerSmoothing>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2c3e2e] text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Cosmetica</h3>
              <p className="text-white/70">
                Elevating your experience with premium products and exceptional
                service.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact Us</h4>
              <address className="not-italic text-white/70">
                <p>123 Elegant Street</p>
                <p>Luxury District</p>
                <p>contact@cosmetica.com</p>
                <p>+1 (555) 123-4567</p>
              </address>
            </div>
            <div>
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Cosmetica. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
