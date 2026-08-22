import {
  HiOutlineLockClosed,
  HiOutlineArrowPath,
  HiOutlineCheckBadge,
  HiArrowRight,
} from "react-icons/hi2";
import formatPrice from "@/lib/formatPrice";

export default function OrderSummary({ totalPrice, totalQty, onCheckout }) {
  const total = totalPrice;

  return (
    <aside className="lg:sticky lg:top-[110px]" aria-label="Order summary">
      <div className="rounded-2xl bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04),0_8px_30px_rgba(15,23,42,0.04)]">
        <div className="border-b border-black/5 px-6 py-5 sm:px-8">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.24em] text-gray-900">
            Order Summary
          </h2>
        </div>

        <div className="px-6 py-6 sm:px-8 sm:py-7">
          <dl className="space-y-3.5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-gray-500">
                Subtotal{" "}
                <span className="text-gray-400">({totalQty})</span>
              </dt>
              <dd className="font-semibold text-gray-900">
                {formatPrice(totalPrice)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-gray-500">Shipping</dt>
              <dd className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                Complimentary
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-gray-500">Estimated Tax</dt>
              <dd className="text-xs text-gray-400">Calculated at checkout</dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-gray-900">
              Total
            </span>
            <span className="text-2xl font-black tracking-tight text-gray-900">
              {formatPrice(total)}
            </span>
          </div>

          <button
            type="button"
            onClick={onCheckout}
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-[#ff8800] hover:text-black hover:shadow-[0_12px_40px_rgba(255,136,0,0.35)] active:scale-[0.98]"
          >
            <span>Checkout · {formatPrice(total)}</span>
            <HiArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </button>

          <ul className="mt-7 grid grid-cols-3 gap-3 border-t border-black/5 pt-6 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-gray-500">
            <li className="flex flex-col items-center gap-2 text-center">
              <HiOutlineLockClosed
                className="h-5 w-5 text-gray-400"
                aria-hidden
              />
              <span>Secure Checkout</span>
            </li>
            <li className="flex flex-col items-center gap-2 text-center">
              <HiOutlineArrowPath
                className="h-5 w-5 text-gray-400"
                aria-hidden
              />
              <span>10-Day Returns</span>
            </li>
            <li className="flex flex-col items-center gap-2 text-center">
              <HiOutlineCheckBadge
                className="h-5 w-5 text-gray-400"
                aria-hidden
              />
              <span>100% Authentic</span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
