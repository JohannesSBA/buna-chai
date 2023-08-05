import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, FunctionComponent } from "react";

export const buttonVarirants = cva(
    "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
        variants: {
            varirant: {
                default: "bg-red-900 text-white hover:bg-red-800 ",
                ghost: "bg-transparent hover:text-red-900 hover:text-red-200",
            },
            size: {
                default: "h-10 py-2 px-4",
                sm: "h-9 px-2",
                lg: "h-11 px-8",
            },
        },
        defaultVariants: {
            varirant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVarirants> {
    isLoading?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
    className,
    children,
    varirant,
    isLoading,
    size,
    ...props
}) => {
    return (
        <button
            className={cn(buttonVarirants({ varirant, size, className }))}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <Loader2 className="mr-4 h-4 w-4 animate-4" /> : null}
            {children}
        </button>
    );
};

export default Button;
