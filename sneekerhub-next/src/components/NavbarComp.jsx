"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiUser } from "react-icons/ci";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useCart } from "@/context/CartContext";
import { LOGO_SRC } from "@/lib/site";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/shop", label: "SHOP" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

function NavLink({ href, label, onNavigate }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`border-b-2 border-transparent pb-0.5 text-sm font-semibold tracking-wide text-gray-900 transition-colors hover:border-[#ff8800] ${
        isActive ? "border-[#ff8800]" : ""
      }`}
    >
      {label}
    </Link>
  );
}

export default function NavbarComp() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, isHydrated } = useCart();
  const cartCount = isHydrated ? cartItems.length : 0;

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-100 shadow-[0_0.5px_15px_rgba(0,0,0,0.3)]">
      <div className="relative mx-auto w-full max-w-[1920px] px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 py-2 lg:py-3">
          <Link href="/" className="ms-2 shrink-0 sm:ms-4" onClick={closeMenu}>
            <img
              src={LOGO_SRC}
              alt="SneekerHub"
              className="h-auto max-h-[60px] w-auto sm:max-h-[70px]"
            />
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border-0 p-2 text-gray-900 shadow-none lg:hidden"
            aria-expanded={isOpen}
            aria-controls="main-navigation"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
          </button>

          <div
            id="main-navigation"
            className={`${
              isOpen ? "flex" : "hidden"
            } absolute left-0 right-0 top-full flex-col border-t border-gray-200 bg-gray-100 px-4 py-5 shadow-md lg:static lg:flex lg:flex-1 lg:flex-row lg:items-center lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
          >
            <nav className="mx-auto flex w-full max-w-4xl flex-col gap-6 lg:flex-row lg:items-center lg:gap-4">
              <ul className="flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:gap-6 lg:pe-6">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <NavLink {...link} onNavigate={closeMenu} />
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-6 lg:ms-auto lg:me-4 lg:gap-8">
                <Link
                  href="/cartPage"
                  onClick={closeMenu}
                  className="relative inline-flex text-gray-900 transition-opacity hover:opacity-80"
                  aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
                >
                  <PiShoppingCartSimpleThin size={30} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 left-full min-w-5 -translate-x-1/2 rounded-full bg-red-600 px-1.5 py-0.5 text-center text-xs font-semibold text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/"
                  onClick={closeMenu}
                  className="inline-flex text-gray-900 transition-opacity hover:opacity-80"
                  aria-label="Account"
                >
                  <CiUser size={30} />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
