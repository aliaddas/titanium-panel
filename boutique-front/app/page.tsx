"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Instagram,
  Facebook,
  Twitter,
  Heart,
  MessageCircle,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CornerSmoothing } from "@/components/corner-smoothing";

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-[#1c2620] transition-colors duration-300 mt-2 pt-8 sm:pt-0">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#a8d5ba]/10 dark:bg-[#a8d5ba]/5 z-0"></div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#f8f5f0] dark:from-[#1c2620] to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8f5f0] dark:from-[#1c2620] to-transparent z-10"></div>
          <svg
            className="absolute inset-0 w-full h-full opacity-30 dark:opacity-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#a8d5ba"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#a8d5ba]/10 dark:bg-[#a8d5ba]/5 z-0"></div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#f8f5f0] dark:from-[#1c2620] to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8f5f0] dark:from-[#1c2620] to-transparent z-10"></div>
          <svg
            className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              stroke="#a8d5ba"
              strokeWidth="0.5"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="60"
              stroke="#a8d5ba"
              strokeWidth="0.5"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="40"
              stroke="#a8d5ba"
              strokeWidth="0.5"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="20"
              stroke="#a8d5ba"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        </div>*/}

        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="space-y-6"
          >
            <h1 className="font-cormorant text-4xl md:text-6xl font-semibold text-[#2c3e2e] dark:text-[#f8f5f0] leading-snug">
              Discover Premium Beauty Products
            </h1>
            <p className="text-lg text-[#2c3e2e]/80 dark:text-[#f8f5f0]/80 max-w-md">
              Explore our thoughtfully selected range of high-quality beauty
              products, crafted to enhance your lifestyle with confidence and
              care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e] font-medium px-8 py-6 rounded-md"
                asChild
              >
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                variant="outline"
                className="border-[#a8d5ba] text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/10 px-8 py-6 rounded-md"
                onClick={scrollToFeatures}
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#a8d5ba]/30 to-transparent mix-blend-overlay z-10"></div>
            <Image
              src="/hero/hero-image.jpg"
              alt="Cosmetica products"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToFeatures}
        >
          <ChevronDown className="h-8 w-8 text-[#2c3e2e] dark:text-[#f8f5f0]" />
        </motion.div>
      </section>

      {/* Rest of the content remains the same but with dark mode support */}
      {/* Features Section */}
      <section
        ref={featuresRef}
        id="products"
        className="py-20 bg-white dark:bg-[#2c3e2e]/80"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c3e2e] dark:text-[#f8f5f0] mb-4">
              Our Premium Collections
            </h2>
            <p className="text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 max-w-2xl mx-auto">
              Explore our carefully curated categories, each offering the finest
              selection of premium products.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Wellness Collection",
                description:
                  "Enhance your daily routine with our premium wellness products.",
                image: "/placeholder.svg?height=400&width=300",
              },
              {
                title: "Luxury Essentials",
                description:
                  "Indulge in our luxury essentials for the discerning connoisseur.",
                image: "/placeholder.svg?height=400&width=300",
              },
              {
                title: "Artisanal Selection",
                description:
                  "Discover handcrafted products from our artisanal partners.",
                image: "/placeholder.svg?height=400&width=300",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeIn}>
                <CornerSmoothing
                  radius={24}
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 bg-[#f8f5f0] dark:bg-[#2c3e2e]">
                    <h3 className="text-xl font-semibold text-[#2c3e2e] dark:text-[#f8f5f0] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 mb-4">
                      {item.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-[#a8d5ba] text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/10"
                      asChild
                    >
                      <Link href="/products">Explore</Link>
                    </Button>
                  </div>
                </CornerSmoothing>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-16 text-center"
          >
            <Button
              className="bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e] font-medium px-8 py-6 rounded-md"
              asChild
            >
              <Link href="/products">View All Products</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* The rest of the home page remains unchanged */}
      {/* ... */}

      {/* About Section */}
      <section id="about" className="py-20 bg-[#a8d5ba]/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/placeholder.svg?height=1000&width=800"
                alt="Our boutique"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#2c3e2e]">
                Our Boutique Experience
              </h2>
              <p className="text-[#2c3e2e]/80">
                Founded in 2020, Cosmetica was created with a vision to provide
                an elegant, sophisticated shopping experience for discerning
                customers.
              </p>
              <p className="text-[#2c3e2e]/80">
                We believe in quality over quantity, carefully selecting each
                product in our collection to ensure it meets our exacting
                standards for excellence, sustainability, and ethical sourcing.
              </p>
              <p className="text-[#2c3e2e]/80">
                Our boutique offers a tranquil, welcoming environment where you
                can explore at your leisure, guided by our knowledgeable staff
                who are passionate about helping you find the perfect products.
              </p>
              <Button
                variant="outline"
                className="border-[#a8d5ba] text-[#2c3e2e] hover:bg-[#a8d5ba]/10"
              >
                Learn More About Us
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c3e2e] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-[#2c3e2e]/70 max-w-2xl mx-auto">
              Discover why our customers keep coming back to Cosmetica.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                quote:
                  "The quality and service at Cosmetica are unmatched. I'm a customer for life.",
                author: "Emily R.",
              },
              {
                quote:
                  "Such an elegant shopping experience. The products are exceptional and the staff is knowledgeable.",
                author: "Michael T.",
              },
              {
                quote:
                  "I appreciate their commitment to ethical sourcing and sustainability. Plus, their products are amazing!",
                author: "Sarah L.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-[#f8f5f0] p-8 rounded-lg shadow-md"
              >
                <p className="text-[#2c3e2e]/80 italic mb-4">"{item.quote}"</p>
                <p className="text-[#2c3e2e] font-medium">— {item.author}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Community Showcase Section */}
      <section className="py-20 bg-white dark:bg-[#2c3e2e]/80">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2c3e2e] dark:text-[#f8f5f0] mb-4">
              Our Community
            </h2>
            <p className="text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 max-w-2xl mx-auto">
              Join our growing community of enthusiasts sharing their
              experiences and discoveries.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {[
              {
                title: "The Wellness Tincture changed my routine",
                content:
                  "I've been using the Wellness Tincture for about a month now, and I'm absolutely loving the results.",
                author: "Emily J.",
                rating: 5,
                product: "Wellness Tincture",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              {
                title: "Luxury Bath Bombs are a game-changer",
                content:
                  "The Luxury Bath Bombs are perfect for unwinding after a long day. The lavender scent is divine!",
                author: "Michael T.",
                rating: 4,
                product: "Luxury Bath Bombs",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              {
                title: "Artisanal Chocolates - Worth Every Penny",
                content:
                  "I treated myself to the Artisanal Chocolate Collection, and I'm still thinking about them!",
                author: "Sarah W.",
                rating: 5,
                product: "Artisanal Chocolate Collection",
                avatar: "/placeholder.svg?height=40&width=40",
              },
            ].map((post, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 bg-[#f8f5f0] dark:bg-[#2c3e2e]">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage
                          src={post.avatar || "/placeholder.svg"}
                          alt={post.author}
                        />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-[#2c3e2e] dark:text-[#f8f5f0]">
                          {post.author}
                        </div>
                        <div className="text-xs text-[#2c3e2e]/60 dark:text-[#f8f5f0]/60">
                          {post.product}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#2c3e2e] dark:text-[#f8f5f0] mb-2">
                      {post.title}
                    </h3>
                    <div className="flex mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4"
                          fill={i < post.rating ? "#d4af37" : "none"}
                          stroke={i < post.rating ? "#d4af37" : "#d4af37"}
                        />
                      ))}
                    </div>
                    <p className="text-[#2c3e2e]/80 dark:text-[#f8f5f0]/80 line-clamp-3 mb-4">
                      {post.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3">
                        <button className="flex items-center gap-1 text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                          <Heart className="h-4 w-4" />
                        </button>
                        <button className="flex items-center gap-1 text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0] transition-colors">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-xs text-[#2c3e2e]/60 dark:text-[#f8f5f0]/60">
                        2 days ago
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center"
          >
            <Button
              className="bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e] font-medium px-8 py-6 rounded-md"
              asChild
            >
              <Link href="/community">Join the Conversation</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-[#a8d5ba]/20 dark:bg-[#a8d5ba]/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-[#2c3e2e] dark:text-[#f8f5f0] mb-4">
              Join Our Community
            </h2>
            <p className="text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 mb-8">
              Subscribe to our newsletter for exclusive offers, new product
              announcements, and boutique events.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md border border-[#a8d5ba] bg-white dark:bg-[#1c2620] text-[#2c3e2e] dark:text-[#f8f5f0] focus:outline-none focus:ring-2 focus:ring-[#a8d5ba]"
              />
              <Button className="bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e] font-medium">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#2c3e2e] text-white py-12">
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
                    href="#"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#products"
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
                    href="#contact"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    Contact
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
