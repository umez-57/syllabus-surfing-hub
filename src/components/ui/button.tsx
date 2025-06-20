import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-bold uppercase tracking-wider ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 neo-border font-mono",
  {
    variants: {
      variant: {
        default: "monster-green text-monster-black neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] active:translate-x-2 active:translate-y-2 active:shadow-none",
        destructive: "monster-red text-monster-white neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] active:translate-x-2 active:translate-y-2 active:shadow-none",
        outline: "monster-white text-monster-black neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] active:translate-x-2 active:translate-y-2 active:shadow-none",
        secondary: "monster-gray text-monster-green neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] active:translate-x-2 active:translate-y-2 active:shadow-none",
        ghost: "text-monster-green hover:monster-gray hover:text-monster-green border-transparent shadow-none hover:neo-border hover:neo-shadow-sm",
        link: "text-monster-green underline-offset-4 hover:underline border-transparent shadow-none",
        accent: "monster-accent text-monster-white neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] active:translate-x-2 active:translate-y-2 active:shadow-none",
        purple: "monster-purple text-monster-white neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] active:translate-x-2 active:translate-y-2 active:shadow-none",
        cyan: "monster-cyan text-monster-black neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] active:translate-x-2 active:translate-y-2 active:shadow-none",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }