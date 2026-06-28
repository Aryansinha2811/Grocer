import { Mail, MessageCircle, Share2, Globe } from "lucide-react";

const footerLinks = [
    {
        heading: "Company",
        links: ["About us", "Careers", "Press", "Blog"],
    },
    {
        heading: "Help",
        links: ["FAQs", "Track order", "Returns & refunds", "Contact us"],
    },
    {
        heading: "Sell on Grocer",
        links: ["Become a merchant", "Merchant dashboard", "Pricing"],
    },
    {
        heading: "Legal",
        links: ["Terms of service", "Privacy policy", "Cancellation policy"],
    },
];

export default function Footer() {
    return (
        <footer className="w-full bg-transparent border-t border-[#0D0E12]/8">
            <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-1">
                        <span
                            className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent"
                            style={{ backgroundImage: "var(--gradient-primary)" }}
                        >
                            Grocer
                        </span>
                        <p className="mt-3 text-sm text-[#0D0E12]/55">
                            Fresh groceries from your neighbourhood kirana store, delivered
                            in minutes.
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                            {[MessageCircle, Share2, Globe, Mail].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    aria-label="Social link"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D0E12]/[0.04] text-[#0D0E12]/60 transition-colors hover:bg-[#FF451D]/10 hover:text-[#FF451D]"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map((col) => (
                        <div key={col.heading}>
                            <h4 className="text-sm font-bold text-[#0D0E12]">{col.heading}</h4>
                            <ul className="mt-3 space-y-2">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-[#0D0E12]/55 transition-colors hover:text-[#FF451D]"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#0D0E12]/8 pt-6 text-xs text-[#0D0E12]/45 sm:flex-row">
                    <span>© {new Date().getFullYear()} Grocer. All rights reserved.</span>
                    <span>Made with care for your local kirana store.</span>
                </div>
            </div>
        </footer>
    );
}