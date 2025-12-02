"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

// Sample cart items
const cartItems = [
  {
    id: 1,
    name: "Wellness Tincture",
    price: 49.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Luxury Bath Bombs (Set of 3)",
    price: 29.99,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Artisanal Chocolate Collection",
    price: 34.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
];

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#f8f5f0] dark:bg-[#1c2620]"
      >
        <SheetHeader className="space-y-0 pb-4 border-b border-[#a8d5ba]/20">
          <SheetTitle className="text-[#2c3e2e] dark:text-[#a8d5ba] flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart ({items.reduce(
              (sum, item) => sum + item.quantity,
              0
            )}{" "}
            items)
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <ShoppingBag className="h-16 w-16 text-[#a8d5ba]/50 mb-4" />
            <h3 className="text-xl font-medium text-[#2c3e2e] dark:text-[#f8f5f0] mb-2">
              Your cart is empty
            </h3>
            <p className="text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 text-center mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <SheetClose asChild>
              <Button className="bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e] font-medium">
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto py-6">
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden bg-[#a8d5ba]/10">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-[#2c3e2e] dark:text-[#f8f5f0]">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 hover:text-[#2c3e2e] dark:hover:text-[#f8f5f0]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-[#2c3e2e]/70 dark:text-[#f8f5f0]/70 text-sm mb-2">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-8 w-8 flex items-center justify-center rounded-full border border-[#a8d5ba] text-[#2c3e2e] dark:text-[#f8f5f0]"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="mx-3 min-w-[20px] text-center text-[#2c3e2e] dark:text-[#f8f5f0]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8 flex items-center justify-center rounded-full border border-[#a8d5ba] text-[#2c3e2e] dark:text-[#f8f5f0]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <div className="ml-auto font-medium text-[#2c3e2e] dark:text-[#f8f5f0]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#a8d5ba]/20 pt-6">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[#2c3e2e] dark:text-[#f8f5f0]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#2c3e2e] dark:text-[#f8f5f0]">
                  <span>Tax (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#2c3e2e] dark:text-[#f8f5f0] font-medium text-lg pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3 pb-20">
                <Button className="w-full bg-[#a8d5ba] hover:bg-[#97c4a9] text-[#2c3e2e] font-medium py-6">
                  Proceed to Checkout
                </Button>
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="w-full border-[#a8d5ba] text-[#2c3e2e] dark:text-[#f8f5f0] hover:bg-[#a8d5ba]/10 py-6"
                  >
                    Continue Shopping
                  </Button>
                </SheetClose>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
