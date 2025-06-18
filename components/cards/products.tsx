"use client";

import { DetailCard } from "../elements/detail-card";

export const ProductsCards = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center w-full">
      <DetailCard
        title="Total Products"
        details="1420"
        icon="hugeicons:tags"
        iconColor="#5C1978"
        bgColor="#F6F2F7"
      />
      <DetailCard
        title="In Stock"
        details="1365"
        icon="hugeicons:checkmark-square-02"
        iconColor="#24A148"
        bgColor="#F1F9F3"
      />
      <DetailCard
        title="Low Stock"
        details="12"
        icon="hugeicons:alert-02"
        iconColor="#F1C21B"
        bgColor="#FEFAEC"
      />
      <DetailCard
        title="Out of Stock"
        details="43"
        icon="hugeicons:multiplication-sign-square"
        iconColor="#DA1E28"
        bgColor="#FCEDEE"
      />
    </div>
  );
};
