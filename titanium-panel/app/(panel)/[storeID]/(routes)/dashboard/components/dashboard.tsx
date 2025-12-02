'use client';

import React, { JSX, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/shadcn/table';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/shadcn/button';
import { Squircle } from '@squircle-js/react';
import { ScrollArea } from '@/components/ui/shadcn/scroll-area';
import { FormTitle } from '@/components/ui/formlayout/form-title';
import { Badge } from '@/components/ui/shadcn/badge';
import { motion } from 'framer-motion';

const salesData = [
  { name: 'Jan', sales: 2000 },
  { name: 'Feb', sales: 1500 },
  { name: 'Mar', sales: 2200 },
  { name: 'Apr', sales: 2400 },
  { name: 'May', sales: 2000 },
  { name: 'Jun', sales: 1500 },
  { name: 'Jul', sales: 2000 },
  { name: 'Aug', sales: 3600 },
  { name: 'Sep', sales: 3400 },
  { name: 'Oct', sales: 3450 },
];

const StatCard = ({
  title,
  value,
  icon,
  change,
}: {
  title: string;
  value: string;
  icon: JSX.Element;
  change: string;
}) => (
  <div className="h-full rounded-3xl shadow-md">
    <Squircle cornerRadius={20} cornerSmoothing={1} className="h-full bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium ">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Squircle>
  </div>
);

export function Dashboard({
  products,
  storeName,
}: {
  products: any;
  storeName: string;
}) {
  const [isMounted, setIsMounted] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const topProducts = [
    {
      name: products[0] ? products[0].name : 'N/A',
      sales: products[0] ? '120' : '0',
    },
    {
      name: products[1] ? products[0].name : 'N/A',
      sales: products[1] ? '80' : '0',
    },
    {
      name: products[2] ? products[0].name : 'N/A',
      sales: products[2] ? '60' : '0',
    },
  ];

  const recentOrders = [
    { id: '1', customer: 'John Doe', total: '$120.50', status: 'Complété' },
    { id: '2', customer: 'Jane Smith', total: '$75.20', status: 'En cours' },
    { id: '3', customer: 'Bob Johnson', total: '$200.00', status: 'Expédié' },
  ];

  const getTimeOfDayMessage = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
      return 'Good morning.';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good afternoon.';
    } else if (currentHour >= 18 && currentHour < 22) {
      return 'Good evening.';
    } else {
      return 'Hey there, working late?';
    }
  };

  const timeOfDayMessage = getTimeOfDayMessage();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Render nothing on the server
  }

  const animationVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={animationVariants}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="flex flex-col h-full min-w-[320px]"
    >
      <ScrollArea className="flex-1 overflow-y-auto p-0">
        <div className="space-y-6 md:p-8 pb-24">
          <div className="flex justify-between items-center pl-4 pr-2 md:pl-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <FormTitle className="text-2xl font-bold">
                {timeOfDayMessage.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: char === ' ' ? 0 : index * 0.08 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </FormTitle>
            </motion.div>
            <Badge className="h-min">{storeName}</Badge>
          </div>
          {/* Mobile layout (xs) */}
          <div className="sm:hidden relative">
            <div className="overflow-hidden min-w-0" ref={emblaRef}>
              <div className="flex w-[80vw]">
                <div className="flex-[0_0_80vw] min-w-0 px-4">
                  <div className="pb-6 grid gap-4 h-full">
                    <StatCard
                      key={'revenue'}
                      title="Revenu"
                      value="€45,231.89"
                      icon={
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      }
                      change="+20,1% par rapport au mois dernier"
                    />
                    <StatCard
                      key={'active-clients'}
                      title="Clients actifs"
                      value="573"
                      icon={<Users className="h-4 w-4 text-muted-foreground" />}
                      change="+201 depuis le mois dernier"
                    />
                  </div>
                </div>
                <div className="flex-[0_0_80vw] min-w-0 px-4">
                  <div className="pb-6 grid gap-4 h-full">
                    <StatCard
                      key={'product-count'}
                      title="Nombre de Produits"
                      value={products?.length || 0}
                      icon={
                        <Package className="h-4 w-4 text-muted-foreground" />
                      }
                      change="+10% par rapport au mois dernier"
                    />
                    <StatCard
                      key={'stock-count'}
                      title="En stock"
                      value="867"
                      icon={
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                      }
                      change="-5% par rapport au mois dernier"
                    />
                  </div>
                </div>
                <div className="pb-6 flex-[0_0_100vw] translate-x-[-20] min-w-0 px-4">
                  <div className="h-full rounded-3xl shadow-md">
                    <Squircle
                      key={'sales-preview'}
                      cornerRadius={20}
                      cornerSmoothing={1}
                      className="bg-card"
                    >
                      <CardHeader>
                        <CardTitle>Aperçu des ventes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <AreaChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="sales"
                              stroke="#0E0D13FF"
                              fill="#000000FF"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Squircle>
                  </div>
                </div>
              </div>
            </div>
            <Button
              size="icon"
              className="absolute left-2 top-[47%] -translate-y-1/2 z-10 w-[5vw] max-w-min rounded-full shadow-lg"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="absolute right-2 top-[47%] -translate-y-1/2 z-10 w-[5vw] rounded-full shadow-lg"
              onClick={scrollNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Small devices layout (sm) */}
          <div className="hidden sm:block md:hidden space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                key={'revenue-sm'}
                title="Revenu"
                value="€45,231.89"
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                change="+20,1% par rapport au mois dernier"
              />
              <StatCard
                key={'active-clients-sm'}
                title="Clients actifs"
                value="573"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                change="+201 depuis le mois dernier"
              />
              <StatCard
                key={'product-count-sm'}
                title="Nombre de Produits"
                value={products?.length || 0}
                icon={<Package className="h-4 w-4 text-muted-foreground" />}
                change="+10% par rapport au mois dernier"
              />
              <StatCard
                key={'stock-count-sm'}
                title="En stock"
                value="867"
                icon={
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                }
                change="-5% par rapport au mois dernier"
              />
            </div>
            <div className="rounded-3xl shadow-md">
              <Squircle
                key={'sales-preview-sm'}
                cornerRadius={20}
                cornerSmoothing={1}
                className="bg-card"
              >
                <CardHeader>
                  <CardTitle>Aperçu des ventes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#0E0D13FF"
                        fill="#000000FF"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Squircle>
            </div>
          </div>

          {/* Desktop layout (md and up) */}
          <div className="hidden md:flex space-x-4">
            <div className="w-1/2 grid grid-cols-2 gap-4">
              <StatCard
                key={'revenue-md'}
                title="Revenu"
                value="€45,231.89"
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                change="+20,1% par rapport au mois dernier"
              />
              <StatCard
                key={'active-clients-md'}
                title="Clients actifs"
                value="573"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                change="+201 depuis le mois dernier"
              />
              <StatCard
                key={'product-count-md'}
                title="Nombre de Produits"
                value={products?.length || 0}
                icon={<Package className="h-4 w-4 text-muted-foreground" />}
                change="+10% par rapport au mois dernier"
              />
              <StatCard
                key={'stock-count-md'}
                title="En stock"
                value="867"
                icon={
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                }
                change="-5% par rapport au mois dernier"
              />
            </div>
            <div className="w-1/2 rounded-3xl shadow-md">
              <Squircle
                key={'sales-preview-md'}
                cornerRadius={20}
                cornerSmoothing={1}
                className="bg-card"
              >
                <CardHeader>
                  <CardTitle>Aperçu des ventes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#0E0D13FF"
                        fill="#000000FF"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Squircle>
            </div>
          </div>

          <div className="p-4 sm:p-0 space-y-4 md:flex md:space-y-0 md:space-x-4">
            {/* Section des commandes récentes */}
            <div className="rounded-3xl shadow-md md:w-[50%]">
              <Squircle
                key={'recent-orders-md'}
                cornerRadius={20}
                cornerSmoothing={1}
                className="bg-card p-4"
              >
                <h2 className="text-xl font-bold mb-4">Commandes récentes</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>{order.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Squircle>
            </div>

            {/* Section des meilleurs produits */}
            <div className="rounded-3xl shadow-md md:w-[50%]">
              <Squircle
                key={'top-products-md'}
                cornerRadius={20}
                cornerSmoothing={1}
                className="bg-card p-4"
              >
                <h2 className="text-xl font-bold mb-4">Meilleurs produits</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead>Ventes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProducts.map((product, index) => (
                      <TableRow key={product.name + index}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.sales}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Squircle>
            </div>
          </div>
        </div>
      </ScrollArea>
    </motion.div>
  );
}
