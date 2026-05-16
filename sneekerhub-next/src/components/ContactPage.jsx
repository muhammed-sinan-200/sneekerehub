import { CONTACT_DETAILS, SOCIAL_LINKS } from "@/lib/site";

export default function ContactPage() {
  return (
    <div className="w-full bg-white">
      <div className="border-b border-gray-100 py-10 text-center">
        <h1 className="text-3xl font-semibold tracking-wide text-gray-900 sm:text-4xl">
          CONTACT US
        </h1>
        <p className="mt-3 text-base text-gray-500">
          We&apos;d love to hear from you. Reach out and we&apos;ll get back to you shortly.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">

          {/* ── Left: contact info ─────────────────────────────────────── */}
          <div>
            <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              GET IN TOUCH
            </h2>
            <div className="mb-8 h-0.5 w-10 bg-[#ff8800]" />

            <p className="mb-8 text-base leading-relaxed text-gray-600">
              Have a question about an order, a product, or just want to say
              hello? Fill in the form or reach us directly through any of the
              channels below.
            </p>

            <ul className="mb-10 flex flex-col gap-5">
              {CONTACT_DETAILS.map(({ id, icon: Icon, iconSize, text, align }) => (
                <li key={id} className={`flex gap-4 text-gray-800 ${align}`}>
                  <Icon size={iconSize} className="shrink-0 text-gray-700" />
                  <span className="text-base">{text}</span>
                </li>
              ))}
            </ul>

            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-400">
                Follow Us
              </p>
              <div className="flex gap-5">
                {SOCIAL_LINKS.map(({ href, label, icon: Icon, hoverClass }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`text-gray-700 transition-colors ${hoverClass}`}
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: inquiry form ────────────────────────────────────── */}
          <div className="rounded-sm border border-gray-100 bg-gray-50 p-8">
            <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              SEND A MESSAGE
            </h2>
            <div className="mb-8 h-0.5 w-10 bg-[#ff8800]" />

            <form className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="name" label="Name" type="text" placeholder="Your name" />
                <FormField id="email" label="Email" type="email" placeholder="your@email.com" />
              </div>

              <FormField id="subject" label="Subject" type="text" placeholder="What's this about?" />

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help…"
                  className="w-full resize-none border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="self-start rounded-none border border-black bg-white px-7 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-black hover:text-white"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

function FormField({ id, label, type, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
      />
    </div>
  );
}
