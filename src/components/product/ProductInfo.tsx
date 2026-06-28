import { Star, Clock, Minus, Plus, ShieldCheck } from "lucide-react";
import type { Product } from "../../types";
import Button from "../common/Button";

interface ProductInfoProps {
    product: Product;
    quantity?: number;
    onAdd?: (product: Product) => void;
    onIncrement?: (product: Product) => void;
    onDecrement?: (product: Product) => void;
}

export default function ProductInfo({
    product,
    quantity = 0,
    onAdd,
    onIncrement,
    onDecrement,
}: ProductInfoProps) {
    const hasDiscount = product.mrp && product.mrp > product.price;
    const discountPct = hasDiscount
        ? Math.round(((product.mrp! - product.price) / product.mrp!) * 100)
        : 0;

    return (
        <div className="w-full bg-transparent">
            {product.merchantName && (
                <span className="text-xs text-[#0D0E12]/45"
                style={{ fontFamily: "Medium, sans-serif" }}
                >
                    Sold by {product.merchantName}
                </span>
            )}

            <h1 className="mt-1 text-2xl font-extrabold text-[#0D0E12]"
            style={{ fontFamily: "Bold, sans-serif" }}
            >{product.name}</h1>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#0D0E12]/55"
            style={{ fontFamily: "Regular, sans-serif" }}
            >
                <span>{product.unit}</span>
                {product.rating !== undefined && (
                    <span className="flex items-center gap-1">
                        <Star size={14} className="fill-[#FF8A22] text-[#FF8A22]" />
                        {product.rating.toFixed(1)}
                    </span>
                )}
                {product.deliveryEta && (
                    <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {product.deliveryEta}
                    </span>
                )}
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-2"
            style={{ fontFamily: "Medium, sans-serif" }}
            >
                <span className="text-3xl font-extrabold text-[#0D0E12]">₹{product.price}</span>
                {hasDiscount && (
                    <>
                        <span className="text-base text-[#0D0E12]/40 line-through">
                            ₹{product.mrp}
                        </span>
                        <span className="rounded-full bg-[#FF451D]/10 px-2 py-0.5 text-xs font-bold text-[#FF451D]">
                            {discountPct}% OFF
                        </span>
                    </>
                )}
            </div>
            <p className="mt-1 text-xs text-[#0D0E12]/40"
            style={{ fontFamily: "Regular, sans-serif" }}
            >Inclusive of all taxes</p>

            {/* Stock status */}
            {!product.inStock && (
                <p className="mt-3 inline-block rounded-full bg-[#0D0E12]/[0.06] px-3 py-1 text-xs font-semibold text-[#0D0E12]/60">
                    Currently out of stock
                </p>
            )}

            {/* Add to cart / stepper */}
            <div className="mt-6 text-sm"
            style={{ fontFamily: "Medium, sans-serif" }}
            >
                {quantity === 0 ? (
                    <Button
                        variant="primary"
                        size="md"
                        fullWidth
                        disabled={!product.inStock}
                        onClick={() => onAdd?.(product)}
                    >
                        Add to cart
                    </Button>
                ) : (
                    <div
                        className="flex w-full items-center justify-between rounded-full px-3 py-2 text-white"
                        style={{ background: "var(--gradient-primary)" }}
                    >
                        <button
                            type="button"
                            onClick={() => onDecrement?.(product)}
                            aria-label="Decrease quantity"
                            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/20"
                        >
                            <Minus size={18} />
                        </button>
                        <span className="text-base font-bold">{quantity} in cart</span>
                        <button
                            type="button"
                            onClick={() => onIncrement?.(product)}
                            aria-label="Increase quantity"
                            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/20"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* Trust badge */}
            <div className="mt-5 flex items-start gap-2 rounded-xl bg-[#0D0E12]/[0.03] p-3">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#FF451D]" />
                <p className="text-[10px] text-[#0D0E12]/60"
                style={{ fontFamily: "Regular, sans-serif" }}
                >
                    Sourced fresh from a verified kirana partner near you. Easy returns if
                    you're not satisfied.
                </p>
            </div>
        </div>
    );
}