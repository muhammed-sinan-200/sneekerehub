const SECTIONS = [
  {
    id: "story",
    heading: "ON 1959",
    image: "/about-img/about-img-old.jpg",
    reversed: false,
    text: "In 1959, our journey began with a simple idea: to create footwear that combined style, comfort, and innovation. Starting from a small workshop, our founders poured passion into every pair, establishing a brand that would eventually redefine sneaker culture. Every step we took laid the foundation for the community and legacy we celebrate today.",
  },
  {
    id: "history",
    heading: "HISTORY & MILESTONES",
    image: "/about-img/about-img2.jpg",
    // reversed: image stays first in DOM (shows on top on mobile),
    // md:flex-row-reverse flips the desktop order to text-left / image-right.
    reversed: true,
    text: "Over the decades, we've achieved remarkable milestones that shaped our brand. From our first limited edition release in 1975 to collaborating with legendary athletes and designers in the 1990s, each moment reflects our dedication to quality and authenticity. These pivotal experiences not only expanded our reach but also strengthened our connection with sneaker enthusiasts worldwide.",
  },
  {
    id: "vision",
    heading: "Our Vision & Legacy",
    image: "/about-img/about-img1.webp",
    reversed: false,
    text: "Today, we continue to honor our roots while pushing boundaries in design and innovation. Our vision is to craft sneakers that inspire self-expression and celebrate culture. From iconic collaborations to limited-edition drops, every creation tells a story — a story of heritage, creativity, and the enduring love for sneakers that unites our global community.",
  },
];

export default function AboutComp() {
  return (
    <div className="w-full pb-8">
      <div className="py-6 text-center">
        <h1 className="text-3xl font-semibold tracking-wide text-gray-900 sm:text-4xl">
          OUR STORY
        </h1>
      </div>

      {SECTIONS.map((section) => (
        <AboutSection key={section.id} {...section} />
      ))}
    </div>
  );
}

function AboutSection({ heading, text, image, reversed }) {
  return (
    <div
      className={`flex flex-col bg-white md:items-stretch ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* Image block — always first in DOM so it renders on top on mobile */}
      <div
        className="h-[450px] w-full shrink-0 md:w-1/2"
        style={{
          backgroundImage: `url("${image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label={heading}
      />

      <div className="flex w-full flex-col justify-center px-10 py-10 text-start md:w-1/2 md:px-12 lg:px-16">
        <h3 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl">
          {heading}
        </h3>
        <p className="text-lg leading-relaxed text-[rgb(31,31,31)] sm:text-xl">
          {text}
        </p>
      </div>
    </div>
  );
}
