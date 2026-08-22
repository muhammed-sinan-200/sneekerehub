import Link from "next/link";
import { HiOutlineShoppingBag, HiArrowRight } from "react-icons/hi2";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center sm:py-24">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <HiOutlineShoppingBag
          className="h-10 w-10 text-gray-400"
          aria-hidden
        />
      </div>
      <h2 className="mt-6 text-2xl font-black uppercase tracking-[-0.02em] text-gray-900 sm:text-3xl">
        Your Bag is Empty
      </h2>
      <p className="mt-3 max-w-sm text-sm text-gray-600 sm:text-base">
        Looks like you haven&apos;t added any sneakers yet. Discover this
        season&apos;s freshest drops.
      </p>
      <Link
        href="/shop"
        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-[#ff8800] hover:text-black hover:shadow-[0_12px_40px_rgba(255,136,0,0.35)] active:scale-[0.97]"
      >
        Start Shopping
        <HiArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      </Link>
    </div>
  );
}
