import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductRow from "@/components/home/ProductRow";
import OffersBanner from "@/components/home/OffersBanner";
import ValueProps from "@/components/home/ValueProps";

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <CategoryGrid />
      <ProductRow
        title="Trending Now"
        viewAllHref="/products?sortBy=rating&direction=desc"
        queryParams={{ page: 1, size: 4, sortBy: "rating", direction: "desc" }}
      />
      <OffersBanner />
      <ProductRow
        title="New Arrivals"
        viewAllHref="/products?sortBy=createdAt&direction=desc"
        queryParams={{ page: 1, size: 4, sortBy: "createdAt", direction: "desc" }}
      />
      <ValueProps />
    </div>
  );
}