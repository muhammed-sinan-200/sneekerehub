import Link from "next/link";
import { LOGO_SRC, CONTACT_DETAILS, SOCIAL_LINKS } from "@/lib/site";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function FooterComp() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-100 pt-12 pb-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <section className="mb-10">
          <h3 className="mb-4 text-xl font-bold tracking-tight text-gray-900">
            CONTACT US
          </h3>
          <p className="max-w-3xl text-base leading-relaxed text-gray-700">
            We love connecting with our sneeker community at sneeker@community.com
            or hit us on twitter, facebook and instagram.
          </p>
          <h5 className="mb-4 mt-8 text-base font-bold text-gray-900">ADDRESS</h5>
          <ul className="flex flex-col gap-4 text-gray-800">
            {CONTACT_DETAILS.map(({ id, icon: Icon, iconSize, text, align }) => (
              <li key={id} className={`flex gap-3 ${align}`}>
                <Icon size={iconSize} className="shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 flex flex-wrap items-center gap-5">
          <img src={LOGO_SRC} alt="SneekerHub logo" className="h-auto max-h-[70px] w-auto" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">SneekerHub</h2>
            <p className="text-gray-800">elevate your style</p>
          </div>
        </section>

        <section className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h5 className="mb-4 text-base font-bold text-gray-900">FOLLOW US</h5>
            <div className="mb-4 flex flex-wrap gap-4">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`text-gray-900 transition-colors ${hoverClass}`}
                >
                  <Icon size={30} />
                </a>
              ))}
            </div>
            <p className="text-sm font-light text-gray-500">
              By clicking this link you will be directed to Lorem ipsum dolor sit
              amet consectetur adipisicing elit.
            </p>
          </div>

          <div className="md:text-start">
            <h5 className="mb-4 text-base font-bold text-gray-900">QUICK LINKS</h5>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-900 no-underline transition-colors hover:text-[#ff8800]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <p className="mt-12 text-center text-sm text-gray-800">
          &copy;2025 SneekerHub. All rights reserved
        </p>
      </div>
    </footer>
  );
}
