import type { ReactNode } from "react";

interface FormFieldProps {
    label: string;
    children: ReactNode;
    error?: string | null;
    required?: boolean;
}

export default function FormField({
    label,
    error,
    children,
    required = false,
}: FormFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>

            {children}

            {error && (
                <p className="mt-1 text-sm text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}
