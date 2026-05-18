"use client";

import BannerComp from "./BannerComp";
import NewArrivalsComp from "./NewArrivalsComp";
import BannerComp2 from "./BannerComp2";
import { useModal } from "@/context/ModalContext";

export default function HomeLayout() {
  const { openModal } = useModal();

  return (
    <div>
      <BannerComp />
      <NewArrivalsComp onProductClick={openModal} />
      <BannerComp2 />
    </div>
  );
}
