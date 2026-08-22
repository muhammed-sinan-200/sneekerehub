import { HiMinus, HiPlus } from "react-icons/hi2";

export default function QuantityStepper({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white p-1">
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black active:scale-90"
      >
        <HiMinus className="h-4 w-4" aria-hidden />
      </button>
      <span className="min-w-6 text-center text-sm font-bold text-gray-900">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black active:scale-90"
      >
        <HiPlus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
