import { PageLoader } from "@/components/molecules/PageLoader";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <PageLoader message="Loading" size="lg" variant="branded" />
    </div>
  );
}
