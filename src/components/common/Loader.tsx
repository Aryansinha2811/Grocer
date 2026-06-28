interface LoaderProps {
    size?: "sm" | "md" | "lg";
    label?: string;
    fullScreen?: boolean;
}

const sizeMap = {
    sm: 28,
    md: 44,
    lg: 64,
};

export default function Loader({ size = "md", label, fullScreen = false }: LoaderProps) {
    const px = sizeMap[size];

    const content = (
        <div className="flex flex-col items-center justify-center gap-3 bg-transparent">
            <svg
                width={px}
                height={px}
                viewBox="0 0 48 48"
                fill="none"
                className="animate-spin"
                style={{ animationDuration: "1.1s" }}
            >
                <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#0D0E12"
                    strokeOpacity="0.08"
                    strokeWidth="5"
                />
                <path
                    d="M24 4a20 20 0 0 1 20 20"
                    stroke="#FF451D"
                    strokeWidth="5"
                    strokeLinecap="round"
                />
            </svg>
            {label && (
                <span className="text-sm font-medium text-[#0D0E12]/60">{label}</span>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return content;
}