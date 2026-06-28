import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import HeroBanner from "../components/home/HeroBanner";
import CategoryGrid from "../components/home/CategoryGrid";
import ProductCarousel from "../components/home/ProductCarousel";
import type { Category, Product } from "../types";
import { mockCategories, mockProducts } from "../lib/mockData";

export default function HomePage() {
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState<Record<string, number>>({});

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
            if (next <= 0) {
                delete updated[product.id];
            } else {
                updated[product.id] = next;
            }
            return updated;
        });
    };

    const cartCount = useMemo(
        () => Object.values(quantities).reduce((sum, qty) => sum + qty, 0),
        [quantities]
    );

    const trendingProducts = mockProducts;
    const dealsProducts = useMemo(
        () => mockProducts.filter((p) => p.mrp && p.mrp > p.price),
        []
    );

    const handleCategorySelect = (category: Category) => {
        navigate(`/category/${category.id}`);
    };

    return (
        <div className="min-h-screen w-full bg-transparent">
            <Header
                locationLabel="Connaught Place, New Delhi"
                cartCount={cartCount}
                onCartClick={() => navigate("/cart")}
                onSearch={(query) => navigate(`/category/all?q=${encodeURIComponent(query)}`)}
            />

            <main>

                <HeroBanner />

                <CategoryGrid categories={mockCategories} onSelect={handleCategorySelect} />

                <ProductCarousel
                    title="Trending near you"
                    subtitle="Most ordered from your local kirana stores"
                    products={trendingProducts}
                    quantities={quantities}
                    onAdd={handleAdd}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onSeeAll={() => navigate("/category/all")}
                    onOpenProduct={(product) => navigate(`/product/${product.id}`)}
                />

                {dealsProducts.length > 0 && (
                    <ProductCarousel
                        title="Deals for you"
                        subtitle="Limited time offers on everyday essentials"
                        products={dealsProducts}
                        quantities={quantities}
                        onAdd={handleAdd}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                        onSeeAll={() => navigate("/category/all")}
                        onOpenProduct={(product) => navigate(`/product/${product.id}`)}
                    />
                )}
            </main>

            <Footer />
        </div>
    );
}