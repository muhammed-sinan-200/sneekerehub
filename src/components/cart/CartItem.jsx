import Image from "next/image";
import { HiOutlineXMark } from "react-icons/hi2";
import formatPrice from "@/lib/formatPrice";
import QuantityStepper from "./QuantityStepper";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const unitPrice = Number(item.price) || 0;
  const lineTotal = unitPrice * (item.quantity || 0);

  return (
    <div className="group relative flex flex-col gap-5 px-6 py-6 transition-colors duration-200 hover:bg-gray-50/60 sm:flex-row sm:items-start sm:px-8 sm:py-7">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-28 sm:w-28">
        <Image
          src={item.img}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 96px, 112px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold leading-snug text-gray-900 sm:text-lg">
              {item.name}
            </h3>
            <p className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-gray-500 sm:text-[11px]">
              Size · UK {item.selectedSize ?? "—"}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {formatPrice(unitPrice)} per pair
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <p className="whitespace-nowrap text-base font-bold text-gray-900 sm:text-lg">
              {formatPrice(lineTotal)}
            </p>
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${item.name} from bag`}
              className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 transition-colors duration-200 hover:text-black"
            >
              <HiOutlineXMark className="h-3.5 w-3.5" aria-hidden />
              Remove
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <QuantityStepper
            quantity={item.quantity || 0}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
          />
          <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-600">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden
            />
            In Stock
          </p>
        </div>
      </div>
    </div>
  );
}
