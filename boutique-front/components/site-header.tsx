"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, Sun, Moon, ChevronUp } from "lucide-react";

import "../styles/nav-menu.css";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { CartSheet } from "@/components/cart-sheet";
import { LanguageSwitcher } from "@/components/language-switcher";

export function SiteHeader() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Determine if header should be visible
      if (currentScrollPos > 70) {
        setIsScrolled(true);
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      } else {
        setIsScrolled(false);
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/community", label: "Community" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2 bg-[#f8f5f0]/90 dark:bg-[#1c2620]/90 backdrop-blur-md shadow-sm"
            : "py-4  bg-[#f4f1eb]/90 dark:bg-[#141c17]/90 border-b border-[#a8d5ba]/20 dark:border-[#a8d5ba]/20"
        } ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.h1
              className={`font-bold text-[#2c3e2e] dark:text-[#a8d5ba] transition-all duration-300 font-cormorant ${
                isScrolled ? "text-xl" : "text-2xl"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Cosmetica
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex space-x-8 items-center"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-lg text-[#2c3e2e] dark:text-[#f8f5f0] hover:text-[#a8d5ba] dark:hover:text-[#a8d5ba] transition-colors flex items-center ${
                  (pathname === "/" && link.href === "/") ||
                  (pathname.startsWith(link.href) && link.href !== "/")
                    ? "text-[#a8d5ba] dark:text-[#a8d5ba] font-medium bg-[#a8d5ba]/10 dark:bg-[#a8d5ba]/10 px-2 py-1 rounded"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-[#2c3e2e] dark:text-[#f8f5f0]"
            >
              {/* Avoid rendering theme-dependent icon on the server to prevent hydration errors.
                  Show nothing until mounted, then show the correct icon. */}
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : null}
            </Button>

            <Button
              variant="outline"
              className="bg-transparent border-[#a8d5ba] text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/10"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Cart (3)
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size={"md"}
                  className="text-[#2c3e2e] dark:text-[#f8f5f0] transition-smoothen"
                >
                  <Menu className="scale-150" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[92%] sm:w-[85%] bg-[#F8F5F091] dark:bg-[#1c2620]/85 backdrop-blur-md"
              >
                <SheetHeader>
                  <SheetTitle className="text-[#2c3e2e] dark:text-[#a8d5ba] text-left text-3xl font-cormorant">
                    Cosmetica
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col justify-between h-full ">
                  <div className="absolute bg-gradient-to-b from-[#2c3e2e] to-[#2c3e2e]/10 w-1 h-[225px] rounded-full left-10 mt-8 -z-10"></div>
                  <nav className="flex flex-col space-y-4 mt-6 font-cormorant ">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.label}>
                        <Link
                          href={link.href}
                          className={`text-[#2c3e2e] dark:text-[#f8f5f0] hover:text-[#a8d5ba] dark:hover:text-[#a8d5ba] transition-colors text-lg py-2 ${
                            pathname === link.href
                              ? "text-[#f8f5f0] dark:text-[#a8d5ba] font-black bg-[#2c3e2e] dark:bg-[#2c3e2e] px-4 rounded-md"
                              : "ml-8"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  <div className="space-y-6 pb-10">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-[#2c3e2e] dark:text-[#f8f5f0] font-medium">
                          Theme
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                          }
                          className="text-[#2c3e2e] dark:text-[#f8f5f0]"
                        >
                          {/* Avoid rendering theme-dependent icon on the server to prevent hydration errors. */}
                          {mounted ? (
                            theme === "dark" ? (
                              <Sun className="h-5 w-5" />
                            ) : (
                              <Moon className="h-5 w-5" />
                            )
                          ) : null}
                        </Button>
                      </div>

                      <div className="flex justify-between items-center">
                        <h3 className="text-[#2c3e2e] dark:text-[#f8f5f0] font-medium">
                          Language
                        </h3>
                        <LanguageSwitcher />
                      </div>
                    </div>

                    <SheetClose asChild>
                      <Button
                        className="w-full bg-[#a8d5ba] dark:bg-[#f8f5f0] hover:bg-[#97c4a9] text-[#2c3e2e] font-medium text-md "
                        onClick={() => {
                          setTimeout(() => setCartOpen(true), 100);
                        }}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        View Cart (3)
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Floating Action Button */}
      <AnimatePresence>
        {!visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "50%" }}
            animate={{ opacity: 1, y: 0, x: "50%" }}
            exit={{ opacity: 0, y: 20, x: "50%" }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden"
          >
            <div className="flex items-center bg-[#a8d5ba] dark:bg-[#a8d5ba] rounded-full shadow-lg">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-14 w-14 text-[#2c3e2e]"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <ChevronUp size={14} />
              </Button>

              <div className="h-8 w-px bg-[#2c3e2e]/20"></div>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-14 w-14 text-[#2c3e2e]"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBag size={14} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sheet */}
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
