import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageViewerProps {
    images: string[];
    alt: string;
}

export default function ProductImageViewer({ images, alt }: ProductImageViewerProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (images.length === 0) return null;

    const goTo = (index: number) => {
        const next = (index + images.length) % images.length;
        setActiveIndex(next);
    };

    return (
        <div className="w-full bg-transparent">
            {/* Main image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#0D0E12]/[0.03]">
                <img
                    src={images[activeIndex]}
                    alt={`${alt} — image ${activeIndex + 1}`}
                    className="h-full w-full object-cover"
                />

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => goTo(activeIndex - 1)}
                            aria-label="Previous image"
                            className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#0D0E12] shadow-md backdrop-blur-sm transition-transform hover:scale-110"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => goTo(activeIndex + 1)}
                            aria-label="Next image"
                            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#0D0E12] shadow-md backdrop-blur-sm transition-transform hover:scale-110"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {images.map((img, index) => (
                        <button
                            key={img + index}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            aria-label={`View image ${index + 1}`}
                            className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${index === activeIndex
                                    ? "border-[#FF451D]"
                                    : "border-transparent opacity-60 hover:opacity-100"
                                }`}
                        >
                            <img src={img} alt="" className="h-full w-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}