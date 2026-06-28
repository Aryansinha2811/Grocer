import type { ButtonHTMLAttributes, ReactNode, CSSProperties } from "react";

type ButtonVariant = "primary" | "dark" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
    fullWidth?: boolean;
    isLoading?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
};

export default function Button({
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "left",
    fullWidth = false,
    isLoading = false,
    disabled,
    children,
    className = "",
    ...props
}: ButtonProps) {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

    const variantClasses: Record<ButtonVariant, string> = {
        primary:
            "text-white shadow-md hover:shadow-lg hover:scale-105 focus-visible:ring-[#FF451D]",
        dark:
            "text-white shadow-md hover:shadow-lg hover:scale-105 focus-visible:ring-[#0D0E12]",
        outline:
            "bg-transparent border-2 border-[#FF451D] text-[#FF451D] hover:bg-[#FF451D]/10 focus-visible:ring-[#FF451D]",
        ghost:
            "bg-transparent text-[#0D0E12] hover:bg-[#0D0E12]/5 focus-visible:ring-[#0D0E12]",
    };

    const variantStyle: Record<ButtonVariant, CSSProperties> = {
        primary: { background: "var(--gradient-primary)" },
        dark: { background: "var(--gradient-dark)" },
        outline: {},
        ghost: {},
    };

    return (
        <button
            className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""
                } ${className}`}
            style={variantStyle[variant]}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            ) : (
                <>
                    {icon && iconPosition === "left" && (
                        <span className="shrink-0">{icon}</span>
                    )}
                    {children}
                    {icon && iconPosition === "right" && (
                        <span className="shrink-0">{icon}</span>
                    )}
                </>
            )}
        </button>
    );
}