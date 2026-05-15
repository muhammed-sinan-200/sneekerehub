"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, isHydrated } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + (Number(item.price) || 0) * (item.quantity || 0),
    0
  );

  // Avoid empty-cart flash while localStorage is being read on the client.
  if (!isHydrated) {
    return (
      <div className="flex min-h-[90vh] items-center justify-center bg-[#f5f7fa]">
        <p className="text-gray-400">Loading cart…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-[90vh] w-full max-w-screen-lg bg-[#f5f7fa] px-4 py-12 sm:px-6">
      <div className="mb-10 text-center">
        <p className="text-gray-500">
          Review your items and complete your purchase
        </p>
      </div>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col gap-6 md:flex-row md:justify-center">
          <div className="w-full md:w-8/12 lg:w-7/12">
            <CartItemsList
              cartItems={cartItems}
              addToCart={addToCart}
              decreaseQuantity={decreaseQuantity}
            />
          </div>
          <div className="w-full md:w-4/12 lg:w-3/12">
            <OrderSummary totalPrice={totalPrice} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Empty state ─────────────────────────────────────────────────────────── */

function EmptyCart() {
  return (
    <div className="py-16 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
        alt="empty-cart"
        width={140}
        className="mx-auto mb-6 opacity-75"
      />
      <h5 className="mb-2 text-lg font-medium text-gray-500">
        Your cart is empty 🛒
      </h5>
      <p className="text-gray-400">Start shopping to fill it up!</p>
    </div>
  );
}

/* ─── Cart items list ─────────────────────────────────────────────────────── */

function CartItemsList({ cartItems, addToCart, decreaseQuantity }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      {cartItems.map((item, index) => (
        <CartItem
          key={item.id}
          item={item}
          isLast={index === cartItems.length - 1}
          onIncrease={() => addToCart(item)}
          onDecrease={() => decreaseQuantity(item.id)}
        />
      ))}
    </div>
  );
}

function CartItem({ item, isLast, onIncrease, onDecrease }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between py-4 transition-colors duration-300 ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <Image
          src={item.img}
          alt={item.name}
          width={100}
          height={100}
          className="rounded-lg object-cover shadow-[0_3px_8px_rgba(0,0,0,0.10)]"
        />
        <div>
          <h5 className="mb-1 text-base font-semibold text-gray-900">
            {item.name}
          </h5>
          <p className="mb-1 text-sm text-gray-400">
            Size: UK {item.selectedSize}
          </p>
          <p className="font-bold text-gray-900">$ {item.price}</p>
        </div>
      </div>

      {/* Stacks below the image/meta block on mobile, sits inline on md+ */}
      <div className="mt-3 flex items-center gap-3 md:mt-0">
        <QuantityButton onClick={onDecrease} label="Decrease quantity">
          –
        </QuantityButton>
        <span className="w-5 text-center text-lg font-semibold text-gray-900">
          {item.quantity}
        </span>
        <QuantityButton onClick={onIncrease} label="Increase quantity">
          +
        </QuantityButton>
      </div>
    </div>
  );
}

function QuantityButton({ onClick, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-base font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-100"
    >
      {children}
    </button>
  );
}

/* ─── Order summary ───────────────────────────────────────────────────────── */

function OrderSummary({ totalPrice }) {
  return (
    // sticky-top with top: 90px accounts for navbar height.
    // z-[1] keeps it below the modal (z-[100]) and navbar (z-50).
    <div className="sticky top-[90px] z-[1] rounded-2xl bg-white p-6 shadow">
      <div className="mb-6 text-center">
        <h5 className="text-lg font-bold text-gray-900">Order Summary</h5>
      </div>

      <div className="mb-4 flex justify-between">
        <span className="text-gray-400">Subtotal</span>
        <span className="font-semibold text-gray-900">
          $ {totalPrice.toFixed(2)}
        </span>
      </div>

      <div className="mb-4 flex justify-between">
        <span className="text-gray-400">Shipping</span>
        <span className="font-semibold text-green-600">Free</span>
      </div>

      <div className="mb-6 flex items-center justify-between border-t border-gray-100 pt-4">
        <h5 className="text-lg font-bold text-gray-900">Total</h5>
        <h5 className="text-lg font-bold text-green-600">
          $ {totalPrice.toFixed(2)}
        </h5>
      </div>

      {/* hover scale + dark bg mirrors original onMouseEnter/Leave inline style */}
      <button
        type="button"
        onClick={() => alert("Your order is placed")}
        className="w-full rounded-2xl bg-black py-3 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.03] hover:bg-[#343a40]"
      >
        Checkout
      </button>
    </div>
  );
}
