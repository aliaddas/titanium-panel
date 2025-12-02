import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-[#1c2620] pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Banner Skeleton */}
        <div className="relative h-64 md:h-80 mb-12 overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Search and Filter Bar Skeleton */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <Skeleton className="h-10 flex-1" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24 md:hidden" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="space-y-8">
              <div className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-[#a8d5ba]/20">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-[#a8d5ba]/20">
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-4 w-full mb-6" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-10" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid Skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm border border-[#a8d5ba]/20"
                >
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-5">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3 mb-3" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-9 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
