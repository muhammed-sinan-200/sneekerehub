import HeroBanner from "@/components/home/HeroBanner";
import NewArrivals from "@/components/home/NewArrivals";
import FeaturedRelease from "@/components/home/FeaturedRelease";
import productsData from "../../public/Products.json";

export default function HomePage() {
  const newArrivals = productsData.filter((p) => p.category === "new");

  return (
    <div>
      <HeroBanner />
      <NewArrivals products={newArrivals} />
      <FeaturedRelease />
    </div>
  );
}
