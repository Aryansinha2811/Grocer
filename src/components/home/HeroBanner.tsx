import { ArrowRight } from "lucide-react";
import FoodItems from "../../assets/Images/Grocery.png";

interface HeroBannerProps {
    onShopNow?: () => void;
}

export default function HeroBanner({ onShopNow }: HeroBannerProps) {
    return (
        <section className="relative w-full overflow-hidden bg-transparent">
            <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-8">
                <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{ background: "var(--gradient-primary)" }}
                >
                    <div className="relative flex items-center justify-between px-6 py-10 md:px-12 md:py-14">
                        {/* Text */}
                        <div className="relative z-10 max-w-lg">
                            <h1
                                className="text-xl leading-tight text-white md:text-3xl"
                                style={{ fontFamily: "Bold, sans-serif" }}
                            >
                                Stock on Pantry Essentials
                            </h1>
                            <p
                                className="mt-3 max-w-md text-sm text-white/85 md:text-base"
                                style={{ fontFamily: "Regular, sans-serif" }}
                            >
                                Find your daily kitchen supplies like rice, dals, oils and dairy.
                            </p>

                            <div className="mt-3">
                                <button
                                    type="button"
                                    onClick={onShopNow}
                                    className="relative inline-flex rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
                                    style={{ background: "var(--gradient-primary)" }}
                                >
                                    <span
                                        className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0D0E12]"
                                        style={{ fontFamily: "Bold, sans-serif" }}
                                    >
                                        Shop Now
                                        <ArrowRight size={16} className="text-[#FF451D]" />
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Food image - right corner */}
                        <img
                            src={FoodItems}
                            alt="Fresh food items"
                            className="pointer-events-none absolute -right-2 bottom-0 hidden h-[100%] w-auto max-w-[50%] object-contain md:right-4 md:block md:max-w-[42%]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}