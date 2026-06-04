"use client";

export default function StoryBanner() {
  const text = [
    "SNEAKER CULTURE",
    "OUR STORY",
    "EST. 1959",
    "CRAFTED WITH PASSION",
    "OUR STORY",
    "EST. 1959",
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* extra width fixes white edge issue */}
      <div className="relative left-[-5%] w-[110%]">
        {/* Slanted Banner */}
        <div className="-rotate-[3deg] border-y-[3px] border-black bg-black py-5 origin-center will-change-transform">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...text, ...text].map((item, i) => (
              <div
                key={i}
                className="mx-10 flex items-center text-4xl font-black uppercase tracking-tight text-[#ff8800] sm:text-5xl lg:text-6xl"
              >
                {item}
                <span className="ml-10 text-[#ff8800]">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}