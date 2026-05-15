import Link from "next/link";

export default function BannerComp() {
  return (
    <div
      className="flex items-center text-white"
      style={{
        height: "65vh",
        backgroundImage:
          'linear-gradient(to top, rgba(0,0,0,0.79), transparent), url("/homebanner.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          STEP INTO STYLE
        </h1>
        <p className="mt-4 text-lg font-light sm:text-xl">
          Discover the latest Sneekers that define comfort and fashion.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded bg-white/75 px-6 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-white"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
