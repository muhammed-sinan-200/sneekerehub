export default function CartSkeleton() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="animate-pulse" aria-hidden>
          <div className="h-3 w-24 rounded bg-gray-200" />
          <div className="mt-4 h-12 w-72 rounded bg-gray-200" />
          <div className="mt-4 h-4 w-48 rounded bg-gray-200" />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
            <div className="space-y-4">
              <div className="h-32 rounded-2xl bg-white shadow-sm" />
              <div className="h-32 rounded-2xl bg-white shadow-sm" />
            </div>
            <div className="h-[26rem] rounded-2xl bg-white shadow-sm" />
          </div>
        </div>
        <p className="sr-only">Loading your bag…</p>
      </div>
    </div>
  );
}
