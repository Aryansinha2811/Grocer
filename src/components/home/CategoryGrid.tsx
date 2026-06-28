import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Category } from "../../types";

interface CategoryGridProps {
    categories: Category[];
    onSelect?: (category: Category) => void;
}

export default function CategoryGrid({ categories, onSelect }: CategoryGridProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    if (categories.length === 0) return null;

    const updateArrows = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    useEffect(() => {
        updateArrows();
        const onResize = () => updateArrows();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [categories]);

    const scrollByAmount = (dir: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.8;
        el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    };

    return (
        <section className="w-full bg-transparent">
            <div className="relative mx-auto max-w-6xl px-4 py-6 md:px-6">
                {canScrollLeft && (
                    <button
                        type="button"
                        onClick={() => scrollByAmount("left")}
                        aria-label="Scroll left"
                        className="absolute left-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0D0E12] shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 md:left-0"
                    >
                        <ChevronLeft size={18} />
                    </button>
                )}

                {canScrollRight && (
                    <button
                        type="button"
                        onClick={() => scrollByAmount("right")}
                        aria-label="Scroll right"
                        className="absolute right-1 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0D0E12] shadow-md ring-1 ring-black/5 transition-transform hover:scale-105 md:right-0"
                    >
                        <ChevronRight size={18} />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    onScroll={updateArrows}
                    className="flex gap-5 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => onSelect?.(category)}
                            className="group flex shrink-0 flex-col items-center gap-2 rounded-2xl bg-transparent p-2 transition-transform duration-300 hover:scale-105"
                            style={{ width: "84px" }}
                        >
                            <div className="relative flex h-30 w-30 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#0D0E12]/[0.04] to-[#0D0E12]/[0.07] ring-1 ring-[#0D0E12]/[0.04] transition-colors duration-300 group-hover:bg-[#FF451D]/10 sm:h-20 sm:w-20">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    loading="lazy"
                                    className="h-50 w-50 object-cover"
                                />
                            </div>
                            <span className="line-clamp-2 text-center text-xs text-[#0D0E12]/75 group-hover:text-[#0D0E12]"
                            style={{ fontFamily: "Bold, sans-serif" }}
                            >
                                {category.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}