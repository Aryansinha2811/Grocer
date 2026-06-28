import { useState } from "react";
import { MapPin, Search, ShoppingCart, ChevronDown, User } from "lucide-react";
import logo from "../../assets/Grocer.png";
import LocationModal from "./LocationModal";

interface HeaderProps {
    locationLabel?: string;
    cartCount?: number;
    onLocationChange?: (location: string) => void;
    onSearch?: (query: string) => void;
    onCartClick?: () => void;
    onLoginClick?: () => void;
}

export default function Header({
    locationLabel = "Set delivery location",
    cartCount = 0,
    onLocationChange,
    onSearch,
    onCartClick,
    onLoginClick,
}: HeaderProps) {
    const [query, setQuery] = useState("");
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [location, setLocation] = useState(locationLabel);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(query);
    };

    const handleLocationConfirm = (value: string) => {
        setLocation(value);
        onLocationChange?.(value);
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-md border-b border-[#0D0E12]/8">
            <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
                {/* Logo */}
                <a href="/" className="flex items-center gap-1.5 shrink-0">
                    <img src={logo} alt="Grocer Logo" className="h-6 w-6 object-contain mr-2" />
                    <span
                        className="text-2xl tracking-tight bg-clip-text text-transparent"
                        style={{ backgroundImage: "var(--gradient-primary)", fontFamily: "Logo2, sans-serif" }}
                    >
                        G r o c e r
                    </span>
                </a>

                {/* Location selector */}
                <button
                    type="button"
                    onClick={() => setIsLocationModalOpen(true)}
                    className="hidden shrink-0 items-center gap-1.5 rounded-full border border-[#0D0E12]/12 bg-white px-3 py-1.5 text-left shadow-sm transition-colors hover:bg-[#0D0E12]/5 md:flex"
                >
                    <MapPin size={16} className="text-[#FF451D]" />
                    <span className="max-w-[160px] truncate text-xs font-medium text-[#0D0E12]" style={{ fontFamily: "Bold, sans-serif" }}>
                        {location}
                    </span>
                    <ChevronDown size={14} className="text-[#0D0E12]/40" />
                </button>

                {/* Search */}
                <form onSubmit={handleSubmit} className="relative flex-1">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0D0E12]/40"
                    />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for atta, fruits, milk..."
                        className="w-full rounded-full bg-[#0D0E12]/[0.04] py-2.5 pl-10 pr-4 text-xs text-[#0D0E12] outline-none transition-colors focus:bg-[#0D0E12]/[0.07] focus:ring-2 focus:ring-[#FF451D]/30 placeholder-transparent md:placeholder:text-[#0D0E12]/40"
                        style={{ fontFamily: "Regular, sans-serif" }}
                    />
                </form>

                {/* Login */}
                <button
                    type="button"
                    onClick={onLoginClick}
                    className="relative shrink-0 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
                    style={{ background: "var(--gradient-primary)" }}
                >
                    <span
                        className="flex items-center gap-1.5 rounded-full bg-white px-4 py-[9px] text-xs font-bold text-[#0D0E12]"
                        style={{ fontFamily: "Bold, sans-serif" }}
                    >
                        <User size={14} className="text-[#FF451D]" />
                        <span className="hidden md:inline">Login</span>
                    </span>
                </button>

                {/* Cart */}
                <button
                    type="button"
                    onClick={onCartClick}
                    className="relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold text-white transition-transform duration-300 hover:scale-105"
                    style={{ background: "var(--gradient-primary)", fontFamily: "Bold, sans-serif" }}
                >
                    <ShoppingCart size={16} />
                    <span className="hidden md:inline">Cart</span>
                    {cartCount > 0 && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#0D0E12] px-1 text-[10px] font-bold text-white">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Mobile location row */}
            <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="flex w-full items-center gap-1 px-4 pb-2.5 md:hidden"
            >
                <MapPin size={14} className="text-[#FF451D]" />
                <span className="truncate text-xs font-medium text-[#0D0E12]/80">{location}</span>
                <ChevronDown size={12} className="text-[#0D0E12]/40" />
            </button>

            <LocationModal
                isOpen={isLocationModalOpen}
                initialValue={location}
                onClose={() => setIsLocationModalOpen(false)}
                onConfirm={handleLocationConfirm}
            />
        </header>
    );
}