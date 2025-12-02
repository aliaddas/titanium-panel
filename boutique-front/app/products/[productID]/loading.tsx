import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-[#1c2620] pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Skeleton className="h-6 w-20" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            <Skeleton className="aspect-square rounded-3xl mb-4" />
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white/80 dark:bg-[#2c3e2e]/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-[#a8d5ba]/20">
              <Skeleton className="h-6 w-20 mb-3" />
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-8 w-32 mb-4" />

              <div className="flex mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-5 w-5 mr-1" />
                ))}
                <Skeleton className="h-5 w-32 ml-2" />
              </div>

              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-8" />

              <div className="space-y-6 mb-8">
                {[1, 2].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-6 w-24 mb-3" />
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3].map((j) => (
                        <Skeleton key={j} className="h-10 w-24 rounded-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>

              <Skeleton className="h-4 w-48 mb-4" />
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Skeleton className="h-12 w-full max-w-md mx-auto mb-6 rounded-full" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <Skeleton className="h-8 w-64 mx-auto mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
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
  )
}
