"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineBars3,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { LOGO_SRC } from "@/lib/site";

const NavbarAuthControls = dynamic(
  () => import("@/components/layout/NavbarAuthControls"),
  { ssr: false },
);

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/shop", label: "SHOP" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

const BRAND_ACCENT = "#ff8800";

function isLinkActive(href, pathname) {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function DesktopNavLink({ href, label, isActive, onNavigate }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group relative inline-flex items-center py-1 text-[12.5px] font-semibold uppercase tracking-[0.2em] text-gray-700 transition-colors duration-200 hover:text-black"
    >
      <span className={isActive ? "text-black" : ""}>{label}</span>
      <span
        aria-hidden
        className={`pointer-events-none absolute -bottom-0.5 left-0 h-[2px] bg-[#ff8800] transition-[width] duration-300 ease-out ${isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
      />
    </Link>
  );
}

function DesktopSignedOutLinks({ onNavigate }) {
  return (
    <div className="hidden items-center gap-5 sm:flex">
      <Link
        href="/sign-in"
        onClick={onNavigate}
        className="group relative inline-flex items-center py-1 text-[12.5px] font-semibold uppercase tracking-[0.2em] text-gray-700 transition-colors duration-200 hover:text-black"
      >
        <span>Login</span>
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-0 bg-black transition-[width] duration-300 ease-out group-hover:w-full"
        />
      </Link>

      <Link
        href="/sign-up"
        onClick={onNavigate}
        className="group relative inline-flex items-center py-1 text-[12.5px] font-semibold uppercase tracking-[0.2em] text-gray-700 transition-colors duration-200 hover:text-black"
      >
        <span>Sign Up</span>
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-0 bg-black transition-[width] duration-300 ease-out group-hover:w-full"
        />
      </Link>
    </div>
  );
}

function MobileSignedOutLinks({ onNavigate }) {
  return (
    <div className="flex gap-2">
      <Link
        href="/sign-in"
        onClick={onNavigate}
        className="flex flex-1 items-center justify-center border border-neutral-200 py-3 text-xs font-medium tracking-wide text-neutral-900 transition-colors duration-200 hover:border-neutral-900"
      >
        <HiOutlineUser className="mr-2 h-4 w-4" aria-hidden />
        Sign In
      </Link>

      <Link
        href="/sign-up"
        onClick={onNavigate}
        className="flex flex-1 items-center justify-center bg-neutral-900 py-3 text-xs font-medium tracking-wide text-white transition-colors duration-200 hover:bg-neutral-800"
      >
        Sign Up
      </Link>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [signedInConfirmed, setSignedInConfirmed] = useState(false);

  const userMenuRef = useRef(null);
  const desktopSignedInRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const mobileFooterRef = useRef(null);

  const { cartItems, isHydrated } = useCart();
  const cartCount = isHydrated ? cartItems.length : 0;
  const cartBadge = cartCount > 99 ? "99+" : cartCount;

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isUserMenuOpen) return;
    const onPointerDown = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isUserMenuOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ${isScrolled
          ? "border-b border-black/[0.06] bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          : "border-b border-black/[0.04] bg-white/95 backdrop-blur-md"
          }`}
      >
        <div className="relative mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <div
            className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 transition-[padding] duration-300 ${isScrolled ? "py-2.5" : "py-3.5 lg:py-4"
              }`}
          >
            <Link
              href="/"
              className="flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.02]"
              onClick={closeMenu}
              aria-label="SneekerHub — Home"
            >
              <img
                src={LOGO_SRC}
                alt="SneekerHub"
                className={`h-auto w-auto transition-[max-height] duration-300 ${isScrolled
                  ? "max-h-[44px] sm:max-h-[50px]"
                  : "max-h-[52px] sm:max-h-[60px]"
                  }`}
              />
            </Link>

            <nav
              className="hidden items-center justify-center gap-10 lg:flex"
              aria-label="Primary"
            >
              {NAV_LINKS.map((link) => (
                <DesktopNavLink
                  key={link.href}
                  {...link}
                  isActive={isLinkActive(link.href, pathname)}
                  onNavigate={closeMenu}
                />
              ))}
            </nav>

            <div className="flex items-center justify-end gap-0.5 sm:gap-1">
              {!signedInConfirmed && (
                <DesktopSignedOutLinks onNavigate={closeMenu} />
              )}
              <div ref={desktopSignedInRef} />

              <Link
                href="/cartPage"
                onClick={closeMenu}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:text-black"
                aria-label={`Shopping bag${cartCount > 0 ? `, ${cartCount} items` : ""}`}
              >
                <HiOutlineShoppingBag className="h-[22px] w-[22px]" />
                {cartCount > 0 && (
                  <span
                    className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none text-black shadow-sm ring-2 ring-white"
                    style={{ backgroundColor: BRAND_ACCENT }}
                  >
                    {cartBadge}
                  </span>
                )}
              </Link>

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center text-neutral-900 transition-colors duration-200 hover:text-neutral-500 lg:hidden"
                aria-expanded={isOpen}
                aria-controls="mobile-drawer"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsOpen((open) => !open)}
              >
                {isOpen ? (
                  <HiOutlineXMark className="h-6 w-6" />
                ) : (
                  <HiOutlineBars3 className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        onClick={closeMenu}
        aria-hidden
      />

      <aside
        id="mobile-drawer"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[320px] flex-col border-l border-neutral-100 bg-white transition-transform duration-250 ease-out lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        aria-hidden={!isOpen}
      >
        <div className="flex shrink-0 items-center justify-end px-5 pt-5 pb-1">
          <button
            type="button"
            onClick={closeMenu}
            className="inline-flex h-9 w-9 items-center justify-center text-neutral-900 transition-colors duration-200 hover:text-neutral-500"
            aria-label="Close menu"
          >
            <HiOutlineXMark className="h-6 w-6" />
          </button>
        </div>

        <div ref={mobileProfileRef} />

        <nav className="flex-1 overflow-y-auto px-5" aria-label="Mobile">
          <ul className="border-t border-neutral-100">
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link.href, pathname);
              return (
                <li key={link.href} className="border-b border-neutral-100">
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center py-4 pl-3 text-sm font-medium tracking-[0.12em] transition-colors duration-200 ${isActive
                      ? "border-l-2 border-[#ff8800] text-neutral-900"
                      : "border-l-2 border-transparent text-neutral-500 hover:text-neutral-900"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-neutral-100 px-5 py-4">
          {!signedInConfirmed && (
            <MobileSignedOutLinks onNavigate={closeMenu} />
          )}
          <div ref={mobileFooterRef} />
        </div>
      </aside>

      <NavbarAuthControls
        closeMenu={closeMenu}
        isUserMenuOpen={isUserMenuOpen}
        setIsUserMenuOpen={setIsUserMenuOpen}
        userMenuRef={userMenuRef}
        onSignedInChange={setSignedInConfirmed}
        desktopSignedInRef={desktopSignedInRef}
        mobileProfileRef={mobileProfileRef}
        mobileFooterRef={mobileFooterRef}
      />
    </>
  );
}
