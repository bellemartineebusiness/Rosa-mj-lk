import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#700143] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#700143] text-[#f8edaa] hover:bg-[#4a002c] shadow-md hover:shadow-lg hover:-translate-y-0.5",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border-2 border-[#700143] bg-transparent text-[#700143] hover:bg-[#700143] hover:text-[#f8edaa]",
        secondary:
          "bg-[#f8edaa] text-[#1a0010] hover:bg-[#f0dc7a] border border-[#e0c96e]",
        ghost:
          "hover:bg-[#f8edaa] text-[#700143]",
        link:
          "text-[#700143] underline-offset-4 hover:underline",
        light:
          "bg-[#f8edaa] text-[#700143] hover:bg-[#f0dc7a] shadow-md hover:shadow-lg hover:-translate-y-0.5 font-bold",
        dark:
          "bg-[#1a0010] text-[#f8edaa] hover:bg-[#4a002c] shadow-md hover:shadow-lg hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
