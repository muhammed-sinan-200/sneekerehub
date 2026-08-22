"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  HiOutlineXMark,
  HiOutlineCheckBadge,
  HiArrowRight,
} from "react-icons/hi2";

export default function CheckoutSuccessModal({ open, onClose, onContinue }) {
  const shouldReduceMotion = useReducedMotion();
  const [animPhase, setAnimPhase] = useState("loading");

  const RING_R = 36;
  const RING_CIRCUM = 2 * Math.PI * RING_R;

  const arcOffset =
    animPhase === "loading"
      ? RING_CIRCUM * 0.70
      : animPhase === "sealing"
        ? RING_CIRCUM * 0.06
        : 0;

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
          <div className="relative mx-auto h-[88px] w-[88px]">
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

            <svg
              width="88"
              height="88"
              viewBox="0 0 88 88"
              fill="none"
              aria-hidden
              className="absolute inset-0"
            >
              <circle
                cx="44"
                cy="44"
                r={RING_R}
                stroke="#f3f4f6"
                strokeWidth="2"
              />
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
