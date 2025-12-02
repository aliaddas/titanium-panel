import prismadb from '@/lib/prismadb';
import { Dashboard } from './components/dashboard';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/shadcn/skeleton';
import { notFound } from 'next/navigation';

interface Product {
  ID: string;
  name: string;
  price: number;
  storeID: string;
  inceptionDate: Date;
  lastUpdate: Date;
  isArchived: boolean;
  isFeatured: boolean;
  description: string | null;
  imagePreview: string | null;
}

interface Store {
  id: string;
  name: string;
  // Add other store fields as needed
}

type DashboardPageProps = {
  params: { storeID: string };
};

const LoadingSkeleton = () => (
  <div className="space-y-6 md:p-8 pb-24">
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-6 w-24" />
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32" />
      ))}
    </div>
  </div>
);

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const { storeID } = params;

  try {
    const [store, productsFromDB] = await Promise.all([
      prismadb.store.findFirst({
        where: { ID: storeID },
      }),
      prismadb.product.findMany({
        where: { storeID },
        take: 10, // Limit initial load to 10 products
      }),
    ]);

    if (!store) {
      notFound();
    }

    // Convert Decimal price to number
    const products: Product[] = productsFromDB.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    }));

    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <Dashboard products={products} storeName={store.name} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading dashboard:', error);
    throw new Error('Failed to load dashboard data');
  }
};

export default DashboardPage;
