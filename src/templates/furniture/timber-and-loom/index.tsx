"use client";

import { useState } from "react";
import { timberSans, timberSerif } from "./styles/fonts";
import { TimberGlobalStyle } from "./styles/GlobalStyle";
import type { TimberCategory, TimberProduct } from "./data/timber-data";
import { TimberAnnouncement } from "./components/TimberAnnouncement";
import { TimberHeader } from "./components/TimberHeader";
import { CinematicHero } from "./sections/CinematicHero";
import { FeaturedCollections } from "./sections/FeaturedCollections";
import { BestSellers, type TimberCategoryFilter } from "./sections/BestSellers";
import { NewArrivals } from "./sections/NewArrivals";
import { BrandPhilosophy } from "./sections/BrandPhilosophy";
import { LifestyleBanner } from "./sections/LifestyleBanner";
import { FeaturedPromo } from "./sections/FeaturedPromo";
import { TimberTestimonials } from "./sections/TimberTestimonials";
import { TimberNewsletter } from "./sections/TimberNewsletter";
import { TimberFooter } from "./components/TimberFooter";
import { TimberProductModal } from "./components/TimberProductModal";
import { TimberCartDrawer, type TimberCartItem } from "./components/TimberCartDrawer";

export default function TimberAndLoomTemplate() {
  const [activeCategory, setActiveCategory] = useState<TimberCategoryFilter>("All");
  const [inspected, setInspected] = useState<TimberProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<TimberCartItem[]>([]);

  const handleSelectCategoryAndScroll = (category: TimberCategory) => {
    setActiveCategory(category);
    const el = document.getElementById("tl-bestsellers");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = (product: TimberProduct, finish: string) => {
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

  const handleRemove = (id: string, finish: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === id && item.finish === finish)),
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div id="tl-top" className={`${timberSerif.variable} ${timberSans.variable}`}>
      <TimberGlobalStyle />
      <TimberAnnouncement />
      <TimberHeader cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <CinematicHero
          onSelectCategory={handleSelectCategoryAndScroll}
          onInspectProduct={setInspected}
        />
        <FeaturedCollections onSelectCategory={handleSelectCategoryAndScroll} />
        <BestSellers
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onInspectProduct={setInspected}
          onAddToCart={handleAddToCart}
        />
        <NewArrivals
          onInspectProduct={setInspected}
          onAddToCart={handleAddToCart}
        />
        <BrandPhilosophy />
        <LifestyleBanner onInspectProduct={setInspected} />
        <FeaturedPromo onAddToCart={handleAddToCart} />
        <TimberTestimonials />
        <TimberNewsletter />
      </main>
      <TimberFooter onSelectCategory={handleSelectCategoryAndScroll} />

      <TimberProductModal
        key={inspected?.id ?? "none"}
        product={inspected}
        onClose={() => setInspected(null)}
        onAddToCart={handleAddToCart}
      />

      <TimberCartDrawer
        key={cartOpen ? "open" : "closed"}
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onClear={() => setCart([])}
      />
    </div>
  );
}

