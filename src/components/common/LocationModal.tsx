import { useState, useEffect, useRef } from "react";
import { MapPin, X, Navigation } from "lucide-react";

interface LocationModalProps {
    isOpen: boolean;
    initialValue?: string;
    onClose: () => void;
    onConfirm: (location: string) => void;
}

export default function LocationModal({
    isOpen,
    initialValue = "",
    onClose,
    onConfirm,
}: LocationModalProps) {
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setValue(initialValue === "Set delivery location" ? "" : initialValue);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen, initialValue]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (!trimmed) return;
        onConfirm(trimmed);
        onClose();
    };

    return (
        <div
            className="fixed inset-25 z-50 flex items-center justify-center px-4 mt-1"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-base text-[#0D0E12]" style={{ fontFamily: "Bold, sans-serif" }}>
                        Enter your delivery location
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[#0D0E12]/50 transition-colors hover:bg-[#0D0E12]/5 hover:text-[#0D0E12]"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <MapPin size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#FF451D]" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Search for area, street name..."
                            className="w-full rounded-full bg-[#0D0E12]/[0.04] py-3 pl-10 pr-4 text-sm text-[#0D0E12] placeholder:text-[#0D0E12]/40 outline-none transition-colors focus:bg-[#0D0E12]/[0.07] focus:ring-2 focus:ring-[#FF451D]/30"
                            style={{ fontFamily: "Regular, sans-serif" }}
                        />
                    </div>

                    <button
                        type="button"
                        className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-[#0D0E12]/5"
                    >
                        <Navigation size={15} className="text-[#FF451D]" />
                        <span className="text-sm font-semibold text-[#FF451D]" style={{ fontFamily: "Bold, sans-serif" }}>
                            Use my current location
                        </span>
                    </button>

                    <button
                        type="submit"
                        disabled={!value.trim()}
                        className="mt-4 w-full rounded-full px-4 py-3 text-xs text-white transition-transform duration-300 disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:scale-[1.02]"
                        style={{ background: "var(--gradient-primary)", fontFamily: "Bold, sans-serif" }}
                    >
                        Confirm Location
                    </button>
                </form>
            </div>
        </div>
    );
}