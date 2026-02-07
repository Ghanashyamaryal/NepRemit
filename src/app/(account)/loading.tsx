import { Skeleton } from "@/components/atoms/Skeleton";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

export default function AccountLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
            {/* Icon skeleton */}
            <div className="flex justify-center mb-4">
              <Skeleton className="h-14 w-14 rounded-2xl" />
            </div>

            {/* Title skeleton */}
            <div className="text-center mb-8 space-y-2">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>

            {/* Button skeleton */}
            <Skeleton className="h-12 w-full rounded-xl mb-6" />

            {/* Divider skeleton */}
            <div className="flex items-center gap-4 my-6">
              <Skeleton className="h-px flex-1" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-px flex-1" />
            </div>

            {/* Form fields skeleton */}
            <div className="space-y-5">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>

            {/* Footer skeleton */}
            <div className="mt-6 flex justify-center">
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
