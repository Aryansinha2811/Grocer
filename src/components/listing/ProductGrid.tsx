import { PackageSearch } from "lucide-react";
import type { Product } from "../../types";
import ProductCard from "../common/ProductCard";
import EmptyState from "../common/EmptyState";

interface ProductGridProps {
    products: Product[];
    quantities?: Record<string, number>;
    isLoading?: boolean;
    onAdd?: (product: Product) => void;
    onIncrement?: (product: Product) => void;
    onDecrement?: (product: Product) => void;
    onClearFilters?: () => void;
    onOpenProduct?: (product: Product) => void;
}

function SkeletonCard() {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-[#0D0E12]/8 p-3">
            <div className="aspect-square animate-pulse rounded-xl bg-[#0D0E12]/[0.05]" />
            <div className="h-3.5 w-3/4 animate-pulse rounded bg-[#0D0E12]/[0.05]" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-[#0D0E12]/[0.05]" />
            <div className="h-7 w-full animate-pulse rounded-full bg-[#0D0E12]/[0.05]" />
        </div>
    );
}

export default function ProductGrid({
    products,
    quantities = {},
    isLoading = false,
    onAdd,
    onIncrement,
    onDecrement,
    onClearFilters,
    onOpenProduct,
}: ProductGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-3 bg-transparent sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <EmptyState
                icon={<PackageSearch size={32} />}
                title="No products found"
                description="Try adjusting your filters or search for something else."
                actionLabel={onClearFilters ? "Clear filters" : undefined}
                onAction={onClearFilters}
            />
        );
    }

    return (
        <div className="grid grid-cols-2 gap-3 bg-transparent sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantities[product.id] ?? 0}
                    onAdd={onAdd}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    onOpen={onOpenProduct}
                />
            ))}
        </div>
    );
}