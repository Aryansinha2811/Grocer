import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FilterSidebar, { type FilterState } from "../components/listing/FilterSidebar";
import ProductGrid from "../components/listing/ProductGrid";
import type { Product } from "../types";
import { mockProducts, mockCategories } from "../lib/mockData";

const defaultFilters: FilterState = {
    categories: [],
    inStockOnly: false,
    maxPrice: 1000,
    sort: "popularity",
};

export default function ProductListingPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [filters, setFilters] = useState<FilterState>(defaultFilters);
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const activeCategory = useMemo(
        () => mockCategories.find((c) => c.id === id),
        [id]
    );

    const baseProducts = useMemo(() => {
        if (!id || id === "all") return mockProducts;
        return mockProducts.filter((p) => p.category === activeCategory?.name);
    }, [id, activeCategory]);

    const filteredProducts = useMemo(() => {
        let list = baseProducts;

        if (filters.categories.length > 0) {
            list = list.filter((p) => filters.categories.includes(p.category));
        }
        if (filters.inStockOnly) {
            list = list.filter((p) => p.inStock);
        }
        list = list.filter((p) => p.price <= filters.maxPrice);

        const sorted = [...list];
        switch (filters.sort) {
            case "price_low":
                sorted.sort((a, b) => a.price - b.price);
                break;
            case "price_high":
                sorted.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
                break;
            default:
                break;
        }
        return sorted;
    }, [baseProducts, filters]);

    const availableCategories = useMemo(
        () => Array.from(new Set(baseProducts.map((p) => p.category))),
        [baseProducts]
    );

    const handleAdd = (product: Product) => {
        setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
    };

    const handleIncrement = (product: Product) => {
        setQuantities((prev) => ({ ...prev, [product.id]: (prev[product.id] ?? 0) + 1 }));
    };

    const handleDecrement = (product: Product) => {
        setQuantities((prev) => {
            const next = (prev[product.id] ?? 0) - 1;
            const updated = { ...prev };
            if (next <= 0) delete updated[product.id];
            else updated[product.id] = next;
            return updated;
        });
    };

    const cartCount = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

    return (
        <div className="min-h-screen w-full bg-transparent">
            <Header
                locationLabel="Connaught Place, New Delhi"
                cartCount={cartCount}
                onCartClick={() => navigate("/cart")}
            />

            <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
                <h1 className="mb-5 text-xl font-extrabold text-[#0D0E12]">
                    {activeCategory ? activeCategory.name : "All products"}
                </h1>

                <div className="flex flex-col gap-6 md:flex-row">
                    <FilterSidebar
                        availableCategories={availableCategories}
                        filters={filters}
                        onChange={setFilters}
                        onClearAll={() => setFilters(defaultFilters)}
                        className="md:w-56 md:shrink-0"
                    />

                    <div className="flex-1">
                        <ProductGrid
                            products={filteredProducts}
                            quantities={quantities}
                            onAdd={handleAdd}
                            onIncrement={handleIncrement}
                            onDecrement={handleDecrement}
                            onClearFilters={() => setFilters(defaultFilters)}
                            onOpenProduct={(product) => navigate(`/product/${product.id}`)}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}