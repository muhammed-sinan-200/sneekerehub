import Link from "next/link";
import { LOGO_SRC, CONTACT_DETAILS, SOCIAL_LINKS } from "@/lib/site";

const SHOP_LINKS = [
  { href: "/shop", label: "New Arrivals" },
  { href: "/shop", label: "All Sneakers" },
  { href: "/shop", label: "Best Sellers" },
  { href: "/shop", label: "Sale" },
];

const HELP_LINKS = [
  { href: "#", label: "Shipping & Returns" },
  { href: "#", label: "Size Guide" },
  { href: "#", label: "FAQ" },
  { href: "#", label: "Track Order" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
  { href: "#", label: "Careers" },
  { href: "#", label: "Press" },
];

const LEGAL_LINKS = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Cookies" },
];

export default function FooterComp() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto bg-gray-50">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="sm:col-span-3 lg:col-span-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-4"
              aria-label="SneekerHub — Home"
            >
              <img
                src={LOGO_SRC}
                alt=""
                className="h-auto max-h-[64px] w-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
              <div>
                <span className="block text-2xl font-black uppercase leading-none tracking-[-0.02em] text-gray-900 lg:text-3xl">
                  SneekerHub
                </span>
                <span className="mt-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.24em] text-gray-500">
                  Elevate your style
                </span>
              </div>
            </Link>

            <p className="mt-7 max-w-md text-sm font-light leading-relaxed text-gray-600">
              Premium sneakers. Curated drops. Worldwide delivery. SneekerHub
              brings together the season&apos;s most coveted silhouettes for
              every step.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <span
                className="h-px w-8 bg-[#ff8800] sm:w-10"
                aria-hidden
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gray-500 sm:text-[11.5px]">
                Get in Touch
              </span>
            </div>

            <ul className="mt-5 flex flex-col gap-3.5 text-sm text-gray-700">
              {CONTACT_DETAILS.map(
                ({ id, icon: Icon, iconSize, text, align }) => (
                  <li key={id} className={`flex gap-3 ${align}`}>
                    <Icon
                      size={iconSize}
                      className="shrink-0 text-gray-500"
                      aria-hidden
                    />
                    <span className="leading-snug">{text}</span>
                  </li>
                ),
              )}
            </ul>
          </div>

          <FooterLinkColumn
            title="Shop"
            links={SHOP_LINKS}
            className="lg:col-span-2"
          />
          <FooterLinkColumn
            title="Help"
            links={HELP_LINKS}
            className="lg:col-span-2"
          />
          <FooterLinkColumn
            title="Company"
            links={COMPANY_LINKS}
            className="lg:col-span-3"
          />
        </div>
      </div>

      <div className="border-t border-black/[0.06]">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row sm:gap-4">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-gray-500 sm:justify-start">
              <span>© {currentYear} SneekerHub</span>
              {LEGAL_LINKS.map((link) => (
                <span key={link.label} className="flex items-center gap-3">
                  <span className="text-gray-300" aria-hidden>
                    ·
                  </span>
                  <a
                    href={link.href}
                    className="transition-colors duration-200 hover:text-black"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-all duration-200 hover:scale-110 hover:bg-white hover:shadow-[0_4px_14px_rgba(15,23,42,0.08)] ${hoverClass}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({ title, links, className = "" }) {
  return (
    <div className={className}>
      <h5 className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-gray-900">
        {title}
      </h5>
      <ul className="flex flex-col gap-3">
        {links.map(({ href, label }) => (
          <li key={`${title}-${label}`}>
            <Link
              href={href}
              className="group inline-flex items-center text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-black"
            >
              <span className="border-b border-transparent pb-px transition-colors duration-200 group-hover:border-black/50">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
