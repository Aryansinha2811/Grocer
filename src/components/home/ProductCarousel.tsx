import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { Product } from "../../types";
import ProductCard from "../common/ProductCard";

interface ProductCarouselProps {
    title: string;
    subtitle?: string;
    products: Product[];
    quantities?: Record<string, number>;
    onAdd?: (product: Product) => void;
    onIncrement?: (product: Product) => void;
    onDecrement?: (product: Product) => void;
    onSeeAll?: () => void;
    onOpenProduct?: (product: Product) => void;
}

export default function ProductCarousel({
    title,
    subtitle,
    products,
    quantities = {},
    onAdd,
    onIncrement,
    onDecrement,
    onSeeAll,
    onOpenProduct,
}: ProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollBy = (dir: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.8;
        el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    };

    if (products.length === 0) return null;

    return (
        <section className="w-full bg-transparent">
            <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl text-[#2b2b2b]"
                        style={{ fontFamily: "Bold, sans-serif" }}
                        >{title}</h2>
                        {subtitle && (
                            <p className="text-xs text-[#0D0E12]/50"
                            style={{ fontFamily: "Regular, sans-serif" }}
                            >{subtitle}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {onSeeAll && (
                            <button
                                type="button"
                                onClick={onSeeAll}
                                className="hidden items-center gap-1 text-sm font-semibold text-[#FF451D] sm:flex"
                                style={{ fontFamily: "Bold, sans-serif" }}
                            >
                                See all
                                <ArrowRight size={14} />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => scrollBy("left")}
                            aria-label="Scroll left"
                            className="hidden h-8 w-8 items-center justify-center rounded-full bg-[#0D0E12]/[0.04] text-[#0D0E12]/60 transition-colors hover:bg-[#FF451D]/10 hover:text-[#FF451D] md:flex"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollBy("right")}
                            aria-label="Scroll right"
                            className="hidden h-8 w-8 items-center justify-center rounded-full bg-[#0D0E12]/[0.04] text-[#0D0E12]/60 transition-colors hover:bg-[#FF451D]/10 hover:text-[#FF451D] md:flex"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Scrollable row */}
                <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {products.map((product) => (
                        <div key={product.id} className="w-40 shrink-0 sm:w-44">
                            <ProductCard
                                product={product}
                                quantity={quantities[product.id] ?? 0}
                                onAdd={onAdd}
                                onIncrement={onIncrement}
                                onDecrement={onDecrement}
                                onOpen={onOpenProduct}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}