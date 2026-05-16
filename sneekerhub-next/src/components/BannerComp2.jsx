export default function BannerComp2() {
  return (
    <>
      <div
        className="my-10 flex items-center text-white"
        style={{
          height: "50vh",
          backgroundImage:
            'linear-gradient(to top, rgba(0,0,0,0.79), transparent), url("/Banner2.avif")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            ADIDAS-SAMBA IS BACK
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-10 grid gap-8 md:grid-cols-2">
          <p className="text-base leading-relaxed text-gray-700">
            Searching for your perfect sneaker? At The SneekerHub, you can
            explore thousands of styles from Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Odit, a, obcaecati cupiditate sint
            pariatur, ab iure animi quia recusandae saepe veniam ullam
            doloremque vero incidunt veritatis officiis nobis sequi iste?!
          </p>
          <p className="text-base leading-relaxed text-gray-700">
            Stay up to date with upcoming sneaker releases with our sneaker
            release calendar and Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptate quo possimus alias aperiam,
            exercitationem animi maxime cum consectetur. Quia quae quas sint
            suscipit laborum, iure magnam placeat veniam expedita aliquam.
          </p>
        </div>
      </div>
    </>
  );
}
