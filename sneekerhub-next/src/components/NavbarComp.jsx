"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { useUser, useClerk } from "@clerk/nextjs";
import { useCart } from "@/context/CartContext";
import { LOGO_SRC } from "@/lib/site";

function SignedIn({ children }) {
  const { isLoaded, isSignedIn } = useUser();
  return isLoaded && isSignedIn ? children : null;
}

function SignedOut({ children }) {
  const { isLoaded, isSignedIn } = useUser();
  return isLoaded && !isSignedIn ? children : null;
}

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
        className={`pointer-events-none absolute -bottom-0.5 left-0 h-[2px] bg-[#ff8800] transition-[width] duration-300 ease-out ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

export default function NavbarComp() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);

  const { cartItems, isHydrated } = useCart();
  const cartCount = isHydrated ? cartItems.length : 0;
  const cartBadge = cartCount > 99 ? "99+" : cartCount;

  const { user } = useUser();
  const { signOut } = useClerk();

  const closeMenu = () => setIsOpen(false);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  const userInitial =
    (user?.firstName?.[0] || user?.username?.[0] || "U").toUpperCase();
  const userDisplayName =
    user?.fullName || user?.firstName || user?.username || "Account";
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";

  const handleSignOut = async () => {
    closeUserMenu();
    closeMenu();
    try {
      await signOut({ redirectUrl: "/" });
    } catch {
      // Clerk may throw if already signed out — safe to ignore.
    }
  };

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
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300 ${
          isScrolled
            ? "border-b border-black/[0.06] bg-white/85 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            : "border-b border-black/[0.04] bg-white/95 backdrop-blur-md"
        }`}
      >
        <div className="relative mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <div
            className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 transition-[padding] duration-300 ${
              isScrolled ? "py-2.5" : "py-3.5 lg:py-4"
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
                className={`h-auto w-auto transition-[max-height] duration-300 ${
                  isScrolled
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
              <SignedOut>
                <div className="hidden items-center gap-1.5 sm:flex">
                  <Link
                    href="/sign-in"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center rounded-full px-3.5 py-2 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:text-black"
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center rounded-full bg-black px-3.5 py-2 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-[#ff8800] hover:text-black"
                  >
                    Sign Up
                  </Link>
                </div>
              </SignedOut>

              <SignedIn>
                <div
                  className="relative hidden sm:block"
                  ref={userMenuRef}
                >
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:text-black"
                    aria-label="Open account menu"
                    aria-haspopup="menu"
                    aria-expanded={isUserMenuOpen}
                  >
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt=""
                        className="h-8 w-8 rounded-full object-cover ring-1 ring-black/10"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-gray-700 text-[11px] font-bold uppercase text-white">
                        {userInitial}
                      </span>
                    )}
                  </button>

                  <div
                    role="menu"
                    aria-label="Account menu"
                    aria-hidden={!isUserMenuOpen}
                    className={`absolute right-0 top-full z-50 mt-2 w-64 origin-top-right rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] ring-1 ring-black/5 transition-all duration-200 ease-out motion-reduce:transition-none ${
                      isUserMenuOpen
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none -translate-y-1 scale-95 opacity-0"
                    }`}
                  >
                    <div className="border-b border-black/5 px-4 py-3">
                      <p className="truncate text-[13px] font-semibold text-gray-900">
                        {userDisplayName}
                      </p>
                      {userEmail && (
                        <p className="truncate text-[11.5px] text-gray-500">
                          {userEmail}
                        </p>
                      )}
                    </div>
                    <div className="py-1.5">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        role="menuitem"
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[12.5px] font-medium text-gray-800 transition-colors hover:bg-gray-50 hover:text-black"
                      >
                        <HiOutlineArrowRightOnRectangle className="h-4 w-4 text-gray-500" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </SignedIn>

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
                className="ml-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-900 transition-colors duration-200 hover:bg-gray-100 active:scale-95 lg:hidden"
                aria-expanded={isOpen}
                aria-controls="mobile-drawer"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsOpen((open) => !open)}
              >
                {isOpen ? (
                  <HiOutlineXMark className="h-7 w-7" />
                ) : (
                  <HiOutlineBars3 className="h-7 w-7" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden
      />

      <aside
        id="mobile-drawer"
        className={`fixed right-0 top-0 z-50 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">
            Menu
          </span>
          <button
            type="button"
            onClick={closeMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 hover:text-black"
            aria-label="Close menu"
          >
            <HiOutlineXMark className="h-6 w-6" />
          </button>
        </div>

        <SignedOut>
          <div className="grid grid-cols-2 gap-2.5 border-b border-black/5 px-5 py-4">
            <Link
              href="/sign-in"
              onClick={closeMenu}
              className="inline-flex items-center justify-center rounded-full border border-black/15 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-900 transition-colors hover:border-black hover:bg-black hover:text-white"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              onClick={closeMenu}
              className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#ff8800] hover:text-black"
            >
              Sign Up
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-3 border-b border-black/5 px-5 py-4">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt=""
                className="h-11 w-11 rounded-full object-cover ring-1 ring-black/10"
              />
            ) : (
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-gray-700 text-sm font-bold uppercase text-white">
                {userInitial}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">
                {userDisplayName}
              </p>
              {userEmail && (
                <p className="truncate text-[12px] text-gray-500">
                  {userEmail}
                </p>
              )}
            </div>
          </div>
        </SignedIn>

        <nav className="flex-1 overflow-y-auto px-5 py-4" aria-label="Mobile">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link, idx) => {
              const isActive = isLinkActive(link.href, pathname);
              return (
                <li
                  key={link.href}
                  className={`transform transition-all duration-300 ease-out ${
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${idx * 60 + 120}ms` : "0ms",
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`group flex items-center justify-between border-b border-black/5 py-4 text-[15px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                      isActive ? "text-black" : "text-gray-800 hover:text-black"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                          isActive
                            ? "scale-100 bg-[#ff8800]"
                            : "scale-0 bg-[#ff8800] group-hover:scale-100"
                        }`}
                      />
                      {link.label}
                    </span>
                    <span
                      aria-hidden
                      className="text-gray-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-black"
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-black/5 bg-white px-5 py-5">
          <div className="grid grid-cols-2 gap-3">
            <SignedOut>
              <Link
                href="/sign-in"
                onClick={closeMenu}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-900 transition-colors hover:border-black hover:bg-black hover:text-white"
              >
                <HiOutlineUser className="h-4 w-4" />
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-900 transition-colors hover:border-black hover:bg-black hover:text-white"
              >
                <HiOutlineArrowRightOnRectangle className="h-4 w-4" />
                Logout
              </button>
            </SignedIn>
            <Link
              href="/cartPage"
              onClick={closeMenu}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#ff8800] hover:text-black"
            >
              <HiOutlineShoppingBag className="h-4 w-4" />
              Bag{cartCount > 0 ? ` · ${cartBadge}` : ""}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
