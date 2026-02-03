// Simplifying Checkbox for speed, standard HTML input with custom styling wrapper
import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, ...props }, ref) => {
        return (
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    ref={ref}
                    className={cn(
                        "h-4 w-4 rounded border-slate-300 text-primary focus:ring-ring",
                        className
                    )}
                    {...props}
                />
                {label && (
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                    </label>
                )}
            </div>
        )
    }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
