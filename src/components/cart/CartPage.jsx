"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useUser } from "@clerk/nextjs";
import { useCart } from "@/context/CartContext";
import CartSkeleton from "./CartSkeleton";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import CheckoutSuccessModal from "./CheckoutSuccessModal";

const CART_PATH = "/cartPage";

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, isHydrated } =
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
    removeFromCart(item.id);
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
