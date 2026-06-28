import type { ReactNode } from "react";
import Button from "./Button";

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function EmptyState({
    icon,
    title,
    description,
    actionLabel,
    onAction,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-16 bg-transparent">
            {icon && (
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#FF451D]/10 text-[#FF451D]">
                    {icon}
                </div>
            )}
            <h3 className="text-lg font-bold text-[#0D0E12]">{title}</h3>
            {description && (
                <p className="mt-2 max-w-sm text-sm text-[#0D0E12]/60">{description}</p>
            )}
            {actionLabel && onAction && (
                <div className="mt-6">
                    <Button variant="primary" size="md" onClick={onAction}>
                        {actionLabel}
                    </Button>
                </div>
            )}
        </div>
    );
}