"use client";

import { useState } from "react";
import { oaklineDisplay, oaklineSans } from "./styles/fonts";
import { OaklineGlobalStyle } from "./styles/GlobalStyle";
import type { OaklineCategory, OaklineProduct } from "./data/oakline-data";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { OakHeader } from "./components/OakHeader";
import { HeroBanner } from "./sections/HeroBanner";
import { FeaturedCategories } from "./sections/FeaturedCategories";
import { BestSellers, type OaklineCategoryFilter } from "./sections/BestSellers";
import { FeaturedCollections } from "./sections/FeaturedCollections";
import { BrandStory } from "./sections/BrandStory";
import { PromoBanner } from "./sections/PromoBanner";
import { Testimonials } from "./sections/Testimonials";
import { Newsletter } from "./sections/Newsletter";
import { OakFooter } from "./components/OakFooter";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { CartDrawer, type CartItem } from "./components/CartDrawer";

export default function OaklineInteriorsTemplate() {
  const [activeCategory, setActiveCategory] = useState<OaklineCategoryFilter>("All");
  const [inspectedProduct, setInspectedProduct] = useState<OaklineProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleSelectCategoryAndScroll = (category: OaklineCategory) => {
    setActiveCategory(category);
    const el = document.getElementById("oak-products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = (product: OaklineProduct, finish: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id && i.finish === finish);
      if (idx >= 0) {
        return prev.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { product, finish, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (id: string, finish: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === id && item.finish === finish
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (id: string, finish: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === id && item.finish === finish)),
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div id="oak-top" className={`${oaklineDisplay.variable} ${oaklineSans.variable}`}>
      <OaklineGlobalStyle />
      <AnnouncementBar />
      <OakHeader cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <HeroBanner />
        <FeaturedCategories onSelectCategory={handleSelectCategoryAndScroll} />
        <BestSellers
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onInspectProduct={setInspectedProduct}
          onAddToCart={handleAddToCart}
        />
        <FeaturedCollections onSelectCollection={handleSelectCategoryAndScroll} />
        <BrandStory />
        <PromoBanner />
        <Testimonials />
        <Newsletter />
      </main>
      <OakFooter onSelectCategory={handleSelectCategoryAndScroll} />

      <ProductDetailModal
        key={inspectedProduct?.id ?? "none"}
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        key={cartOpen ? "open" : "closed"}
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveItem}
        onClear={() => setCart([])}
      />
    </div>
  );
}
