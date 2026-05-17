"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  HiOutlineShoppingBag,
  HiOutlineXMark,
  HiOutlineLockClosed,
  HiOutlineArrowPath,
  HiOutlineCheckBadge,
  HiOutlineArrowLeft,
  HiArrowRight,
  HiMinus,
  HiPlus,
} from "react-icons/hi2";
import { useUser } from "@clerk/nextjs";
import { useCart } from "@/context/CartContext";

const CART_PATH = "/cartPage";

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const formatPrice = (value) => CURRENCY_FORMATTER.format(Number(value) || 0);

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, clearCart, isHydrated } =
    useCart();
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [successOpen, setSuccessOpen] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0),
    0,
  );
  const totalQty = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0,
  );

  const removeItem = (item) => {
    const count = item.quantity || 0;
    for (let i = 0; i < count; i++) {
      decreaseQuantity(item.id);
    }
  };

  const handleCheckout = () => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent(CART_PATH)}`);
      return;
    }
    setSuccessOpen(true);
    clearCart();
  };

  const closeSuccess = () => setSuccessOpen(false);
  const continueShopping = () => {
    setSuccessOpen(false);
    router.push("/shop");
  };

  if (!isHydrated) {
    return <CartSkeleton />;
  }

  const isEmpty = cartItems.length === 0;

  return (
    <div className="bg-gray-50">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <header className="mb-10 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-10 bg-[#ff8800] sm:w-12"
                aria-hidden
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-[11.5px]">
                Your Bag
              </span>
            </div>
            <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-[-0.02em] text-gray-900 sm:text-5xl lg:text-6xl">
              Shopping Bag
            </h1>
            {!isEmpty && (
              <p className="mt-4 text-sm text-gray-600 sm:text-base">
                {totalQty} {totalQty === 1 ? "item" : "items"} · Ready for
                checkout
              </p>
            )}
          </div>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 self-start text-[11px] font-bold uppercase tracking-[0.22em] text-gray-900 transition-colors duration-200 hover:text-[#ff8800] lg:self-end"
          >
            <HiOutlineArrowLeft
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-x-0.5"
              aria-hidden
            />
            <span className="border-b border-gray-900 pb-0.5 transition-colors duration-300 group-hover:border-[#ff8800]">
              Continue Shopping
            </span>
          </Link>
        </header>

        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
            <CartItemsList
              cartItems={cartItems}
              onIncrease={addToCart}
              onDecrease={decreaseQuantity}
              onRemove={removeItem}
            />
            <OrderSummary
              totalPrice={totalPrice}
              totalQty={totalQty}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>

      <CheckoutSuccessModal
        open={successOpen}
        onClose={closeSuccess}
        onContinue={continueShopping}
      />
    </div>
  );
}

function CartSkeleton() {
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

function EmptyCart() {
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

function CartItemsList({ cartItems, onIncrease, onDecrease, onRemove }) {
  return (
    <section
      aria-label="Cart items"
      className="rounded-2xl bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04),0_8px_30px_rgba(15,23,42,0.04)]"
    >
      <div className="flex items-center justify-between border-b border-black/5 px-6 py-4 sm:px-8">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.24em] text-gray-900">
          Items
          <span className="ml-2 font-medium text-gray-400">
            ({cartItems.length})
          </span>
        </h2>
      </div>
      <ul className="divide-y divide-black/5">
        {cartItems.map((item) => (
          <li key={`${item.id}-${item.selectedSize ?? "default"}`}>
            <CartItem
              item={item}
              onIncrease={() => onIncrease(item)}
              onDecrease={() => onDecrease(item.id)}
              onRemove={() => onRemove(item)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
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

function QuantityStepper({ quantity, onDecrease, onIncrease }) {
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

function OrderSummary({ totalPrice, totalQty, onCheckout }) {
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

function CheckoutSuccessModal({ open, onClose, onContinue }) {
  const shouldReduceMotion = useReducedMotion();
  // Three-phase sequence: loading → sealing → confirmed
  const [animPhase, setAnimPhase] = useState("loading");

  const RING_R = 36;
  const RING_CIRCUM = 2 * Math.PI * RING_R; // ≈ 226.2

  // dashoffset per phase: higher = less of arc drawn
  const arcOffset =
    animPhase === "loading"
      ? RING_CIRCUM * 0.70  // ~30% arc visible
      : animPhase === "sealing"
        ? RING_CIRCUM * 0.06 // ~94% arc visible
        : 0;                  // 100% arc visible

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    setAnimPhase("loading");
    const t1 = setTimeout(
      () => setAnimPhase("sealing"),
      shouldReduceMotion ? 40 : 680,
    );
    const t2 = setTimeout(
      () => setAnimPhase("confirmed"),
      shouldReduceMotion ? 80 : 1420,
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [open, shouldReduceMotion]);

  const textAnim = (delayMs) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: {
            opacity: animPhase === "confirmed" ? 1 : 0,
            y: animPhase === "confirmed" ? 0 : 10,
          },
          transition: { duration: 0.38, delay: delayMs / 1000, ease: "easeOut" },
        };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-success-title"
      aria-describedby="checkout-success-description"
      aria-hidden={!open}
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close success dialog"
        tabIndex={open ? 0 : -1}
        className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
      />

      <div
        className={`relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(15,23,42,0.25)] transition-all duration-300 ease-out motion-reduce:transition-none ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-[0.96] opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          tabIndex={open ? 0 : -1}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-black"
        >
          <HiOutlineXMark className="h-5 w-5" aria-hidden />
        </button>

        <div className="px-8 pb-9 pt-11 text-center sm:px-10 sm:pb-10 sm:pt-12">

          {/* ── Premium 3-phase animation ─────────────────────────────── */}
          <div className="relative mx-auto h-[88px] w-[88px]">

            {/* Ambient orange glow — confirmed phase only */}
            <AnimatePresence>
              {animPhase === "confirmed" && (
                <motion.div
                  key="glow"
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,136,0,0.16) 0%, transparent 70%)",
                  }}
                />
              )}
            </AnimatePresence>

            {/* Precision arc ring */}
            <svg
              width="88"
              height="88"
              viewBox="0 0 88 88"
              fill="none"
              aria-hidden
              className="absolute inset-0"
            >
              {/* Track */}
              <circle
                cx="44"
                cy="44"
                r={RING_R}
                stroke="#f3f4f6"
                strokeWidth="2"
              />
              {/* Animated progress arc — starts invisible, fills over phases */}
              <motion.circle
                cx="44"
                cy="44"
                r={RING_R}
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                transform="rotate(-90 44 44)"
                strokeDasharray={RING_CIRCUM}
                initial={{ strokeDashoffset: RING_CIRCUM }}
                animate={
                  shouldReduceMotion
                    ? { strokeDashoffset: 0 }
                    : { strokeDashoffset: arcOffset }
                }
                transition={{
                  duration:
                    animPhase === "loading"
                      ? 0.55
                      : animPhase === "sealing"
                        ? 0.62
                        : 0.38,
                  ease:
                    animPhase === "confirmed"
                      ? [0.16, 1, 0.3, 1]
                      : "easeOut",
                }}
              />
            </svg>

            {/* Center icon — transitions from processing dots to check badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {animPhase !== "confirmed" ? (
                  <motion.div
                    key="processing"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-50"
                    initial={{ scale: 0.82, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.82, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <span className="flex items-center gap-[5px]" aria-hidden>
                      {[0, 0.14, 0.28].map((d, i) => (
                        <motion.span
                          key={i}
                          className="block h-[5px] w-[5px] rounded-full"
                          animate={
                            shouldReduceMotion
                              ? { backgroundColor: "#9ca3af" }
                              : animPhase === "sealing"
                                ? {
                                    backgroundColor: [
                                      "#d1d5db",
                                      "#10b981",
                                      "#d1d5db",
                                    ],
                                    scaleY: [1, 1.5, 1],
                                  }
                                : { opacity: [0.35, 1, 0.35] }
                          }
                          transition={{
                            duration: 0.68,
                            delay: d,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{ backgroundColor: "#d1d5db" }}
                        />
                      ))}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="confirmed"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#10b981]"
                    initial={{ scale: 0.55, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 17,
                      mass: 0.85,
                    }}
                    style={{
                      boxShadow: "0 6px 22px rgba(255,136,0,0.42)",
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0.55, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.14, duration: 0.24, ease: "easeOut" }}
                    >
                      <HiOutlineCheckBadge
                        className="h-[22px] w-[22px] text-white"
                        aria-hidden
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* ── End animation ─────────────────────────────────────────── */}

          {/* Text content — staggers in on confirmed */}
          <motion.p
            className="mt-6 text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#10b981] sm:text-[11.5px]"
            {...textAnim(0)}
          >
            Order Confirmed
          </motion.p>

          <motion.h2
            id="checkout-success-title"
            className="mt-3 text-2xl font-black uppercase leading-tight tracking-[-0.02em] text-gray-900 sm:text-3xl"
            {...textAnim(70)}
          >
            Order placed successfully
          </motion.h2>

          <motion.p
            id="checkout-success-description"
            className="mt-3 text-sm text-gray-600 sm:text-base"
            {...textAnim(140)}
          >
            Your order has been confirmed.
          </motion.p>

          <motion.div {...textAnim(210)}>
            <button
              type="button"
              onClick={onContinue}
              tabIndex={open ? 0 : -1}
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-[#ff8800] hover:text-black hover:shadow-[0_12px_40px_rgba(255,136,0,0.35)] active:scale-[0.98]"
            >
              <span>Continue Shopping</span>
              <HiArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

