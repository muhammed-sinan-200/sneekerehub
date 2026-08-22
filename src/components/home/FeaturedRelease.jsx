import Image from "next/image";
import {
  FeaturedReleaseBannerOverlay,
  FeaturedReleaseTextGrid,
} from "./FeaturedReleaseSections";

const BANNER_IMG = "/Banner2.avif";

export default function FeaturedRelease() {
  return (
    <section aria-label="Featured release">
      <div className="group relative isolate overflow-hidden bg-gray-950 text-white">
        <div className="relative h-[46vh] min-h-[340px] sm:h-[52vh] lg:h-[58vh] lg:max-h-[640px]">
          <Image
            src={BANNER_IMG}
            alt="Adidas Samba featured release"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
            aria-hidden
          />

          <FeaturedReleaseBannerOverlay />
        </div>
      </div>

      <FeaturedReleaseTextGrid />
    </section>
  );
}
