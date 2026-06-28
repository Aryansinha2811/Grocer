import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProductImageViewer from "../components/product/ProductImageViewer";
import ProductInfo from "../components/product/ProductInfo";
import ReviewsList from "../components/product/ReviewsList";
import EmptyState from "../components/common/EmptyState";
import type { Product } from "../types";
import { mockProducts, mockReviews } from "../lib/mockData";

export default function ProductDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const product = useMemo(
        () => mockProducts.find((p) => p.id === id),
        [id]
    );

    const handleAdd = (p: Product) => {
        setQuantities((prev) => ({ ...prev, [p.id]: 1 }));
    };

    const handleIncrement = (p: Product) => {
        setQuantities((prev) => ({ ...prev, [p.id]: (prev[p.id] ?? 0) + 1 }));
    };

    const handleDecrement = (p: Product) => {
        setQuantities((prev) => {
            const next = (prev[p.id] ?? 0) - 1;
            const updated = { ...prev };
            if (next <= 0) delete updated[p.id];
            else updated[p.id] = next;
            return updated;
        });
    };

    const cartCount = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

    if (!product) {
        return (
            <div className="min-h-screen w-full bg-transparent">
                <Header cartCount={cartCount} onCartClick={() => navigate("/cart")} />
                <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
                    <EmptyState
                        title="Product not found"
                        description="This product may have been removed or is no longer available."
                        actionLabel="Back to home"
                        onAction={() => navigate("/")}
                    />
                </main>
                <Footer />
            </div>
        );
    }

    // Backend currently returns a single image per product; viewer supports a
    // gallery, so we pass it as a one-item array until multi-image is added.
    const images = [product.image];

    return (
        <div className="min-h-screen w-full bg-transparent">
            <Header cartCount={cartCount} onCartClick={() => navigate("/cart")} />

            <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
                <div className="grid gap-8 md:grid-cols-2">
                    <ProductImageViewer images={images} alt={product.name} />

                    <ProductInfo
                        product={product}
                        quantity={quantities[product.id] ?? 0}
                        onAdd={handleAdd}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                    />
                </div>

                <section className="mt-10 border-t border-[#0D0E12]/8 pt-8">
                    <h2 className="mb-5 text-lg text-[#2b2b2b]"
                    style={{ fontFamily: "Bold, sans-serif" }}
                    >Ratings & reviews</h2>
                    <ReviewsList reviews={mockReviews} averageRating={product.rating} />
                </section>
            </main>

            <Footer />
        </div>
    );
}