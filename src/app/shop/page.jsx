import ShopCarousel from "@/components/shop/ShopCarousel";
import ShopProducts from "@/components/shop/ShopProducts";
import productsData from "../../../public/Products.json";

export default function ShopPage() {
  return (
    <div>
      <ShopCarousel />
      <ShopProducts products={productsData} />
    </div>
  );
}
