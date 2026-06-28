import { SlidersHorizontal, X } from "lucide-react";

export type SortOption = "popularity" | "price_low" | "price_high" | "rating";

export interface FilterState {
    categories: string[];
    inStockOnly: boolean;
    maxPrice: number;
    sort: SortOption;
}

interface FilterSidebarProps {
    availableCategories: string[];
    filters: FilterState;
    priceCeiling?: number;
    onChange: (filters: FilterState) => void;
    onClearAll?: () => void;
    className?: string;
}

const sortOptions: { value: SortOption; label: string }[] = [
    { value: "popularity", label: "Popularity" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
];

export default function FilterSidebar({
    availableCategories,
    filters,
    priceCeiling = 1000,
    onChange,
    onClearAll,
    className = "",
}: FilterSidebarProps) {
    const toggleCategory = (category: string) => {
        const next = filters.categories.includes(category)
            ? filters.categories.filter((c) => c !== category)
            : [...filters.categories, category];
        onChange({ ...filters, categories: next });
    };

    const hasActiveFilters =
        filters.categories.length > 0 || filters.inStockOnly || filters.maxPrice < priceCeiling;

    return (
        <aside className={`w-full bg-transparent ${className}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-[#FF451D]" />
                    <h3 className="text-sm font-bold text-[#2b2b2b]"
                    style={{ fontFamily: "Bold, sans-serif" }}
                    >Filters</h3>
                </div>
                {hasActiveFilters && onClearAll && (
                    <button
                        type="button"
                        onClick={onClearAll}
                        className="flex items-center gap-1 text-xs font-semibold text-[#0D0E12]/50 hover:text-[#FF451D]"
                        style={{ fontFamily: "Medium, sans-serif" }}
                    >
                        <X size={12} />
                        Clear all
                    </button>
                )}
            </div>

            {/* Sort */}
            <div className="mt-5">
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#0D0E12]/40"
                style={{ fontFamily: "Medium, sans-serif" }}
                >
                    Sort by
                </h4>
                <div className="flex flex-col gap-1">
                    {sortOptions.map((opt) => (
                        <label
                            key={opt.value}
                            className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 text-xs text-[#0D0E12]/75 hover:bg-[#0D0E12]/[0.03] cursor-pointer"
                            style={{fontFamily: "Regular, sans-serif"}}
                        >
                            <input
                                type="radio"
                                name="sort"
                                checked={filters.sort === opt.value}
                                onChange={() => onChange({ ...filters, sort: opt.value })}
                                className="h-3.5 w-3.5 accent-[#FF451D]"
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
            </div>

            {/* Categories */}
            {availableCategories.length > 0 && (
                <div className="mt-5">
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#0D0E12]/40"
                    style={{ fontFamily: "Medium, sans-serif" }}
                    >
                        Category
                    </h4>
                    <div className="flex flex-col gap-1">
                        {availableCategories.map((category) => (
                            <label
                                key={category}
                                className="flex items-center gap-2 rounded-lg px-1.5 py-1.5 text-xs text-[#0D0E12]/75 hover:bg-[#0D0E12]/[0.03] cursor-pointer"
                                style={{fontFamily: "Regular, sans-serif"}}
                            >
                                <input
                                    type="checkbox"
                                    checked={filters.categories.includes(category)}
                                    onChange={() => toggleCategory(category)}
                                    className="h-3.5 w-3.5 rounded accent-[#FF451D]"
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Price */}
            <div className="mt-5">
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#0D0E12]/40"
                style={{ fontFamily: "Medium, sans-serif" }}
                >
                    Max price: ₹{filters.maxPrice}
                </h4>
                <input
                    type="range"
                    min={0}
                    max={priceCeiling}
                    step={10}
                    value={filters.maxPrice}
                    onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
                    className="w-full accent-[#FF451D]"
                />
            </div>

            {/* In stock */}
            <div className="mt-5">
                <label className="flex items-center gap-2 text-sm text-[#0D0E12]/75 cursor-pointer"
                style={{ fontFamily: "Medium, sans-serif" }}
                >
                    <input
                        type="checkbox"
                        checked={filters.inStockOnly}
                        onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
                        className="h-3.5 w-3.5 rounded accent-[#FF451D]"
                    />
                    In stock only
                </label>
            </div>
        </aside>
    );
}