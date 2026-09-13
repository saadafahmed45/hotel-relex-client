"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, UtensilsCrossed, Wine, Flame, Sparkles, X } from "lucide-react";

export default function DiningSection() {
  const [menuModalOpen, setMenuModalOpen] = useState(false);

  const sampleMenu = [
    {
      category: "First Courses",
      items: [
        { name: "Carpaccio di Ricciola", desc: "Yellowtail kingfish, citrus citronette, finger lime, caper berries", price: "$28" },
        { name: "Heirloom Burrata Artisanal", desc: "Smoked confit tomatoes, Sicilian oregano, 25-year aged balsamic", price: "$24" },
        { name: "Tartare di Manzo Wagyu", desc: "A5 Kagoshima wagyu, quail egg yolk, black winter truffle pearls", price: "$36" },
      ],
    },
    {
      category: "Mains & Grill",
      items: [
        { name: "Branzino in Crosta di Sale", desc: "Wild sea bass roasted in sea salt crust, braised fennel, saffron reduction", price: "$54" },
        { name: "Risotto all'Astice e Caviale", desc: "Acquerello aged carnaroli rice, Brittany blue lobster, Oscietra caviar", price: "$62" },
        { name: "Filetto di Manzo Rossini", desc: "Prime Black Angus tenderloin, seared duck foie gras, Madeira jus", price: "$68" },
      ],
    },
    {
      category: "Dolci & Cellar",
      items: [
        { name: "Cioccolato Fondente Amedei", desc: "Warm 70% Tuscan single-origin chocolate soufflé, pistachio gelato", price: "$20" },
        { name: "Millefoglie alla Crema Vaniglia", desc: "Crispy caramelized puff pastry, Tahitian vanilla bean cream", price: "$18" },
      ],
    },
  ];

  return (
    <>
      <section id="dining" className="py-24 lg:py-36 bg-stone-100 border-t border-b border-stone-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Asymmetric Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT: Editorial Narrative & Gastronomy Highlights */}
            <div className="lg:col-span-6 space-y-7 order-2 lg:order-1">
              <div className="space-y-3">
                <span className="text-xs font-subheading tracking-[0.25em] text-gold font-semibold uppercase block">
                  CULINARY ARTISTRY
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-[1.12]">
                  Exceptional <br />
                  <span className="italic">Dining.</span>
                </h2>
              </div>

              <p className="text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
                From intimate breakfasts overlooking the azure horizon to memorable candlelit evenings, discover flavors crafted to complement your stay. Our culinary philosophy centers on organic local harvests, freshly landed seafood, and vintage wine cellar pairings.
              </p>

              {/* Curated highlights list */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 bg-white/80 border border-stone-border rounded-sm">
                  <UtensilsCrossed className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base font-semibold text-charcoal">The Relex Atelier</h4>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      Seven-course evening tasting menus celebrating modern Mediterranean and coastal gastronomy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/80 border border-stone-border rounded-sm">
                  <Wine className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base font-semibold text-charcoal">The Sommelier’s Cellar</h4>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      Over 650 vintage selections from Bordeaux, Tuscany, and rare boutique organic vineyards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#contact"
                  className="px-7 py-3.5 bg-charcoal text-white hover:bg-black uppercase tracking-[0.2em] text-xs font-medium rounded-sm transition flex items-center gap-2 shadow-sm"
                >
                  <span>Explore Dining</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setMenuModalOpen(true)}
                  className="px-7 py-3.5 bg-white text-charcoal hover:bg-stone-200 border border-stone-300 uppercase tracking-[0.2em] text-xs font-medium rounded-sm transition flex items-center gap-2"
                >
                  <span>View Menu</span>
                </button>
              </div>
            </div>

            {/* RIGHT: Large Cinematic Imagery with Overlap */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:max-w-none overflow-hidden rounded-sm shadow-2xl border border-stone-200 image-zoom-container">
                <Image
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=85"
                  alt="Fine dining table arrangement with ocean sunset view"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Small Floating Image Card */}
              <div className="absolute -bottom-8 -left-4 sm:left-4 w-44 sm:w-56 aspect-[4/3] rounded-sm overflow-hidden shadow-xl border-2 border-white hidden sm:block">
                <Image
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
                  alt="Gourmet dish detail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLE MENU MODAL */}
      {menuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-3xl bg-ivory border border-stone-300 rounded-sm shadow-2xl p-6 sm:p-10 my-8">
            <button
              onClick={() => setMenuModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-charcoal-muted hover:text-charcoal transition rounded-full"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 mb-8">
              <span className="text-[10px] font-subheading tracking-[0.25em] text-gold font-semibold uppercase">
                THE RELEX ATELIER
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
                Autumn Degustation Menu
              </h3>
              <p className="text-xs text-charcoal-muted font-light">
                Executive Chef Antoine Moreau • Sommelier Selection Included
              </p>
            </div>

            <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2">
              {sampleMenu.map((sec) => (
                <div key={sec.category} className="space-y-4">
                  <h4 className="text-xs font-subheading tracking-[0.2em] text-gold font-bold uppercase pb-2 border-b border-stone-200">
                    {sec.category}
                  </h4>
                  <div className="space-y-4">
                    {sec.items.map((dish) => (
                      <div key={dish.name} className="flex justify-between items-start gap-4">
                        <div>
                          <span className="font-serif text-base font-semibold text-charcoal block">
                            {dish.name}
                          </span>
                          <span className="text-xs text-charcoal-muted font-light block mt-0.5">
                            {dish.desc}
                          </span>
                        </div>
                        <span className="font-serif text-base font-semibold text-charcoal-muted flex-shrink-0">
                          {dish.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 text-center">
              <p className="text-xs text-charcoal-muted mb-4">
                Tasting menus are tailored for dietary preferences with 24-hour advance notice.
              </p>
              <button
                onClick={() => setMenuModalOpen(false)}
                className="px-8 py-3 bg-charcoal text-white hover:bg-black text-xs uppercase tracking-widest font-medium rounded-sm transition"
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
