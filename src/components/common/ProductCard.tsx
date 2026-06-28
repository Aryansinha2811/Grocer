import { Plus, Minus, Star, Clock } from "lucide-react";
import type { Product } from "../../types";

interface ProductCardProps {
    product: Product;
    quantity?: number;
    onAdd?: (product: Product) => void;
    onIncrement?: (product: Product) => void;
    onDecrement?: (product: Product) => void;
    onOpen?: (product: Product) => void;
}

export default function ProductCard({
    product,
    quantity = 0,
    onAdd,
    onIncrement,
    onDecrement,
    onOpen,
}: ProductCardProps) {
    const hasDiscount = product.mrp && product.mrp > product.price;
    const discountPct = hasDiscount
        ? Math.round(((product.mrp! - product.price) / product.mrp!) * 100)
        : 0;

    return (
        <div className="group relative flex w-full h-[300px] flex-col rounded-2xl bg-transparent border border-[#0D0E12]/8 p-3 transition-all duration-300 hover:border-[#FF451D]/30 hover:shadow-lg">
            {/* Image */}
            <button
                type="button"
                onClick={() => onOpen?.(product)}
                className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-[#0D0E12]/[0.03] text-left"
            >
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {hasDiscount && (
                    <span className="absolute left-2 top-2 rounded-full bg-[#0D0E12] px-2 py-0.5 text-[10px] font-bold text-white">
                        {discountPct}% OFF
                    </span>
                )}
                {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
                        <span className="rounded-full bg-[#0D0E12] px-3 py-1 text-xs font-semibold text-white">
                            Out of stock
                        </span>
                    </div>
                )}
            </button>

            {/* Delivery ETA */}
            {product.deliveryEta && (
                <div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-[#0D0E12]/50">
                    <Clock size={11} />
                    {product.deliveryEta}
                </div>
            )}

            {/* Name */}
            <button type="button" onClick={() => onOpen?.(product)} className="text-left">
                <h3 className="line-clamp-2 text-xs font-semibold text-[#0D0E12]"
                style={{ fontFamily: "Bold, sans-serif" }}
                >
                    {product.name}
                </h3>
            </button>

            {/* Unit + rating */}
            <div className="mt-1 flex items-center gap-2 text-xs text-[#0D0E12]/50"
            style={{ fontFamily: "Regular, sans-serif" }}
            >
                <span>{product.unit}</span>
                {product.rating !== undefined && (
                    <span className="flex items-center gap-0.5">
                        <Star size={11} className="fill-[#FF8A22] text-[#FF8A22]" />
                        {product.rating.toFixed(1)}
                    </span>
                )}
            </div>

            {/* Price + Add control */}
            <div className="mt-3 flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                    <span className="text-sm text-[#0D0E12]"
                    style={{ fontFamily: "Medium, sans-serif" }}
                    >
                        ₹{product.price}
                    </span>
                    {hasDiscount && (
                        <span className="text-xs text-[#0D0E12]/40 line-through">
                            ₹{product.mrp}
                        </span>
                    )}
                </div>

                {quantity === 0 ? (
                    <button
                        type="button"
                        disabled={!product.inStock}
                        onClick={() => onAdd?.(product)}
                        className="rounded-full border-2 border-[#FF451D] px-4 py-1 text-xs font-bold text-[#FF451D] transition-all duration-300 hover:text-white hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                        style={{}}
                        onMouseEnter={(e) => {
                            if (product.inStock) e.currentTarget.style.background = "var(--gradient-primary)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                        }}
                    >
                        ADD
                    </button>
                ) : (
                    <div
                        className="flex items-center gap-2 rounded-full px-1 py-1 text-white"
                        style={{ background: "var(--gradient-primary)" }}
                    >
                        <button
                            type="button"
                            onClick={() => onDecrement?.(product)}
                            className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-white/20"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={12} />
                        </button>
                        <span className="min-w-[1ch] text-xs font-bold">{quantity}</span>
                        <button
                            type="button"
                            onClick={() => onIncrement?.(product)}
                            className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-white/20"
                            aria-label="Increase quantity"
                        >
                            <Plus size={12} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}